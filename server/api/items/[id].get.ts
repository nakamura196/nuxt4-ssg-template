import { readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Item ID is required'
    })
  }
  
  try {
    const itemPath = join(process.cwd(), 'data', 'items', `${id}.json`)
    const content = await readFile(itemPath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Item ${id} not found`
    })
  }
})