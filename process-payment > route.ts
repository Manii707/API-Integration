import { NextResponse } from 'next/server'
import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
})
export async function POST(request: Request) {
  try {
    const { amount, currency, paymentMethodId } = await request.json()
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method: paymentMethodId,
      confirm: true,
    })
    return NextResponse.json({ success: true, paymentIntent })
  } catch (error) {
    console.error('Error processing payment:', error)
    return NextResponse.json({ success: false, message: 'Failed to process payment' }, { status: 500 })
  }
}
