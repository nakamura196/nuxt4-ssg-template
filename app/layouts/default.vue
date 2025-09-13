<template>
  <div>
    <AppHeader />
    <main class="main-content">
      <slot />
    </main>
    <footer class="app-footer">
      <p>&copy; 2024 Nuxt4 SSG Template</p>
    </footer>
  </div>
</template>

<style scoped>
.main-content {
  min-height: calc(100vh - 120px);
}

.app-footer {
  background: #34495e;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
}
</style>