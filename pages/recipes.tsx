import Page from '@/components/page'
import Section from '@/components/section'
import { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

const Recipes = () => {
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
