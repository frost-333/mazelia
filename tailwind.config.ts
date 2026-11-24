import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mazelia: {
          gold: {
            DEFAULT: "#B69A72",
            light: "#C7B191",
            dark: "#A0845E",
            50: "#FAF7F2",
            100: "#F4EEE3",
            200: "#E8DCB8",
            500: "#B69A72",
            600: "#9E825B",
          },
          bronze: {
            DEFAULT: "#846B48",
            dark: "#685336",
          },
          ivory: {
            DEFAULT: "#FAF8F4",
            warm: "#F4EFEB",
            50: "#FDFCF9",
            100: "#FAF8F4",
            200: "#F2EDE4",
          },
          charcoal: {
            DEFAULT: "#302D29",
            light: "#4A4641",
            muted: "#6E675F",
            900: "#24221F",
          },
          taupe: {
            DEFAULT: "#9B9185",
            light: "#BDB4A8",
            dark: "#7A7165",
          },
          border: {
            DEFAULT: "#EAE5DC",
            dark: "#DDD5C7",
          },
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        luxury: "0 4px 20px -2px rgba(48, 45, 41, 0.05)",
        "luxury-lg": "0 10px 30px -3px rgba(48, 45, 41, 0.08)",
        "luxury-gold": "0 4px 15px -1px rgba(182, 154, 114, 0.25)",
      },
      borderRadius: {
        luxury: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
