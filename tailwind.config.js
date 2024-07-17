/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        'sand':'#F2E2CE',
        'orange':'#D98D30',
        'brown':'#8c3616'
      }
    },
  },
  plugins: [],
}

