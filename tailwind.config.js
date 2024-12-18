/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        siamBlack: "var(--siamBlack)",
        semiBlack: "var(--semiBlack)",
        semiWhite: "var(--semiWhite)",
        gray01: "var(--gray01)",
      },
    },
  },
  plugins: [],
};
