import { useRouter } from 'next/router'
import { useState } from 'react'
import {
	Block,
	Button,
	Card,
	Navbar,
	Page,
	Chip,
	ListInput,
	List,
} from 'tailwind-mobile/react'

const inactiveColor = {}
const activeColor = { bg: 'bg-green-500', text: 'text-white' }

const User = () => {
	const router = useRouter()
	const userId = router.query['id']
	const [value, setValue] = useState<number>()

	if (typeof userId !== 'string') {
		return null
	}

	return (
		<Page>
			<Navbar title={'ГорькийЧай'} />
			<div className='flex justify-center p-3 text-lg'>Николай Первый</div>

			<Block title={'Николай Первый'} className='flex justify-center '>
				<div className='relative flex items-center justify-center w-12 h-12 m-1 mr-2 text-xl text-white uppercase bg-green-500 rounded-full'>
					<img
						src='http://source.unsplash.com/100x100/?man'
						className='rounded-full'
					/>
				</div>
			</Block>
			<Block>
				<Block
					strong
					className='flex flex-col justify-center'
					hairlines={false}
				>
					<div className='flex justify-center p-3 text-lg'>
						Сколько хотите оставить?
					</div>

					<List>
						<ListInput
							inlineLabel
							type='number'
							placeholder='Введите сумму'
							onChange={(e: any) => {
								setValue(e.target.value)
							}}
							value={value}
						/>
					</List>

					<div>
						<Chip
							className='m-0.5'
							onClick={() => setValue(50)}
							colors={Number(value) === 50 ? activeColor : inactiveColor}
						>
							50р
						</Chip>
						<Chip
							className='m-0.5'
							onClick={() => setValue(150)}
							colors={Number(value) === 150 ? activeColor : inactiveColor}
						>
							150р
						</Chip>
						<Chip
							className='m-0.5'
							onClick={() => setValue(250)}
							colors={Number(value) === 250 ? activeColor : inactiveColor}
						>
							250р
						</Chip>
						<Chip
							className='m-0.5'
							onClick={() => setValue(350)}
							colors={Number(value) === 350 ? activeColor : inactiveColor}
						>
							350р
						</Chip>
						<Chip
							className='m-0.5'
							onClick={() => setValue(450)}
							colors={Number(value) === 450 ? activeColor : inactiveColor}
						>
							450р
						</Chip>
						<Chip
							className='m-0.5'
							onClick={() => setValue(550)}
							colors={Number(value) === 550 ? activeColor : inactiveColor}
						>
							550р
						</Chip>
					</div>
				</Block>

				<Button>Оставить чаевые</Button>
			</Block>
		</Page>
	)
}

export default User