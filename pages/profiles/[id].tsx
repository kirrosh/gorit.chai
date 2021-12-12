import { useRouter } from 'next/router'
import React from 'react'
import { useQuery } from 'react-query'
import { Block, List, ListItem, Navbar, Page } from 'tailwind-mobile/react'

const Profile = () => {
	const router = useRouter()
	const id = router.query.id
	if (!id) {
		return null
	}
	const { data } = useQuery('profile', async () => {
		const res = await fetch(`/api/profile?id=${id}`)
		return await res.json()
	})

	return (
		<Page>
			<Navbar title={data?.fullName} />
			<List>
				<ListItem>{data?.fullName}</ListItem>
				<ListItem>{data?.email}</ListItem>
				<ListItem>{data?.description}</ListItem>
			</List>
		</Page>
	)
}

export default Profile
