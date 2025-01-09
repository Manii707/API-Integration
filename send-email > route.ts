import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})
export async function POST(request: Request) {
  try {
    const { to, subject, message } = await request.json()
    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      text: message,
    }
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ success: true, message: 'Email sent successfully!' })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 })
  }
}
