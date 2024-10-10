/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
				montserrat: ["Montserrat", "sans-serif"],
			},
			colors: {
				primary: {
					DEFAULT: "#4E7772",
					100: "#F2F2F2",
					200: "#4E7772",
					300: "#3C4B46",
					400: "#29362C",
					500: "#1F221F",
				},
			},
		},
	},
	plugins: [],
};
