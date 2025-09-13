<template>
  <div class="container">
    <h1>{{ $t('products') }}</h1>
    <div class="products-grid">
      <div v-for="product in products" :key="product.id" class="product-card">
        <h2>{{ product.name }}</h2>
        <p class="category">{{ product.category }}</p>
        <p class="price">¥{{ product.price.toLocaleString() }}</p>
        <p>{{ product.description }}</p>
        <NuxtLink :to="localePath(`/products/${product.id}`)" class="link">
          {{ $t('product.detail') }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { products } = useProducts()
const localePath = useLocalePath()

useSeoMeta({
  title: '商品一覧',
  description: 'ローカルJSONから生成された商品一覧ページ'
})
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.product-card {
  border: 1px solid #ddd;
  padding: 1.5rem;
  border-radius: 8px;
  transition: box-shadow 0.3s;
}

.product-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.product-card h2 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.category {
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.price {
  font-size: 1.5rem;
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
</style>