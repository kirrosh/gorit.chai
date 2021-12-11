import Head from 'next/head'
import Appbar from '@/components/appbar'
import BottomNav from '@/components/bottom-nav'

interface Props {
	title?: string
	children: React.ReactNode
}

const Page = ({ title, children }: Props) => (
	<>
		{/* {title ? (
			<Head>
				<title>Rice Bowl | {title}</title>
			</Head>
		) : null}

		<Appbar /> */}

		<main
			/**
			 * Padding top = `appbar` height
			 * Padding bottom = `bottom-nav` height
			 */
			className='max-w-screen-md pt-20 pb-16 mx-auto mt-10'
		>
			<div className='p-6'>{children}</div>
		</main>

		<BottomNav />
	</>
)

export default Page
