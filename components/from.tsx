import { values } from 'faunadb'
import { useFormik } from 'formik'
import React from 'react'
import { useMutation } from 'react-query'
import { List, ListInput, Button } from 'tailwind-mobile/react'

type Props = {
	data: any
}
const Form = ({ data }: Props) => {
	const { values, handleSubmit, handleBlur, handleChange, isSubmitting } =
		useFormik({
			initialValues: data,
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
	const { mutate } = useMutation((values: any) =>
		fetch('/api/user', {
			body: JSON.stringify({
				//@ts-ignore
				userId: session?.userId,
				...values,
			}),
			method: 'POST',
		})
	)
	return (
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
	)
}

export default Form
