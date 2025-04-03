/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ['class'],
	content: ['./index.html', './src/**/*.{ts,js,vue}'],
	theme: {
		spacing: {
			1: '2px',
			2: '8px',
			3: '16px',
			4: '24px',
			5: '32px',
			6: '48px',
			7: '64px',
			8: '80px',
			9: '96px',
			10: '112px'
		},
		fontSize: {
			xs: '0.9rem',
			sm: ' 1rem',
			DEFAULT: ' 1.2rem',
			md: ' 1.3rem',
			lg: ' 1.8rem',
			xl: ' 2.5rem',
			'2xl': ' 3rem'
		},
		radius: {
			DEFAULT: '4px'
		},
		extend: {
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			colors: {
				primary: '#1e293b',
				secondary: '#f3f3ee'
			}
		}
	},
	plugins: [require('tailwindcss-animate')]
}
