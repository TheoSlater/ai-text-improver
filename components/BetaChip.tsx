import { Chip, useTheme } from "@mui/material";

export default function BetaChip() {
  const theme = useTheme();

  return (
    <Chip
      label="BETA"
      size="small"
      sx={{
        borderRadius: theme.shape.borderRadius,
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
        color: theme.palette.text.primary,
        fontWeight: 700,
        letterSpacing: "0.5px",
        padding: "4px 12px",
        fontSize: "0.75rem",
        opacity: 0.95,
        ml: 1,
      }}
    />
  );
}
