/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: "#050505", // True Black
        space: "#0a0f1e", // Deep Navy
        cyan: "#00f2ff", // Electric Cyan (Primary Accent)
        acid: "#adff2f", // Acid Green (Optimization)
        magenta: "#ff00ff", // Vivid Magenta (Alerts)
        primary: "#00f2ff", // Mapping primary to cyan
        success: "#adff2f", // Mapping success to acid
        danger: "#ff00ff", // Mapping danger to magenta
        surface: "rgba(255, 255, 255, 0.05)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { 'box-shadow': '0 0 5px #00f2ff, 0 0 10px #00f2ff' },
          'to': { 'box-shadow': '0 0 20px #00f2ff, 0 0 30px #00f2ff' },
        }
      }
    },
  },
  plugins: [],
}
