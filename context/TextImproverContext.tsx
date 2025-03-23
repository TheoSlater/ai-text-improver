"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

interface TextImproverContextType {
  inputText: string;
  setInputText: (text: string) => void;
  result: string;
  loading: boolean;
  error: string | null;
  handleImprove: () => Promise<void>;
}

const TextImproverContext = createContext<TextImproverContextType | undefined>(
  undefined
);

export const TextImproverProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API call wrapped in useCallback to prevent re-creation
  const handleImprove = useCallback(async () => {
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
      setResult(data.improvedText);
    } catch (err) {
      console.error("Error:", err);
      setResult("Error fetching improved text.");
      setError("Failed to improve text");
    } finally {
      setLoading(false);
    }
  }, [inputText]);

  // Memoized context to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      inputText,
      setInputText,
      result, // `result` is now directly used instead of being in memo
      loading,
      error,
      handleImprove, // ✅ Using `useCallback`
    }),
    [inputText, result, loading, error, handleImprove]
  );

  return (
    <TextImproverContext.Provider value={contextValue}>
      {children}
    </TextImproverContext.Provider>
  );
};

export const useTextImprover = () => {
  const context = useContext(TextImproverContext);
  if (!context) {
    throw new Error(
      "useTextImprover must be used within a TextImproverProvider"
    );
  }
  return context;
};
