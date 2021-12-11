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
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [],
})
