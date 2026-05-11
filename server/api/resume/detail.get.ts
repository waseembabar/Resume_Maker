import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event)
    const id = Number(query.id)
    const userId = Number(query.userId || 1)

    if (!id || !userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'id and userId are required'
      })
    }

    const resume = await prisma.resume.findFirst({
      where: {
        id,
        userId
      }
    })

    if (!resume) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Resume not found'
      })
    }

    return {
      success: true,
      resume
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to fetch resume details'
    })
  }
})
