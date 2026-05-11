// server/api/resume/save.post.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { userId, title, content } = body

    // 1. Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { resumes: true }
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    // 2. Optional: Check Resume Limits (Guest: 2, LoggedIn: 5, Subscriber: 100)
    const limit = user.status === 'Subscriber' ? 100 : (user.status === 'LoggedIn' ? 5 : 2)
    if (user.resumes.length >= limit) {
      throw createError({
        statusCode: 403,
        statusMessage: `You have reached your limit of ${limit} resumes.`
      })
    }

    // 3. Save the Resume to XAMPP
    const newResume = await prisma.resume.create({
      data: {
        title: title || 'Untitled Resume',
        content: content, // This saves the JSON object containing Education, Skills, etc.
        userId: userId
      }
    })

    return {
      success: true,
      message: 'Resume saved successfully!',
      resume: newResume
    }

  } catch (error: any) {
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error'
    })
  }
})