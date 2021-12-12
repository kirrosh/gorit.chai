import CheckoutForm from '@/components/CheckoutForm'

import { useRouter } from 'next/router'

import { Block, BlockTitle, Button, Navbar, Page } from 'tailwind-mobile/react'
import { getUserInfo } from '../api/profile'

const inactiveColor = {}
const activeColor = { bg: 'bg-green-500', text: 'text-white' }

export async function getServerSideProps(context: any) {
	const id = context.query.id
	const userInfo: any = await getUserInfo(id)

	if (!userInfo) {
		return {
			notFound: true,
		}
	}

	return {
		props: { data: userInfo.data }, // will be passed to the page component as props
	}
}

const User = ({ data }: { data: any }) => {
	const router = useRouter()
	const id = router.query.id
	return (
		<Page>
			<Navbar title={data?.fullName} />
			<Block className='grid place-items-center '>
				<div className='relative flex items-center justify-center w-12 h-12 m-1 mr-2 text-xl text-white uppercase bg-green-500 rounded-full'>
					<img
						src='http://source.unsplash.com/100x100/?man'
						className='rounded-full'
					/>
				</div>
			</Block>
			<BlockTitle>Описание</BlockTitle>
			<Block>{data?.description}</Block>
			<Block>
				<CheckoutForm userId={typeof id === 'string' ? id : ''} />
			</Block>
		</Page>
	)
}

export default User
