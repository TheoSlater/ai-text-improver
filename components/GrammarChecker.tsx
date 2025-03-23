import { Paper, Typography, TextField} from "@mui/material";
import { useGrammarChecker } from "@/hooks/useGrammarChecker";
import BetaChip from "./BetaChip";

export const GrammarChecker = () => {
  const { grammarText, setGrammarText, grammarIssues } = useGrammarChecker();

  return (
    <Paper sx={{ flex: 1, p: 4, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>Grammar Checker {<BetaChip/>}</Typography>
      <TextField
        fullWidth
        multiline
        rows={10}
        value={grammarText}
        onChange={(e) => setGrammarText(e.target.value)}
        placeholder="Start typing to check grammar..."
      />
      <Typography variant="body2" sx={{ mt: 2 }}>
        {grammarIssues.length > 0 ? "Grammar Issues Found:" : "No grammar issues detected."}
      </Typography>
      {grammarIssues.map((issue, index) => (
        <Typography key={index} variant="body2" sx={{ color: "red" }}>
          {issue.message} - Suggested Fix: {issue.suggestion}
        </Typography>
      ))}
    </Paper>
  );
};
