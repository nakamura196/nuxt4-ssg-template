import productsData from '~/data/products.json'
import categoriesData from '~/data/categories.json'

interface Product {
  id: string | number
  name: string
  price: number
  category: string
  description: string
  image: string
}

interface Category {
  id: string
  name: string
  description: string
}

export const useProducts = () => {
  const products = productsData as Product[]
  return {
    products,
    getProduct: (id: number | string) => products.find(p => String(p.id) === String(id)),
    getProductsByCategory: (category: string) => 
      products.filter(p => p.category === category)
  }
}

export const useCategories = () => {
  const categories = categoriesData as Category[]
  return {
    categories,
    getCategory: (id: string) => categories.find(c => c.id === id)
  }
}