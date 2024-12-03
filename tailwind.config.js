/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
		"./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
    	extend: {
    		fontFamily: {
    			poppins: ["Poppins", "sans-serif"],
    			montserrat: ["Montserrat", "sans-serif"]
    		},
    		colors: {
    			primary: {
    				'100': '#F2F2F2',
    				'200': '#4E7772',
    				'300': '#3C4B46',
    				'400': '#29362C',
    				'500': '#1F221F',
    				DEFAULT: '#4E7772'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
};
