import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { fetchGetJSON } from '../utils/api-helpers'
import useSWR from 'swr'
import React from 'react'
import Page from '@/components/page'

import { GrStatusGood } from 'react-icons/gr'

const ResultPage: NextPage = () => {
	const router = useRouter()

	// Fetch CheckoutSession from static page via
	// https://nextjs.org/docs/basic-features/data-fetching#static-generation
	const { data, error } = useSWR(
		router.query.session_id
			? `/api/checkout_sessions/${router.query.session_id}`
			: null,
		fetchGetJSON
	)

	if (error)
		return (
			<Page>
				<div className='grid place-items-center'>Ошибка :(</div>
			</Page>
		)

	return (
		<Page>
			<div className='grid place-items-center h-[100vh]'>
				<div className='grid place-items-center'>
					{data?.payment_intent?.status ? (
						<GrStatusGood size={100} color='#6226f3' />
					) : (
						''
					)}
					<h1>Спасибо!</h1>
				</div>
			</div>
		</Page>
	)
}

export default ResultPage
