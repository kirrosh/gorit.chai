import { Client as FaunaClient, query } from 'faunadb'

export const faunaClient = new FaunaClient({
	secret: process.env.FAUNA_SECRET!,
	domain: 'db.eu.fauna.com',
	port: 443,
	scheme: 'https',
})

export const Q = query
