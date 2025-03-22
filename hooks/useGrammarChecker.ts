import { useEffect, useState } from "react";

interface GrammarIssue {
  message: string;
  suggestion: string;
}

export const useGrammarChecker = () => {
  const [grammarText, setGrammarText] = useState<string>("");
  const [grammarIssues, setGrammarIssues] = useState<GrammarIssue[]>([]);

  useEffect(() => {
    const checkGrammar = async () => {
      if (!grammarText.trim()) {
        setGrammarIssues([]);
        return;
      }
      try {
        const response = await fetch("/api/checkGrammar", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: grammarText.trim() }),
        });

        if (!response.ok) {
          throw new Error("Failed to check grammar");
        }

        const data = await response.json();
        setGrammarIssues(data.issues);
      } catch (err) {
        console.error("Grammar Check Error:", err);
        setGrammarIssues([]);
      }
    };

    checkGrammar();
  }, [grammarText]);

  return { grammarText, setGrammarText, grammarIssues };
};
