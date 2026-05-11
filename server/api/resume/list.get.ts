import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const userId = Number(query.userId || 1)

    if (!userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'userId is required'
      })
    }

    const resumes = await prisma.resume.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        createdAt: true,
        content: true
      }
    })

    return {
      success: true,
      resumes
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch resumes'
    })
  }
})
