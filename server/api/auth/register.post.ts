// server/api/auth/register.post.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { name, email, password } = body

    // 1. Basic Validation
    if (!name || !email || !password) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Please provide name, email, and password.',
      })
    }

    // 2. Check if user already exists in XAMPP MySQL
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      throw createError({
        statusCode: 400,
        statusMessage: 'This email is already registered.',
      })
    }

    // 3. Hash the password for security
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // 4. Create the user
    const newUser = await prisma.user.create({
      data: {
        name: name, // Now saved correctly
        email: email,
        password: hashedPassword,
        status: 'LoggedIn'
      },
    })

    // 5. Success Response
    return {
      statusCode: 201,
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        status: newUser.status
      }
    }

  } catch (error: any) {
    console.error("Registration Error:", error)
    
    // If it's a Prisma error, provide a clearer message
    if (error.code === 'P2002') {
      return createError({
        statusCode: 409,
        statusMessage: 'Email already exists in the database.',
      })
    }

    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Database connection error. Ensure XAMPP is running.',
    })
  } finally {
    await prisma.$disconnect()
  }
})