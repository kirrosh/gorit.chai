import React from 'react'
import { Block, BlockTitle, List, ListItem } from 'tailwind-mobile/react'

type Props = {
	data: { email: ''; fullName: ''; description: '' }
}

const Info = ({ data }: Props) => {
	return (
		<>
			<BlockTitle className='text-2xl'>Описание</BlockTitle>
			<Block>{data.description}</Block>
			<BlockTitle className='text-2xl'>Email</BlockTitle>
			<Block>{data.email}</Block>
		</>
	)
}

// const transactions = Array.from({ length: 5 })

// const Transactions = () => {
// 	return (
// 		<List>
// 			{transactions.map((tra, i) => {
// 				return <ListItem>{i}</ListItem>
// 			})}
// 		</List>
// 	)
// }

export default Info
