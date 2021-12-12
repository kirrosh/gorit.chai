import Form from '@/components/from'
import Page from '@/components/page'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import {
	Block,
	BlockTitle,
	Button,
	Link,
	List,
	ListInput,
	ListItem,
	Navbar,
} from 'tailwind-mobile/react'

const Index = () => {
	const { data: session, status } = useSession()

	const { data } = useQuery('User', async () => {
		const res = await fetch('/api/user')
		return res.json()
	})
	// console.log(data)

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
			<BlockTitle>Only Inputs Inset</BlockTitle>
			{data && <Form data={data} />}
		</Page>
	)
}

export default Index
