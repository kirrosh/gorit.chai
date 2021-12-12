import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'
import GitHubProvider from 'next-auth/providers/github'

import { FaunaAdapter } from '@next-auth/fauna-adapter'
import { faunaClient } from '@/lib/fauna'

export default NextAuth({
	secret: '+TE3l2VwO516uji0JqtiwydsonuijBIuiYFnm1TO3GE=',
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID!,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
	],
	adapter: FaunaAdapter(faunaClient),
	callbacks: {
		async session({ session, token, user }) {
			session.userId = user.id
			return session
		},
	},
})
