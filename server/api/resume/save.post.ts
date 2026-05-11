// server/api/resume/save.post.ts
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { userId, resumeId, title, content } = body
    const normalizedUserId = Number(userId)
    if (!normalizedUserId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Valid userId is required'
      })
    }

    // 1. Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: normalizedUserId },
      include: { resumes: true }
    })

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: 'User not found'
      })
    }

    let savedResume
    if (resumeId) {
      const existingResume = await prisma.resume.findUnique({
        where: { id: Number(resumeId) }
      })

      if (!existingResume || existingResume.userId !== normalizedUserId) {
        throw createError({
          statusCode: 404,
          statusMessage: 'Resume not found for this user'
        })
      }

      savedResume = await prisma.resume.update({
        where: { id: Number(resumeId) },
        data: {
          title: title || existingResume.title || 'Untitled Resume',
          content
        }
      })
    } else {
      // Optional: Check Resume Limits (Guest: 2, LoggedIn: 5, Subscriber: 100)
      const limit = user.status === 'Subscriber' ? 100 : (user.status === 'LoggedIn' ? 5 : 2)
      if (user.resumes.length >= limit) {
        throw createError({
          statusCode: 403,
          statusMessage: `You have reached your limit of ${limit} resumes.`
        })
      }

      savedResume = await prisma.resume.create({
        data: {
          title: title || 'Untitled Resume',
          content,
          userId: normalizedUserId
        }
      })
    }

    return {
      success: true,
      message: resumeId ? 'Resume updated successfully!' : 'Resume saved successfully!',
      resume: savedResume
    }

  } catch (error: any) {
    return createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Internal Server Error'
    })
  }
})