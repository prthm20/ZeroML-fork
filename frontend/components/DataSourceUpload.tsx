'use client';
import React, { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Link2, FileText, CheckCircle2, XCircle } from "lucide-react";

const ACCEPTED_TYPES = [
  ".csv",
  ".json",
  ".xlsx",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/json",
  "text/csv"
];

export const DataSourceUpload: React.FC<{
  onUpload: (file: File | string) => void;
}> = ({ onUpload }) => {
  const [mode, setMode] = useState<"file" | "api">("file");
  const [file, setFile] = useState<File | null>(null);
  const [apiUrl, setApiUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const ext = f.name.split(".").pop()?.toLowerCase();
    if (!["csv", "json", "xlsx"].includes(ext || "")) {
      setError("Only .csv, .json, or .xlsx files are allowed.");
      setFile(null);
      return;
    }
    setError(null);
    setFile(f);
  };

  const handleUpload = () => {
    if (mode === "file" && file) {
      onUpload(file);
    } else if (mode === "api" && apiUrl) {
      if (!/^https?:\/\/.+/.test(apiUrl)) {
        setError("Enter a valid API URL.");
        return;
      }
      setError(null);
      onUpload(apiUrl);
    }
  };

  return (
    <Card className="bg-[#181c27] border-[#23283a] p-6 rounded-xl shadow-lg w-full max-w-md mx-auto">
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