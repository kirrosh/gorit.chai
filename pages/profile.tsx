import { faunaClient } from '@/lib/fauna'
import { useSession, signIn, signOut } from 'next-auth/react'
import React, { useEffect } from 'react'
import { Block, Button, Link, Navbar, Page } from 'tailwind-mobile/react'

const User = () => {
	const { data: session, status } = useSession()

	if (status === 'loading') {
		return '...'
	}

	if (status === 'unauthenticated') {
		return (
			<Page>
				<Block>
					<Button onClick={() => signIn()}>Log In</Button>
				</Block>
			</Page>
		)
	}

	return (
		<Page>
			<Navbar
				title={session?.user?.name || ''}
				right={
					<Link navbar onClick={() => signOut()}>
						Log Out
					</Link>
				}
			/>
			<Block>
				<p>Private Profile {session?.user?.name}</p>
			</Block>
		</Page>
	)
}

export default User
