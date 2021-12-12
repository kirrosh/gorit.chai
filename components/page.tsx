import Head from 'next/head'
import Appbar from '@/components/appbar'
import BottomNav from '@/components/bottom-nav'
import React from 'react'
import { App } from 'tailwind-mobile/react'

interface Props {
	title?: string
	children: React.ReactNode
}

const Page = ({ title, children }: Props) => (
	<App>
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
			className=''
		>
			<div className=''>{children}</div>
		</main>

		{/* <BottomNav /> */}
	</App>
)

export default Page
