import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async () => {
  try {
    const itemsDir = join(process.cwd(), 'data', 'items')
    const files = await readdir(itemsDir)
    const jsonFiles = files.filter(file => file.endsWith('.json'))
    
    const items = await Promise.all(
      jsonFiles.map(async (file) => {
        const content = await readFile(join(itemsDir, file), 'utf-8')
        return JSON.parse(content)
      })
    )
    
    return items
  } catch (error) {
    console.error('Error reading items:', error)
    return []
  }
})