import { faunaClient, q } from '@/lib/fauna'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	name: string
}

const User = (_req: NextApiRequest, res: NextApiResponse<Data>) => {
	console.dir(_req.body)

	faunaClient.query(
		q.Create(q.Collection('user_info'), {
			data: { name: 'New User2333', description: '', photo: '' },
		})
	)

	res.status(200).json({ name: 'John Doe' })
}

export default User
