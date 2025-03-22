"use client";
import { keyframes } from "@emotion/react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import { useState, useCallback, useRef } from "react";
import { BorderBeam } from "@/components/magicui/border-beam";
import { ShineBorder } from "@/components/magicui/shine-border";
import debounce from "lodash.debounce";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function Home() {
  const textRef = useRef("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImprove = useCallback(
    debounce(async () => {
      const text = textRef.current.trim();
      if (!text) return;

      setLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/improve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to improve text");
        }

        setResult(data.improvedText);
      } catch (error) {
        console.error("Failed to improve text:", error);
        setError(
          error instanceof Error ? error.message : "Failed to improve text"
        );
        setResult("");
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0f1729 0%, #171f34 100%)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: "100vh",
            py: 6,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            animation: `${fadeIn} 1s ease-out`,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2.5rem", md: "3.5rem" },
                background: "linear-gradient(45deg, #60A5FA, #A78BFA)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: 2,
              }}
            >
              TextAI Improver
            </Typography>
            <Typography
              variant="h5"
              sx={{ color: "rgba(255, 255, 255, 0.7)", fontWeight: 500 }}
            >
              Enhance your writing with AI-powered suggestions
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 4,
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            <Paper
              sx={{
                flex: 1,
                p: 4,
                position: "relative",
                background: "rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(20px)",
                borderRadius: 3,
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <BorderBeam size={250} />
              <Typography
                variant="h6"
                sx={{ mb: 3, color: "white", fontWeight: 600 }}
              >
                Input Text
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={10}
                onChange={(e) => (textRef.current = e.target.value)}
                placeholder="Paste your text here..."
                sx={{
                  "& .MuiOutlinedInput-input": {
                    color: "white",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                  },
                }}
              />
              <Button
                variant="contained"
                startIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <AutoFixHighIcon />
                  )
                }
                onClick={handleImprove}
                disabled={loading}
                sx={{
                  mt: 3,
                  py: 1.5,
                  background: "linear-gradient(45deg, #60A5FA, #A78BFA)",
                  borderRadius: 2,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                }}
                fullWidth
              >
                {loading ? "Improving..." : "Improve Text"}
              </Button>
            </Paper>
            <Paper
              sx={{
                flex: 1,
                p: 4,
                position: "relative",
                overflow: "hidden",
                background: "rgba(255, 255, 255, 0.07)",
                backdropFilter: "blur(20px)",
                borderRadius: 3,
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
              }}
            >
              <ShineBorder shineColor={["#60A5FA", "#A78BFA", "#818CF8"]} />
              <Typography
                variant="h6"
                sx={{ mb: 3, color: "white", fontWeight: 600 }}
              >
                Improved Result
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={10}
                value={result}
                InputProps={{ readOnly: true, "aria-live": "polite" }}
                placeholder="Your improved text will appear here..."
                sx={{ "& .MuiOutlinedInput-input": { color: "white" } }}
              />
            </Paper>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
}
