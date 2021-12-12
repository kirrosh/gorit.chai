import { faunaClient, q } from '@/lib/fauna'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { Session } from 'next-auth'

export const getUserInfo = (id: string) => {
	console.log(id)
	return faunaClient.query(q.Get(q.Match(q.Index('user_info_by_id'), id)))
}

export interface IUserInfo {
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
	const userInfo = await (async () => {
		try {
			return await getUserInfo(userId)
		} catch (e) {
			return undefined
		}
	})()
	// try {
	// 	const userInfo = await getUserInfo(userId)
	// 	console.log({ userInfo })
	// } catch (e) {
	// 	console.log(e)
	// }

	if (userInfo) {
		return faunaClient.query(
			q.Update(q.Ref(q.Collection('user_info'), '1'), {
				data: {
					userId,
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
					userId,
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
		console.log(req.method)
		if (req.method === 'POST') {
			data = await createOrUpdateUserInfo({
				...JSON.parse(req.body),
			})
		}
		if (req.method === 'PATCH') {
		}
		if (req.method === 'GET') {
			console.log(session)
			// data = await getUserInfo(req.body.userId || session.userid)
			const userInfo = await (async () => {
				try {
					//@ts-ignore
					return await getUserInfo(session.userId)
				} catch (e) {
					console.log(e)
					return {}
				}
			})()
			//@ts-ignore
			data = userInfo.data
		}
	}
	res.status(200).json(data)
}

export default User
