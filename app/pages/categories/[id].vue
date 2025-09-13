<template>
  <div class="container">
    <NuxtLink to="/categories" class="back-link">← カテゴリー一覧に戻る</NuxtLink>
    <div v-if="category">
      <h1>{{ category.name }}</h1>
      <p class="description">{{ category.description }}</p>
      
      <h2>このカテゴリーの商品</h2>
      <div class="products-grid">
        <div v-for="product in categoryProducts" :key="product.id" class="product-card">
          <h3>{{ product.name }}</h3>
          <p class="price">¥{{ product.price.toLocaleString() }}</p>
          <p>{{ product.description }}</p>
          <NuxtLink :to="`/products/${product.id}`" class="link">
            詳細を見る
          </NuxtLink>
        </div>
      </div>
      
      <div v-if="categoryProducts.length === 0" class="no-products">
        このカテゴリーには商品がありません
      </div>
    </div>
    <div v-else>
      <p>カテゴリーが見つかりません</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getCategory } = useCategories()
const { getProductsByCategory } = useProducts()

const categoryId = route.params.id as string
const category = getCategory(categoryId)

if (!category) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Category not found'
  })
}

const categoryProducts = getProductsByCategory(category.name)

useSeoMeta({
  title: `${category.name} - カテゴリー`,
  description: category.description
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.back-link {
  display: inline-block;
  margin-bottom: 2rem;
  color: #0066cc;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

.description {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

h2 {
  margin-top: 3rem;
  margin-bottom: 1.5rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
}

.product-card {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
}

.product-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin: 1rem 0;
}

.link {
  display: inline-block;
  margin-top: 1rem;
  color: #0066cc;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.no-products {
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;
  text-align: center;
  color: #666;
}
</style>