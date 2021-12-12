import Form from '@/components/from'
import Page from '@/components/page'
import QRCode from 'qrcode.react'
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
import Info from '@/components/info'

const Index = () => {
	const { data: session, status } = useSession()
	const userId: any = session?.userId
	const { data } = useQuery(
		'User',
		async () => {
			const res = await fetch('/api/profile?id=' + userId)
			return res.json()
		},
		{ enabled: !!userId }
	)

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
				title={data?.fullName || session?.user?.name}
				right={
					<Link navbar onClick={() => signOut()}>
						Log Out
					</Link>
				}
			/>

			{!data ? (
				<Form />
			) : (
				<>
					<Info data={data} />
					{userId && data && (
						<>
							<Block>
								<div className='grid place-content-center'>
									<h1>Ваш QR-код</h1>
									<QRCode
										value={`https://gorky-chai.vercel.app/users/${userId}`}
										level='Q'
										size={200}
									/>
								</div>
							</Block>
						</>
					)}
				</>
			)}
		</Page>
	)
}

export default Index
