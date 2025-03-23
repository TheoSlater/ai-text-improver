import { Paper, Typography } from "@mui/material";
import { BorderBeam } from "@/components/magicui/border-beam";
import { useTextImprover } from "@/hooks/useTextImprover";
import { TextAnimate } from "./magicui/text-animate";
import { memo, useMemo } from "react";

const MemoizedTextAnimate = memo(TextAnimate);

export default function ImprovedText() {
  const { result } = useTextImprover();

  // Memoized result so it doesn’t change unless `result` updates
  const memoizedResult = useMemo(() => result, [result]);

  return (
    <Paper sx={{ flex: 1, p: 4, borderRadius: 2, position: "relative" }}>
      <BorderBeam size={250} />
      <Typography variant="h6" sx={{ mb: 3 }}>
        Improved Result
      </Typography>

      <Paper
        sx={{
          p: 2,
          minHeight: 200,
          borderRadius: 2,
          border: "1px solid rgba(255, 255, 255, 0.2)",
          backgroundColor: "rgba(255, 255, 255, 0.05)",
          overflowY: "auto",
        }}
      >
        <MemoizedTextAnimate
          key={memoizedResult} // Ensures re-animation only when `result` changes
          animation="blurInUp"
          delay={0.65}
          by="word"
        >
          {memoizedResult || "Your improved text will appear here..."}
        </MemoizedTextAnimate>
      </Paper>
    </Paper>
  );
}
