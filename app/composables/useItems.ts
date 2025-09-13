interface ItemSpecs {
  [key: string]: string | number
}

interface Item {
  id: string
  name: string
  price: number
  category: string
  brand: string
  specs: ItemSpecs
  description: string
  stock: number
  images: string[]
  releaseDate: string
  tags: string[]
}

// サーバーAPIまたは静的インポートを使用
export const useItems = () => {
  // SSG時は静的インポート、クライアント側ではAPIを使用
  const loadAllItems = (): Item[] => {
    try {
      // ビルド時にすべてのアイテムJSONをインポート
      const modules = import.meta.glob<Item>('~/data/items/*.json', { 
        eager: true,
        import: 'default'
      })
      
      return Object.values(modules) as Item[]
    } catch (error) {
      console.error('Error loading items:', error)
      return []
    }
  }

  const loadItem = (id: string): Item | null => {
    try {
      // 特定のアイテムを動的にインポート
      const modules = import.meta.glob<Item>('~/data/items/*.json', { 
        eager: true,
        import: 'default'
      })
      
      const itemPath = Object.keys(modules).find(path => 
        path.includes(`${id}.json`)
      )
      
      if (itemPath && modules[itemPath]) {
        return modules[itemPath] as Item
      }
      return null
    } catch (error) {
      console.error(`Error loading item ${id}:`, error)
      return null
    }
  }

  const items = loadAllItems()
  
  return {
    items,
    getItem: (id: string) => loadItem(id),
    getItemsByCategory: (category: string) => 
      items.filter(item => item.category === category),
    getItemsByBrand: (brand: string) => 
      items.filter(item => item.brand === brand),
    getItemsByTag: (tag: string) =>
      items.filter(item => item.tags.includes(tag)),
    getAllCategories: () => 
      [...new Set(items.map(item => item.category))],
    getAllBrands: () =>
      [...new Set(items.map(item => item.brand))],
    getAllTags: () =>
      [...new Set(items.flatMap(item => item.tags))]
  }
}