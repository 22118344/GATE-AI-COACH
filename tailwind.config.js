module.exports = {
  content: ["./*.html", "./pages/*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#7C3AED",
        secondary: "#06B6D4",
        darkbg: "#0F172A",
        cardbg: "rgba(255,255,255,0.05)",
      },

      boxShadow: {
        glow: "0 0 20px rgba(124, 58, 237, 0.4)",
      },

      borderRadius: {
        xl2: "1.5rem",
      },
animation: {
  float: "float 6s ease-in-out infinite",
  pulseSlow: "pulse 4s infinite",
},

keyframes: {
  float: {
    "0%, 100%": {
      transform: "translateY(0px)",
    },

    "50%": {
      transform: "translateY(-10px)",
    },
  },
},
    },
  },
  plugins: [],
};