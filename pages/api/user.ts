import { faunaClient, q } from '@/lib/fauna'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'

export const getUserInfo = (id: string) => {
	return faunaClient.query(q.Get(q.Match(q.Index('user_info_by_id'), id)))
}

interface IUserInfo {
	userId: string
	fullName?: string
	email?: string
	description?: string
}

export const createOrUpdateUserInfo = async ({
	userId,
	fullName,
	email,
	description,
}: IUserInfo) => {
	console.log('createOrUpdateUserInfo')

	const userInfo = await getUserInfo(userId)
	console.log({ userInfo })

	if (userInfo) {
		return faunaClient.query(
			q.Update(q.Ref(q.Collection('user_info'), '1'), {
				data: {
					//@ts-ignore
					id: session.userid,
					fullName,
					email,
					description,
				},
			})
		)
	} else {
		return faunaClient.query(
			q.Create(q.Collection('user_info'), {
				data: {
					//@ts-ignore
					id: session.userid,
					fullName,
					email,
					description,
				},
			})
		)
	}
}

const User = async (req: NextApiRequest, res: NextApiResponse) => {
	const session = await getSession({ req })
	//@ts-ignore

	let data

	if (session?.user) {
		if (req.method === 'POST') {
			data = await createUserInfo(session)
		}
		if (req.method === 'PATCH') {
		}
		if (req.method === 'GET') {
			data = await getUserInfo(req.body.userId || session.userid)
		}
	}

	res.status(200).json(data)
}

export default User
