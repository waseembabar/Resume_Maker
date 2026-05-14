// server/api/auth/user.get.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    // 1. Get user ID from cookie
    const userId = getCookie(event, 'userId')
    
    if (!userId) { 
      throw createError({
        statusCode: 401,
        statusMessage: 'Not authenticated'
      })
    }

    // 2. Fetch user from database
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) }
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
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