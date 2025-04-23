/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/**/*.css"],
  darkMode: "class", // ✅ enables `dark:` variants
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#6366F1", // Indigo 500
          dark: "#4F46E5", // Indigo 600
          light: "#A5B4FC", // Indigo 300
        },
        background: {
          DEFAULT: "#ffffff",
        },
        surface: {
          DEFAULT: "#FFFFFF", // Cards, panels
          subdued: "#F1F5F9", // Alt panel backgrounds
        },
        text: {
          primary: "#111827", // Gray 900
          secondary: "#6B7280", // Gray 500
          muted: "#9CA3AF", // Gray 400
          inverted: "#FFFFFF", // On dark bg
        },
        border: {
          DEFAULT: "#E5E7EB", // Gray 200
          subtle: "#D1D5DB", // Gray 300
        },
      },
      spacing: {
        sidebar: "16rem", // 256px
        header: "4rem", // 64px
        gutter: "1.5rem", // For content spacing (24px)
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
      borderRadius: {
        sm: "0.375rem", // 6px
        DEFAULT: "0.5rem", // 8px
        md: "0.75rem", // 12px
        lg: "1rem", // 16px
        xl: "1rem", // 16px
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        card: "0 2px 8px rgba(0, 0, 0, 0.06)",
        popup: "0 10px 15px rgba(0, 0, 0, 0.1)",
      },
      transitionProperty: {
        spacing: "margin, padding",
      },
    },
  },
  plugins: [],
};
