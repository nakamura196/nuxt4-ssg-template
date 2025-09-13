<template>
  <div class="container">
    <h1>カテゴリー一覧</h1>
    <div class="categories-grid">
      <NuxtLink 
        v-for="category in categories" 
        :key="category.id"
        :to="`/categories/${category.id}`"
        class="category-card"
      >
        <h2>{{ category.name }}</h2>
        <p>{{ category.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const { categories } = useCategories()
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.category-card {
  display: block;
  border: 1px solid #ddd;
  padding: 2rem;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.category-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transform: translateY(-2px);
}

.category-card h2 {
  color: #333;
  margin-bottom: 1rem;
}

.category-card p {
  color: #666;
}
</style>