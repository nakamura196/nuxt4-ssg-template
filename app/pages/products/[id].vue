<template>
  <div class="container">
    <NuxtLink to="/" class="back-link">← 商品一覧に戻る</NuxtLink>
    <div v-if="product" class="product-detail">
      <h1>{{ product.name }}</h1>
      <div class="product-info">
        <p class="category">カテゴリー: {{ product.category }}</p>
        <p class="price">¥{{ product.price.toLocaleString() }}</p>
        <p class="description">{{ product.description }}</p>
      </div>
    </div>
    <div v-else>
      <p>商品が見つかりません</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { getProduct } = useProducts()

const productId = parseInt(route.params.id as string)
const product = getProduct(productId)

if (!product) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Product not found'
  })
}

useSeoMeta({
  title: product.name,
  description: product.description
})
</script>

<style scoped>
.container {
  max-width: 800px;
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

.product-detail h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.product-info {
  background: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
}

.category {
  color: #666;
  margin-bottom: 1rem;
}

.price {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin: 1rem 0;
}

.description {
  font-size: 1.1rem;
  line-height: 1.6;
}
</style>