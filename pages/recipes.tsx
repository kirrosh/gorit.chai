import Page from '@/components/page'
import Section from '@/components/section'
import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { faunaClient, Q } from '@/lib/fauna'

const Recipes = () => {
	const [name, setName] = useState('')
	const session = useSession()
	console.log(session)

	useEffect(() => {
		faunaClient
			.query(Q.Get(Q.Ref(Q.Collection('user_info'), '317689268774371525')))
			.then(console.log)
	}, [])
	return (
		<Page>
			<Section>
				<button onClick={() => signIn()}>Log In</button>
			</Section>
			<Section>
				<button onClick={() => signOut()}>Log out</button>
			</Section>
		</Page>
	)
}

export default Recipes
