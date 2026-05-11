// server/api/auth/login.post.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { email, password } = body

    // 1. Check if user exists in XAMPP
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password.'
      })
    }

    // 2. Compare the plain text password with the hashed password in DB
    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid email or password.'
      })
    }

    // 3. Success: Return user data (Exclude password for security)
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      status: user.status
    }

  } catch (error: any) {
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error'
    })
  } finally {
    await prisma.$disconnect()
  }
})