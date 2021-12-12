import Page from '@/components/page'
import { Formik, useFormik } from 'formik'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import {
	Block,
	BlockTitle,
	Button,
	Link,
	List,
	ListInput,
	ListItem,
	Navbar,
} from 'tailwind-mobile/react'

const Index = () => {
	const { data: session, status } = useSession()

	const { values, handleSubmit, handleBlur, handleChange, isSubmitting } =
		useFormik({
			initialValues: { email: '', description: '', fullName: '' },
			validate: (values) => {
				const errors: any = {}
				if (!values.email) {
					errors.email = 'Required'
				} else if (
					!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
				) {
					errors.email = 'Invalid email address'
				}
				return errors
			},
			onSubmit: (values, { setSubmitting }) => {
				mutate(values)
				// setTimeout(() => {
				// 	alert(JSON.stringify(values, null, 2))
				setSubmitting(false)
				// }, 400)
			},
		})
	const { data, mutate } = useMutation((values: any) =>
		fetch('/api/user', {
			body: JSON.stringify({
				//@ts-ignore
				userId: session?.userId,
				...values,
			}),
			method: 'POST',
		})
	)

	console.log(data)
	// const {} = useQuery()

	if (status === 'loading') {
		return '...'
	}

	if (status === 'unauthenticated') {
		return (
			<Page>
				<Block>
					<Button onClick={() => signIn()}>Log In</Button>
				</Block>
			</Page>
		)
	}

	return (
		<Page>
			<Navbar
				title={session?.user?.name || ''}
				right={
					<Link navbar onClick={() => signOut()}>
						Log Out
					</Link>
				}
			/>
			<BlockTitle>Only Inputs Inset</BlockTitle>

			<form onSubmit={handleSubmit}>
				<List inset>
					<ListInput
						name='fullName'
						placeholder='fullName'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.fullName}
					/>
					<ListInput
						type='email'
						name='email'
						placeholder='Email'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.email}
					/>
					<ListInput
						label='Textarea'
						type='textarea'
						placeholder='Описание'
						inputClassName='h-[120px] resize-none'
						name='description'
						onChange={handleChange}
						onBlur={handleBlur}
						value={values.description}
					/>
					<Button
						// @ts-ignore
						type='submit'
						disabled={isSubmitting}
					>
						Save
					</Button>
				</List>
			</form>
		</Page>
	)
}

export default Index
