import type { AppProps } from 'next/app'
import Meta from '@/components/meta'
import '@/styles/globals.css'
import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { SessionProvider } from 'next-auth/react'
import { App as TwApp } from 'tailwind-mobile/react'

const queryClient = new QueryClient()

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
	return (
		<TwApp theme={'ios'} dark={false}>
			<Meta />
			<SessionProvider session={session}>
				<QueryClientProvider client={queryClient}>
					<Component {...pageProps} />
				</QueryClientProvider>
			</SessionProvider>
		</TwApp>
	)
}

export default App
