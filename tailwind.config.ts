import type { Config } from "tailwindcss";

// 设计系统：玫瑰书房 Rose Study
// - 莫兰迪奶油粉：优雅不廉价
// - 香槟金：低调高级感
// - 大圆角 + 柔和阴影：现代少女风

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 主色 —— 莫兰迪玫瑰
        brand: {
          50: "#FDF5F7",
          100: "#FAE7EC",
          200: "#F3CFD8",
          300: "#EBB8C4",
          400: "#D89BA5",
          500: "#C8838F",
          600: "#B06876",
          700: "#8E4F5E",
          800: "#6B3C47",
          900: "#4A2A32",
        },
        // 背景色 —— 暖奶油
        cream: {
          50: "#FDF8F5",
          100: "#FAF3EF",
          200: "#F5EAE3",
          300: "#EDDCD1",
          400: "#E2C9B9",
        },
        // 点缀色 —— 香槟金
        gold: {
          100: "#F5EEDC",
          200: "#ECDFC0",
          300: "#DFCB9B",
          400: "#D0B77C",
          500: "#C9A96E",
          600: "#A88950",
          700: "#856B3E",
        },
        // 文字色 —— 暖黑棕
        ink: {
          400: "#8B7A7A",
          500: "#6B5858",
          600: "#5C4949",
          700: "#4A3A3A",
          800: "#3D2E2E",
          900: "#2D2020",
        },
      },
      fontFamily: {
        serif: [
          "var(--font-playfair)",
          '"Noto Serif SC"',
          '"Source Han Serif SC"',
          '"Songti SC"',
          "SimSun",
          "serif",
        ],
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          '"PingFang SC"',
          '"Microsoft YaHei"',
          "sans-serif",
        ],
      },
      boxShadow: {
        // 玫瑰色调的柔和阴影
        soft: "0 4px 20px rgba(200, 131, 143, 0.08)",
        "soft-lg": "0 10px 40px rgba(200, 131, 143, 0.12)",
        "soft-xl": "0 20px 60px rgba(200, 131, 143, 0.15)",
        glow: "0 0 30px rgba(235, 184, 196, 0.35)",
      },
      backgroundImage: {
        "gradient-rose":
          "linear-gradient(135deg, #FAE7EC 0%, #FDF8F5 50%, #F5EEDC 100%)",
        "gradient-rose-button":
          "linear-gradient(135deg, #D89BA5 0%, #C8838F 100%)",
        "gradient-rose-button-hover":
          "linear-gradient(135deg, #C8838F 0%, #B06876 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #F3CFD8 0%, #FAE7EC 40%, #F5EEDC 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
