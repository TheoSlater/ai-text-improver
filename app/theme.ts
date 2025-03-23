import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2D3BF0",
      light: "#4C5DF9",
      dark: "#1C2BBC",
    },
    secondary: {
      main: "#FF5F5F",
      light: "#FF7A7A",
      dark: "#CC4A4A",
    },
    error: {
      main: "#FF3B3B",
      light: "#FF6B6B",
      dark: "#CC2E2E",
    },
    background: {
      default: "#0A0F2C",
      paper: "#141B4D",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B8B9CF",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontSize: "3rem", fontWeight: 800 },
    h2: { fontSize: "2.5rem", fontWeight: 700 },
    h3: { fontSize: "2rem", fontWeight: 600 },
    h4: { fontSize: "1.75rem", fontWeight: 600 },
    h5: { fontSize: "1.5rem", fontWeight: 500 },
    h6: { fontSize: "1.25rem", fontWeight: 500 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontSize: "1rem",
          fontWeight: 600,
          padding: "10px 20px",
          "&:hover": {
            opacity: 0.9,
          },
        },
        containedPrimary: {
          backgroundColor: "#2D3BF0",
          "&:hover": { backgroundColor: "#1C2BBC" },
        },
        containedSecondary: {
          backgroundColor: "#FF5F5F",
          "&:hover": { backgroundColor: "#CC4A4A" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(209, 185, 185, 0.05)",
          backdropFilter: "blur(20px)",
          borderRadius: 8,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
          padding: "20px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.07)",
            borderRadius: 18,
            "& fieldset": { borderColor: "rgba(255, 255, 255, 0.2)" },
            "&:hover fieldset": { borderColor: "#4C5DF9" },
            "&.Mui-focused fieldset": { borderColor: "#2D3BF0" },
          },
          "& .MuiInputBase-input": {
            color: "#FFFFFF",
          },
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#FFFFFF",
        },
      },
    },
  },
});
