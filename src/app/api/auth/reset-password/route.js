import { NextResponse } from "next/server"
import { db } from "@/lib/database"
import { z } from "zod"
import crypto from "crypto"
import nodemailer from "nodemailer"

const resetPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
})

const newPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

// Request password reset
export async function POST(request) {
  try {
    const body = await request.json()
    const { email } = resetPasswordSchema.parse(body)

    const user = await db.findUserByEmail(email)

    if (!user) {
      // Don't reveal if email exists or not
      return NextResponse.json({
        message: "If an account with that email exists, we sent you a password reset link"
      })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    const resetTokenExpires = new Date(Date.now() + 3600000) // 1 hour

    // Save reset token
    await db.updateUser(user.id, {
      reset_token: resetToken,
      reset_token_expires: resetTokenExpires,
    })

    // Send email (if configured)
    if (process.env.EMAIL_SERVER_USER) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      })

      const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`

      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Reset Your Password - Serenity Living',
        html: `
          <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
            <h2 style="color: #10b981;">Reset Your Password</h2>
            <p>You requested to reset your password for your Serenity Living account.</p>
            <p>Click the link below to reset your password:</p>
            <a href="${resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #10b981; color: white; text-decoration: none; border-radius: 8px; margin: 20px 0;">Reset Password</a>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
          </div>
        `,
      })
    }

    return NextResponse.json({
      message: "If an account with that email exists, we sent you a password reset link"
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Password reset error:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}

// Reset password with token
export async function PUT(request) {
  try {
    const body = await request.json()
    const { token, password } = newPasswordSchema.parse(body)

    const user = await db.findUserByResetToken(token)

    if (!user) {
      return NextResponse.json(
        { message: "Invalid or expired reset token" },
        { status: 400 }
      )
    }

    // Hash new password
    const bcryptjs = require('bcryptjs')
    const hashedPassword = await bcryptjs.hash(password, 12)

    // Update password and clear reset token
    await db.updateUser(user.id, {
      password: hashedPassword,
      reset_token: null,
      reset_token_expires: null,
    })

    return NextResponse.json({
      message: "Password reset successfully"
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.errors[0].message },
        { status: 400 }
      )
    }

    console.error("Password reset error:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}