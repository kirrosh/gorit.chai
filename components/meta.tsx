import Head from 'next/head'

const Meta = () => (
	<Head>
		<title>Горький Чай</title>
		<meta charSet='utf-8' />
		<meta name='mobile-web-app-capable' content='yes' />
		<meta name='apple-mobile-web-app-capable' content='yes' />
		<meta
			name='apple-mobile-web-app-status-bar-style'
			content='black-translucent'
		/>
		<meta name='apple-mobile-web-app-title' content='Горький Чай' />
		<meta name='application-name' content='Горький Чай' />
		<meta name='description' content='Bring your own ingredients' />
		<meta name='theme-color' content='#1d2020' />
		<meta
			name='viewport'
			content='width=device-width, initial-scale=1, user-scalable=0, viewport-fit=cover'
		/>
		<link rel='apple-touch-icon' href='/images/icon-maskable-512.png' />
		<link rel='icon' type='image/png' href='/images/favicon.png' />
		<link rel='manifest' href='/manifest.json' />
		<link rel='preconnect' href='https://fonts.googleapis.com' />
		<link rel='preconnect' href='https://fonts.gstatic.com' />
		<link
			href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap'
			rel='stylesheet'
		/>
	</Head>
)

export default Meta
