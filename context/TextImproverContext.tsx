"use client"

import { createContext, useContext, useState } from "react";

interface TextImproverContextType {
  inputText: string;
  setInputText: (text: string) => void;
  result: string;
  setResult: (text: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  handleImprove: () => Promise<void>;
}

const TextImproverContext = createContext<TextImproverContextType | undefined>(undefined);

export const TextImproverProvider = ({ children }: { children: React.ReactNode }) => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImprove = async () => {
    if (!inputText.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/improve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText.trim() }),
      });

      if (!response.ok) throw new Error("Failed to improve text");

      const data = await response.json();
      console.log("API Full Response:", data);
      setResult(data.improvedText);

    } catch (err) {
      console.error("Error:", err);
      setResult("Error fetching improved text.");
      setError("Failed to improve text");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TextImproverContext.Provider value={{ inputText, setInputText, result, setResult, loading, setLoading, error, setError, handleImprove }}>
      {children}
    </TextImproverContext.Provider>
  );
};

export const useTextImprover = () => {
  const context = useContext(TextImproverContext);
  if (!context) {
    throw new Error("useTextImprover must be used within a TextImproverProvider");
  }
  return context;
};
