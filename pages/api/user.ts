import { faunaClient, q } from '@/lib/fauna'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { getToken } from 'next-auth/jwt'
type Data = {
	name: string
}

const User = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
	const session = await getSession({ req })
	//@ts-ignore
	const token = await getToken({ req: req })
	console.log({ token })

	if (session?.user) {
		faunaClient.query(
			q.Create(q.Collection('user_info'), {
				data: {
					name: session.user.name,
					email: session.user.email,
					image: session.user.image,
				},
			})
		)
	}

	res.status(200).json({ name: 'John Doe' })
}

export default User
