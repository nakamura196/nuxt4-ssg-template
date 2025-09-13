<template>
  <div class="container">
    <h1>商品カタログ（個別JSONファイル版）</h1>
    
    <div class="filters">
      <div class="filter-group">
        <label>カテゴリー:</label>
        <select v-model="selectedCategory" @change="filterItems">
          <option value="">すべて</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      
      <div class="filter-group">
        <label>ブランド:</label>
        <select v-model="selectedBrand" @change="filterItems">
          <option value="">すべて</option>
          <option v-for="brand in brands" :key="brand" :value="brand">
            {{ brand }}
          </option>
        </select>
      </div>
    </div>

    <div class="items-grid">
      <div v-for="item in filteredItems" :key="item.id" class="item-card">
        <div class="item-header">
          <h2>{{ item.name }}</h2>
          <span class="brand">{{ item.brand }}</span>
        </div>
        <p class="category">{{ item.category }}</p>
        <p class="price">¥{{ item.price.toLocaleString() }}</p>
        <p class="description">{{ item.description }}</p>
        <div class="item-meta">
          <span class="stock">在庫: {{ item.stock }}個</span>
          <span class="release">発売: {{ item.releaseDate }}</span>
        </div>
        <div class="tags">
          <span v-for="tag in item.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
        <NuxtLink :to="`/items/${item.id}`" class="link">
          詳細を見る →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 静的インポートでJSONファイルを読み込む
import laptopData001 from '~/data/items/laptop-001.json'
import laptopData002 from '~/data/items/laptop-002.json'
import mouseData001 from '~/data/items/mouse-001.json'
import keyboardData001 from '~/data/items/keyboard-001.json'
import monitorData001 from '~/data/items/monitor-001.json'

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

// すべてのアイテムデータを配列にまとめる
const items = ref<Item[]>([
  laptopData001,
  laptopData002,
  mouseData001,
  keyboardData001,
  monitorData001
])

const categories = computed(() => 
  [...new Set(items.value.map(item => item.category))]
)
const brands = computed(() => 
  [...new Set(items.value.map(item => item.brand))]
)

const selectedCategory = ref('')
const selectedBrand = ref('')
const filteredItems = ref(items.value)

const filterItems = () => {
  filteredItems.value = items.value.filter(item => {
    const categoryMatch = !selectedCategory.value || item.category === selectedCategory.value
    const brandMatch = !selectedBrand.value || item.brand === selectedBrand.value
    return categoryMatch && brandMatch
  })
}

useSeoMeta({
  title: '商品カタログ - 個別JSONファイル版',
  description: '個別のJSONファイルから生成された商品カタログページ'
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  margin-bottom: 2rem;
  color: #333;
}

.filters {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: #666;
}

.filter-group select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  min-width: 150px;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.item-card {
  border: 1px solid #e0e0e0;
  padding: 1.5rem;
  border-radius: 12px;
  background: white;
  transition: all 0.3s;
}

.item-card:hover {
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1rem;
}

.item-card h2 {
  font-size: 1.25rem;
  margin: 0;
  color: #333;
}

.brand {
  background: #f0f0f0;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #666;
}

.category {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.price {
  font-size: 1.75rem;
  font-weight: bold;
  color: #e91e63;
  margin: 1rem 0;
}

.description {
  color: #666;
  line-height: 1.6;
  margin: 1rem 0;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;
  font-size: 0.85rem;
  color: #888;
}

.stock {
  font-weight: 600;
  color: #4caf50;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
}

.tag {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
}

.link {
  display: inline-block;
  margin-top: 1rem;
  color: #1976d2;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
}

.link:hover {
  color: #0d47a1;
  text-decoration: underline;
}
</style>