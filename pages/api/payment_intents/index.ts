import { NextApiRequest, NextApiResponse } from 'next'

import { CURRENCY, MIN_AMOUNT, MAX_AMOUNT } from '../../../config'
import { formatAmountForStripe } from '../../../utils/stripe-helpers'

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	//@ts-ignore
	apiVersion: null,
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		const { amount }: { amount: number } = req.body
		try {
			// Validate the amount that was passed from the client.
			if (!(amount >= MIN_AMOUNT && amount <= MAX_AMOUNT)) {
				throw new Error('Invalid amount.')
			}
			// Create PaymentIntent from body params.
			const params: Stripe.PaymentIntentCreateParams = {
				payment_method_types: ['card'],
				amount: formatAmountForStripe(amount, CURRENCY),
				currency: CURRENCY,
			}
			const payment_intent: Stripe.PaymentIntent =
				await stripe.paymentIntents.create(params)

			res.status(200).json(payment_intent)
		} catch (err: any) {
			res.status(500).json({ statusCode: 500, message: err.message })
		}
	} else {
		res.setHeader('Allow', 'POST')
		res.status(405).end('Method Not Allowed')
	}
}
