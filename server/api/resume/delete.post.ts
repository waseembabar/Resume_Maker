import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const id = Number(body?.id)
    const userId = Number(body?.userId || 1)

    if (!id || !userId) {
      throw createError({
        statusCode: 400,
        statusMessage: 'id and userId are required'
      })
    }

    const resume = await prisma.resume.findFirst({
      where: { id, userId }
    })

    if (!resume) {
      throw createError({
        statusCode: 404,
        statusMessage: 'Resume not found'
      })
    }

    await prisma.resume.delete({
      where: { id }
    })

    return {
      success: true,
      message: 'Resume deleted successfully'
    }
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.statusMessage || 'Failed to delete resume'
    })
  }
})
