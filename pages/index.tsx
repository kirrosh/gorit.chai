import Page from '@/components/page'
import { Formik } from 'formik'
import { signIn, signOut, useSession } from 'next-auth/react'
import React from 'react'
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
			<Formik
				initialValues={{ email: '', info: '' }}
				validate={(values) => {
					const errors: any = {}
					if (!values.email) {
						errors.email = 'Required'
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
					) {
						errors.email = 'Invalid email address'
					}
					return errors
				}}
				onSubmit={(values, { setSubmitting }) => {
					console.log(values)
					// setTimeout(() => {
					// 	alert(JSON.stringify(values, null, 2))
					setSubmitting(false)
					// }, 400)
				}}
			>
				{({
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					handleSubmit,
					isSubmitting,
				}) => (
					<form onSubmit={handleSubmit}>
						<List inset>
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
								name='info'
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.info}
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
				)}
			</Formik>
		</Page>
	)
}

export default Index
