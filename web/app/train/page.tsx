"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Type for hyperparameters (string keys with string or number values)
type Hyperparams = Record<string, string | number | boolean>;

// Type for training result
interface TrainingResult {
  problem_type: string;
  model_name: string;
  metrics: Record<string, number>;
  model_path: string;
}

export default function TrainModelPage() {
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

  // Fetch hyperparameters when model changes
  useEffect(() => {
    if (!model) return;

    axios
      .get<{ default_hyperparameters: Hyperparams }>(
        `http://localhost:7860/hyperparameters?model_name=${model}`
      )
      .then((res) => setHyperparams(res.data.default_hyperparameters))
      .catch(() => setHyperparams({}));
  }, [model]);

  // Update individual hyperparameter values
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
    } catch (err) {
      const error = err as AxiosError<{ detail: string }>;
      alert(error.response?.data?.detail || "Training failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <Card className="max-w-3xl mx-auto shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            🧠 Model Training Dashboard
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* File Upload */}
          <div>
            <Label className="text-sm font-medium">Upload CSV File</Label>
            <Input
              type="file"
              accept=".csv"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="mt-2"
            />
          </div>

          {/* Model Selector */}
          <div>
            <Label className="text-sm font-medium">Select Model</Label>
            <Select onValueChange={setModel}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Choose a model" />
              </SelectTrigger>
              <SelectContent>
                {modelOptions.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dynamic Hyperparameter Inputs */}
          {Object.keys(hyperparams).length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Hyperparameters</Label>
              {Object.entries(hyperparams).map(([key, val]) => (
                <div key={key} className="flex items-center gap-3">
                  <Label className="w-1/3 text-gray-700 dark:text-gray-300">{key}</Label>
                  <Input
                    value={typeof val === "boolean" ? String(val) : val ?? ""}
                    onChange={(e) => handleParamChange(key, e.target.value)}
                    className="w-2/3"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Train Button */}
          <Button onClick={handleTrain} disabled={loading} className="w-full mt-4">
            {loading ? "Training..." : "🚀 Train Model"}
          </Button>

          {/* Results Display */}
          {results && (
            <div className="mt-6 text-black bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
              <h2 className=" text-lg text-black font-semibold mb-2">✅ Training Results</h2>
              <p><strong>Problem Type:</strong> {results.problem_type}</p>
              <p><strong>Model:</strong> {results.model_name}</p>
              <p><strong>Metrics:</strong> {JSON.stringify(results.metrics, null, 2)}</p>
              <p><strong>Model Path:</strong> {results.model_path}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
