// const tailwindMobileConfig = require('tailwind-mobile/config')

// // wrap your config with tailwindMobileConfig
// module.exports = tailwindMobileConfig({
// 	// JIT mode should be enabled
// 	mode: 'jit',
// 	// rest of your usual Tailwind CSS config here
// 	content: [
// 		'./pages/**/*.{js,ts,jsx,tsx}',
// 		'./components/**/*.{js,ts,jsx,tsx}',
// 	],
// 	darkMode: 'false',
// 	plugins: [require('tailwindcss-safe-area')],
// })

// import tailwindMobile config
const tailwindMobile = require('tailwind-mobile/config')

// wrap config with tailwindMobile config
module.exports = tailwindMobile({
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				'page-ios-light': '#efeff4',
				'page-ios-dark': '#212121',
				primary: {
					light: '#6226f3',
					DEFAULT: '#6226f3',
					dark: '#6226f3',
				},
				secondary: '#457b9d',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
})
