import { faunaClient, q } from '@/lib/fauna'
import type { NextApiRequest, NextApiResponse } from 'next'

export const getUserInfo = async (id: string) => {
	try {
		const res = await faunaClient.query(
			q.Get(q.Match(q.Index('user_info_by_id'), id))
		)
		return res
	} catch (e) {
		console.log(e)
		return null
	}
}

export interface IUserInfo {
	userId: string
	fullName?: string
	email?: string
	description?: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const id = req.query.id
	if (typeof id === 'string') {
		const userData = await getUserInfo(id)
		if (!userData) {
			return res.status(404).end(`Not found`)
		}
		// @ts-ignore
		return res.status(200).json(userData.data)
	}
	return res.status(404).end(`Not found`)
}

export default handler
