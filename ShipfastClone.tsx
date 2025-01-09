'use client'
import { useState } from 'react'
import { generateLandingPage } from '../actions/generateLandingPage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
export default function ShipfastClone() {
  const [emailResult, setEmailResult] = useState<string | null>(null)
  const [paymentResult, setPaymentResult] = useState<string | null>(null)
  const [landingPageResult, setLandingPageResult] = useState<string | null>(null)
  const handleSendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const to = formData.get('to') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ to, subject, message }),
      })
      const data = await response.json()
      setEmailResult(data.success ? 'Email sent successfully!' : 'Failed to send email')
    } catch (error) {
      setEmailResult('Error sending email')
    }
  }
  const handleProcessPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const amount = Number(formData.get('amount'))
    const currency = formData.get('currency') as string
    const paymentMethodId = formData.get('paymentMethodId') as string
    try {
      const response = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount, currency, paymentMethodId }),
      })
      const data = await response.json()
      setPaymentResult(data.success ? 'Payment processed successfully!' : 'Failed to process payment')
    } catch (error) {
      setPaymentResult('Error processing payment')
    }
  }
  const handleGenerateLandingPage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const callToAction = formData.get('callToAction') as string
    try {
      const result = await generateLandingPage(title, description, callToAction)
      setLandingPageResult(result.success ? 'Landing page generated successfully!' : 'Failed to generate landing page')
    } catch (error) {
      setLandingPageResult('Error generating landing page')
    }
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Send Email</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSendEmail} className="space-y-4">
            <Input name="to" placeholder="To" required />
            <Input name="subject" placeholder="Subject" required />
            <Textarea name="message" placeholder="Message" required />
            <Button type="submit">Send Email</Button>
          </form>
          {emailResult && <p className="mt-2">{emailResult}</p>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Process Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProcessPayment} className="space-y-4">
            <Input name="amount" type="number" placeholder="Amount" required />
            <Input name="currency" placeholder="Currency" required />
            <Input name="paymentMethodId" placeholder="Payment Method ID" required />
            <Button type="submit">Process Payment</Button>
          </form>
          {paymentResult && <p className="mt-2">{paymentResult}</p>}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Generate Landing Page</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleGenerateLandingPage} className="space-y-4">
            <Input name="title" placeholder="Title" required />
            <Input name="description" placeholder="Description" required />
            <Input name="callToAction" placeholder="Call to Action" required />
            <Button type="submit">Generate Landing Page</Button>
          </form>
          {landingPageResult && <p className="mt-2">{landingPageResult}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
