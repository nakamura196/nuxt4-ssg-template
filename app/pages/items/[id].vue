<template>
  <div class="container">
    <NuxtLink to="/items" class="back-link">← 商品カタログに戻る</NuxtLink>
    
    <div v-if="item" class="item-detail">
      <div class="item-header">
        <div>
          <h1>{{ item.name }}</h1>
          <div class="meta">
            <span class="brand">{{ item.brand }}</span>
            <span class="category">{{ item.category }}</span>
          </div>
        </div>
        <div class="price-section">
          <p class="price">¥{{ item.price.toLocaleString() }}</p>
          <p class="stock" :class="{ 'low-stock': item.stock < 10 }">
            在庫: {{ item.stock }}個
          </p>
        </div>
      </div>

      <div class="description-section">
        <h2>商品説明</h2>
        <p>{{ item.description }}</p>
      </div>

      <div class="specs-section">
        <h2>仕様</h2>
        <table class="specs-table">
          <tbody>
            <tr v-for="(value, key) in item.specs" :key="key">
              <th>{{ formatSpecKey(key) }}</th>
              <td>{{ value }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="images-section" v-if="item.images && item.images.length">
        <h2>商品画像</h2>
        <div class="images-grid">
          <div v-for="(image, index) in item.images" :key="index" class="image-placeholder">
            {{ image }}
          </div>
        </div>
      </div>

      <div class="footer-meta">
        <p class="release-date">発売日: {{ formatDate(item.releaseDate) }}</p>
        <div class="tags">
          <span v-for="tag in item.tags" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
    
    <div v-else class="not-found">
      <h2>商品が見つかりません</h2>
      <p>指定された商品ID「{{ route.params.id }}」の商品は存在しません。</p>
      <NuxtLink to="/items" class="link">商品カタログに戻る</NuxtLink>
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

const route = useRoute()
const itemId = route.params.id as string

// IDに基づいて適切なデータを選択
const itemsMap: Record<string, Item> = {
  'laptop-001': laptopData001,
  'laptop-002': laptopData002,
  'mouse-001': mouseData001,
  'keyboard-001': keyboardData001,
  'monitor-001': monitorData001
}

const item = itemsMap[itemId] || null

if (!item) {
  throw createError({
    statusCode: 404,
    statusMessage: `Item ${itemId} not found`
  })
}

const formatSpecKey = (key: string): string => {
  const specLabels: Record<string, string> = {
    cpu: 'CPU',
    memory: 'メモリ',
    storage: 'ストレージ',
    display: 'ディスプレイ',
    connection: '接続方式',
    battery: 'バッテリー',
    dpi: 'DPI',
    buttons: 'ボタン数',
    switch: 'スイッチ',
    layout: 'レイアウト',
    keys: 'キー数',
    size: 'サイズ',
    resolution: '解像度',
    panel: 'パネル',
    refreshRate: 'リフレッシュレート',
    ports: 'ポート'
  }
  return specLabels[key] || key
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useSeoMeta({
  title: item ? `${item.name} - ${item.brand}` : '商品詳細',
  description: item?.description || ''
})
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: #1976d2;
  text-decoration: none;
  font-weight: 600;
}

.back-link:hover {
  text-decoration: underline;
}

.item-detail {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  padding-bottom: 2rem;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 2rem;
}

.item-detail h1 {
  font-size: 2rem;
  margin: 0 0 1rem 0;
  color: #333;
}

.meta {
  display: flex;
  gap: 1rem;
}

.brand {
  background: #e3f2fd;
  color: #1976d2;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
}

.category {
  background: #f5f5f5;
  color: #666;
  padding: 0.5rem 1rem;
  border-radius: 6px;
}

.price-section {
  text-align: right;
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
  color: #e91e63;
  margin: 0;
}

.stock {
  font-size: 1.1rem;
  color: #4caf50;
  font-weight: 600;
  margin-top: 0.5rem;
}

.stock.low-stock {
  color: #ff9800;
}

.description-section,
.specs-section,
.images-section {
  margin: 2rem 0;
}

h2 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #e0e0e0;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
}

.specs-table th,
.specs-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #f0f0f0;
}

.specs-table th {
  background: #f8f8f8;
  font-weight: 600;
  color: #666;
  width: 30%;
}

.specs-table td {
  color: #333;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.image-placeholder {
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
  text-align: center;
  color: #999;
  font-size: 0.85rem;
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.footer-meta {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.release-date {
  color: #666;
  font-size: 0.95rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #fff3e0;
  color: #f57c00;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.not-found {
  background: #fff;
  padding: 3rem;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.not-found h2 {
  color: #e91e63;
  margin-bottom: 1rem;
}

.not-found p {
  color: #666;
  margin-bottom: 2rem;
}

.not-found .link {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #1976d2;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  font-weight: 600;
}

.not-found .link:hover {
  background: #0d47a1;
}
</style>