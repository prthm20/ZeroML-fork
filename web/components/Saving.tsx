
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface SaveCleanedDataButtonProps {
  sessionId: string;
}

const SaveCleanedDataButton: React.FC<SaveCleanedDataButtonProps> = ({ sessionId }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("http://localhost:7860/save-cleaned-file", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sessionId ),
      });
       
      if (!res.ok) throw new Error("Failed to save cleaned file");
      const data = await res.json();

      setMessage(data.message || "✅ Cleaned file saved successfully!");
    } catch (err: any) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        onClick={handleSave}
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {loading ? "Saving..." : "💾 Save Cleaned Data"}
      </Button>
      {message && <p className="text-sm text-gray-300">{message}</p>}
    </div>
  );
};

export default SaveCleanedDataButton;

