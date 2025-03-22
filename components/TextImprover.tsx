import { Paper, Typography, TextField, Button, CircularProgress } from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useTextImprover } from "@/hooks/useTextImprover";

export default function TextImprover() {
  const { inputText, setInputText, handleImprove, loading } = useTextImprover();

  return (
    <Paper sx={{ flex: 1, p: 4, borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>Input Text (For Improvement)</Typography>
      <TextField
        fullWidth
        multiline
        rows={10}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Paste your text here..."
      />
      <Button
        variant="contained"
        startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AutoFixHighIcon />}
        onClick={handleImprove}
        disabled={loading || !inputText}
        sx={{ mt: 3, fontSize: "1.1rem" }}
        fullWidth
      >
        {loading ? "Improving..." : "Improve Text"}
      </Button>
    </Paper>
  );
};
