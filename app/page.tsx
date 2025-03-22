"use client";

import { Box, Container, Stack, Snackbar, Alert, Typography, useTheme } from "@mui/material";
import { useTextImprover } from "@/hooks/useTextImprover";
import TextImprover from "@/components/TextImprover";
import ImprovedText from "@/components/ImprovedText";
import { GrammarChecker } from "@/components/GrammarChecker";

export default function Home() {
  const theme = useTheme();
  const { error, setError } = useTextImprover();

  return (
    <Box sx={{ background: `linear-gradient(135deg, ${theme.palette.background.default} 0%, ${theme.palette.background.paper} 100%)`, minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <Typography variant="h2" sx={{ fontWeight: 800, fontSize: { xs: "2.5rem", md: "3.5rem" }, background: `linear-gradient(45deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`, WebkitBackgroundClip: "text", color: "transparent", mb: 2 }}>
            TextAI Improver
          </Typography>
        </Box>

        <Stack direction={"row"} spacing={2} justifyContent={"center"} sx={{ py: 2,}}>
          <TextImprover />
          <ImprovedText />
        </Stack>

        <GrammarChecker />

        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
          <Alert severity="error" onClose={() => setError(null)}>{error}</Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}
