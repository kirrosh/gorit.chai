import { faunaClient, q } from '@/lib/fauna'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export const createUserInfo = (data: IUserInfo) => {
	return faunaClient.query(
		q.Create(q.Collection('user_info'), {
			data,
		})
	)
}

export interface IUserInfo {
	userId: string
	fullName?: string
	email?: string
	description?: string
}

const User = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req })
	//@ts-ignore
	console.log
	if (session?.user) {
		const result = await createUserInfo(JSON.parse(req.body))
		return res.status(200).json(result)
	}
	res.status(401).end(`Unauthorized`)
}

export default User
