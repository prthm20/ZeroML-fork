"use client";
import React, { useState, useRef, useEffect } from "react";
import { useSession } from "@/context/SessionContext";
import SaveCleanedDataButton from "./Saving";
type PreviewRow = Record<string, string | number | boolean | null>;
interface CleaningPageProps {
  onResult?: (result: PreviewRow[]) => void;
}
export default function CleaningPage({ onResult }: CleaningPageProps) {
  const { sessionId } = useSession();
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([
    { role: "system", content: "Upload your dataset and start cleaning with natural language queries." }
  ]);
  const [input, setInput] = useState("");
  const [preview, setPreview] = useState<PreviewRow[]>([]);
  const [loading, setLoading] = useState(false);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { role: "user", content: input }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:7860/clean-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId || "demo", instruction: input }),
      });
      const data = await res.json();

      setMessages(prev => [...prev, { role: "assistant", content: data.message || data.error }]);

      if (data.preview) {
        const parsedPreview = JSON.parse(data.preview);
        setPreview(parsedPreview);
        if (onResult) onResult(parsedPreview);
      }
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { role: "assistant", content: "Error: Could not fetch response." }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col bg-gray-900 text-white w-full max-h-[400px] overflow-hidden rounded-lg border border-gray-700">
      {/* Chat Section */}
      <div className="flex-1 p-2 overflow-y-auto text-sm">
        {messages.map((m, idx) => (
          <div key={idx} className={`mb-1 ${m.role === "user" ? "text-blue-400" : "text-green-400"}`}>
            <b>{m.role}:</b> {m.content}
          </div>
        ))}
        <div ref={chatEndRef} />
        {loading && <p className="text-gray-400 text-sm">Processing...</p>}
      </div>

      {/* Input Box */}
      <div className="p-2 bg-gray-800 flex gap-1">
        <input
          type="text"
          className="flex-1 p-1 bg-gray-700 rounded text-white text-sm"
          placeholder="Enter cleaning instruction..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 text-sm"
        >
          Send
        </button>
      </div>
      <div className="p-2 border-t border-gray-700 bg-gray-800">
              <SaveCleanedDataButton sessionId={sessionId} />

      </div>

      {/* Data Preview */}
      {preview.length > 0 && (
        <div className="p-2 bg-gray-900 overflow-x-auto max-h-[150px] text-xs">
          <table className="min-w-full border border-gray-700 table-auto text-xs">
            <thead>
              <tr>
                {Object.keys(preview[0]).map(key => (
                  <th key={key} className="border border-gray-700 px-1 py-0.5">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {preview.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="border border-gray-700 px-1 py-0.5">{String(val)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
