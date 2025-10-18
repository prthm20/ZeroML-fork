"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Hyperparams = Record<string, string | number | boolean>;

interface TrainingResult {
  problem_type: string;
  model_name: string;
  metrics: Record<string, number>;
  model_path: string;
}

export default function TrainModelNodeCompact() {
  const [file, setFile] = useState<File | null>(null);
  const [model, setModel] = useState<string>("");
  const [hyperparams, setHyperparams] = useState<Hyperparams>({});
  const [results, setResults] = useState<TrainingResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const modelOptions = [
    "RandomForestClassifier",
    "LogisticRegression",
    "RandomForestRegressor",
    "LinearRegression",
    "KMeans",
  ];

  useEffect(() => {
    if (!model) return;
    axios
      .get<{ default_hyperparameters: Hyperparams }>(
        `http://localhost:7860/hyperparameters?model_name=${model}`
      )
      .then((res) => setHyperparams(res.data.default_hyperparameters))
      .catch(() => setHyperparams({}));
  }, [model]);

  const handleParamChange = (key: string, value: string) => {
    setHyperparams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleTrain = async () => {
    if (!file || !model) {
      alert("Please upload a CSV and select a model first!");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("model_choice", model);
    formData.append("params", JSON.stringify(hyperparams));

    try {
      const res = await axios.post<TrainingResult>(
        "http://localhost:7860/train-model",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setResults(res.data);
      console.log("Training successful:", res.data);
    } catch (err) {
      const error = err as AxiosError<{ detail: string }>;
      alert(error.response?.data?.detail || "Training failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-[280px] bg-[#0b1220] border border-[#253148] rounded-2xl p-3 shadow-md text-gray-200"
      /* keep compact for canvas nodes */
    >
      <div className="text-sm font-semibold text-center text-gray-100 mb-2">
        🧠 Model Training
      </div>

      {/* File Upload */}
      <div className="mb-2">
        <Label className="text-[11px] text-gray-400">Upload CSV</Label>
        <Input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mt-1 bg-[#0f1724] border-none text-[11px] file:bg-[#243447] file:text-[11px] file:text-gray-200 file:py-1 file:px-2"
        />
      </div>

      {/* Model Selector */}
      <div className="mb-2">
        <Label className="text-[11px] text-gray-400">Model</Label>
        <Select onValueChange={setModel}>
          <SelectTrigger className="w-full mt-1 bg-[#0f1724] border-none text-[11px] h-8">
            <SelectValue placeholder="Choose model" />
          </SelectTrigger>
          <SelectContent className="bg-[#0f1724] text-[12px]">
            {modelOptions.map((m) => (
              <SelectItem key={m} value={m}>
                {m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Hyperparameters */}
      {Object.keys(hyperparams).length > 0 && (
        <div className="mb-2">
          <Label className="text-[11px] text-gray-400">Hyperparams</Label>
          <div className="max-h-[110px] overflow-y-auto bg-[#071022] p-2 rounded-md border border-[#1f2a36] text-[11px]">
            {Object.entries(hyperparams).map(([key, val]) => (
              <div key={key} className="flex items-center gap-2 mb-1">
                <div className="w-1/2 text-[11px] text-gray-300 truncate">{key}</div>
                <Input
                  value={typeof val === "boolean" ? String(val) : val ?? ""}
                  onChange={(e) => handleParamChange(key, e.target.value)}
                  className="text-[11px] w-1/2 bg-[#071022] border-none h-7 px-2"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Train Button */}
      <Button
        onClick={handleTrain}
        disabled={loading}
        className="w-full py-2 text-[13px] font-semibold rounded-md mt-1 bg-gradient-to-r from-[#06b6d4] to-[#3b82f6]"
      >
        {loading ? "Training..." : "🚀 Train"}
      </Button>

      {/* Results: compact but informative */}
      <div className="mt-3 bg-[#071422] border border-[#16232b] rounded-md p-2 text-[12px]">
        {results ? (
          <>
            <div className="flex items-center justify-between mb-1">
              <div className="text-xs font-medium text-gray-100">Results</div>
              <div className="text-[11px] text-gray-400 truncate">{results.model_name}</div>
            </div>

            <div className="text-[11px] text-gray-300 mb-2">
              <div>
                <strong className="text-gray-200">Problem:</strong>{" "}
                <span className="text-gray-300">{results.problem_type}</span>
              </div>
              <div className="truncate">
                <strong className="text-gray-200">Path:</strong>{" "}
                <span className="text-gray-300">{results.model_path}</span>
              </div>
            </div>

            <div className="text-[11px] text-gray-200 font-medium mb-1">Metrics</div>
            <div className="max-h-[90px] overflow-y-auto">
              {Object.keys(results.metrics).length === 0 ? (
                <div className="text-[11px] text-gray-400">No metrics returned</div>
              ) : (
                <div className="space-y-1">
                
                  {Object.entries(results.metrics).map(([k, v]) => (
                    <div
                      key={k}
                      className="flex items-center justify-between bg-[#06121a] px-2 py-1 rounded"
                    >
                      <div className="text-[11px] text-gray-300 truncate">{k}</div>
                      <div className="text-[11px] text-gray-100 font-semibold">
                        {Number.isFinite(v) ? v.toFixed(4) : String(v)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-[11px] text-gray-400">No results yet</div>
        )}
      </div>
    </div>
  );
}
