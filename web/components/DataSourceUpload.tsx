'use client';
import React, { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Link2, FileText, CheckCircle2, XCircle } from "lucide-react";
import axios from "axios"
import { useToast } from "@/components/ui/use-toast"
import { useSession } from "@/context/SessionContext";
const ACCEPTED_TYPES = [
  ".csv",
  ".json",
  ".xls",
  ".xlsx",
  ".parquet",
  ".h5",
  ".feather",
  ".orc",
  ".dta",
  ".sas7bdat",
  ".sav",
  ".html"
];

export const DataSourceUpload: React.FC<{
  onUpload: (file: File | string) => void;
}> = ({ onUpload }) => {
  const [mode, setMode] = useState<"file" | "api">("file");
  const [file, setFile] = useState<File | null>(null);
  const [apiUrl, setApiUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { sessionId, setSessionId } = useSession();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    
    setError(null);
    setFile(f);
    setStatus("idle");
  };

  const handleUpload = async () => {
    try {
      if (mode === "file" && file) {
        const formData = new FormData();
        formData.append("file", file);

        const res = await axios.post(`${process.env.NEXT_PUBLIC_MAIN_SERVER_URL}/upload`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log(res);

        toast({
          title: "Dataset Uploaded",
          description: `File uploaded successfully: ${file.name}`,
          className: "backdrop-blur-lg bg-green-500/20 text-green-300 border border-green-400/40 shadow-[0_0_20px_rgba(34,197,94,0.6)] rounded-xl",
          duration: 4000,
        });
        setSessionId(res.data.session_id);
        setStatus("success");
      } else if (mode === "api" && apiUrl) {
        if (!/^https?:\/\/.+/.test(apiUrl)) {
          setError("Enter a valid API URL.");
          setStatus("error");
          return;
        }
        const res = await axios.post("/api/upload-url", { url: apiUrl });
        console.log("API source registered:", res.data);

        toast({
          title: "API Registered",
          description: `Source added: ${apiUrl}`,
          className: "backdrop-blur-lg bg-green-500/20 text-green-300 border border-green-400/40 shadow-[0_0_20px_rgba(34,197,94,0.6)] rounded-xl",
          duration: 4000,
        });

        setStatus("success");
        onUpload(apiUrl);
      }
    } catch (err: unknown) {
  console.error(err);
  setError("Upload failed. Try again.");
  setStatus("error");

  toast({
    title: "Upload Failed",
    description:
      err instanceof Error ? err.message : "Something went wrong",
    className:
      "backdrop-blur-lg bg-red-500/20 text-red-300 border border-red-400/40 shadow-[0_0_20px_rgba(239,68,68,0.6)] rounded-xl",
    duration: 4000,
  });
}
  }


  // Decide card border color based on status
  const borderColor =
    status === "success"
      ? "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]"
      : status === "error"
      ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]"
      : "border-[#23283a]";

  return (
    <Card className={`bg-[#181c27] ${borderColor} p-6 rounded-xl shadow-lg w-full max-w-md mx-auto transition-all duration-300`}>
      <div className="flex gap-2 mb-4">
        <Button
          variant={mode === "file" ? "default" : "outline"}
          className={`flex-1 ${mode === "file" ? "bg-[#00f6ff] text-[#10141a]" : "bg-[#23283a] text-[#e0e7ef]"}`}
          onClick={() => setMode("file")}
        >
          <Upload className="h-4 w-4 mr-2" /> Local File
        </Button>
        <Button
          variant={mode === "api" ? "default" : "outline"}
          className={`flex-1 ${mode === "api" ? "bg-[#00f6ff] text-[#10141a]" : "bg-[#23283a] text-[#e0e7ef]"}`}
          onClick={() => setMode("api")}
        >
          <Link2 className="h-4 w-4 mr-2" /> API
        </Button>
      </div>
      {mode === "file" ? (
        <div className="flex flex-col items-center gap-3">
          <input
            ref={inputRef}
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            variant="outline"
            className="w-full bg-[#23283a] text-[#e0e7ef] border-[#23283a] flex gap-2"
            onClick={() => inputRef.current?.click()}
          >
            <FileText className="h-4 w-4" />
            {file ? file.name : "Choose File"}
          </Button>
          {file && (
            <Badge variant="secondary" className="bg-[#23283a] text-[#00f6ff] border-[#00f6ff55]">
              {file.name}
            </Badge>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={apiUrl}
            onChange={e => setApiUrl(e.target.value)}
            placeholder="Enter API URL"
            className="w-full px-3 py-2 rounded-lg bg-[#23283a] text-[#e0e7ef] border border-[#23283a] focus:outline-none focus:ring-2 focus:ring-[#00f6ff]"
          />
        </div>
      )}
      {error && (
        <div className="flex items-center gap-2 mt-3 text-red-400 text-sm">
          <XCircle className="h-4 w-4" /> {error}
        </div>
      )}
      <Button
        className="w-full mt-5 bg-gradient-to-r from-[#00f6ff] to-[#3b82f6] text-[#10141a] font-bold shadow-lg"
        onClick={handleUpload}
        disabled={mode === "file" ? !file : !apiUrl}
      >
        <CheckCircle2 className="h-4 w-4 mr-2" /> Upload
      </Button>
    </Card>
  );
};
