module.exports = {
    theme: {
      extend: {
        animation: {
          shine: "shine var(--duration, 14s) linear infinite",
        },
        keyframes: {
          shine: {
            "0%": { backgroundPosition: "0% 50%" },
            "50%": { backgroundPosition: "100% 50%" },
            "100%": { backgroundPosition: "0% 50%" },
          },
        },
      },
    },
    plugins: [],
  };
  