/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#2c3e50',
        'custom-teal': '#4ca1af',
        'custom-blue': '#2c3e50',
        'custom-teal': '#4ca1af',
      },
      backgroundImage: {
        'custom-gradient-1': 'linear-gradient(to right, #6a11cb, #2575fc)', // Blue to Purple
        'custom-gradient-2': 'linear-gradient(to right, #ff5f6d, #ffc371)', // Sunset Orange to Pink
        'custom-gradient-3': 'linear-gradient(to right, #00c6ff, #0072ff)', // Sky Blue to Dark Blue
        'custom-gradient-4': 'linear-gradient(to right, #ff7e5f, #feb47b)', // Coral to Peach
        'custom-gradient-5': 'linear-gradient(to right, #ff6a00, #ee0979)', // Orange to Pink
        'custom-gradient-6': 'linear-gradient(to right, #00c6ff, #1a82d3)', // Light Blue to Dark Blue
        'custom-gradient-7': 'linear-gradient(to right, #ffafbd, #ffc3a0)', // Light Pink to Coral
        'custom-gradient-8': 'linear-gradient(to right, #c3cfe2, #c3cfe2)', // Grey to Light Grey
        'custom-gradient-9': 'linear-gradient(to right, #00d2ff, #928DAB)', // Light Blue to Grey
        'custom-gradient-10': 'linear-gradient(to right, #ff758c, #ff7eb3)', // Pink to Light Pink
            // Light color gradients
        'light-gradient-1': 'linear-gradient(to right, #FFB6C1, #FFCCCB)', // Soft Pink to Soft Peach
        'light-gradient-2': 'linear-gradient(to right, #E6E6FA, #DDA0DD)', // Pale Lavender to Light Purple
        'light-gradient-3': 'linear-gradient(to right, #87CEEB, #B0E0E6)', // Light Sky Blue to Pale Cyan
        'light-gradient-4': 'linear-gradient(to right, #F08080, #FFE4B5)', // Light Coral to Light Apricot
        'light-gradient-5': 'linear-gradient(to right, #98FB98, #E0FFFF)', // Light Mint to Pale Green
        'light-gradient-6': 'linear-gradient(to right, #FFA07A, #FFFACD)', // Light Salmon to Soft Cream
        'light-gradient-7': 'linear-gradient(to right, #FAFAD2, #FFEFD5)', // Pale Gold to Light Yellow
        'light-gradient-8': 'linear-gradient(to right, #E6E6FA, #F0F8FF)', // Light Lavender to Very Light Lavender
      },
    },
  },
  plugins: [],
}

