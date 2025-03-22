import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#2D3BF0",
      light: "#4C5DF9",
      dark: "#1C2BBC",
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
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
          },
        },
      },
    },
  },
});
