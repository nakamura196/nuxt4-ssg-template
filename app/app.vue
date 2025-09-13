<template>
  <div>
    <NuxtRouteAnnouncer />
    <nav class="nav">
      <NuxtLink to="/">商品一覧</NuxtLink>
      <NuxtLink to="/categories">カテゴリー</NuxtLink>
      <NuxtLink to="/items">商品カタログ(個別JSON)</NuxtLink>
    </nav>
    <NuxtPage />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.nav {
  background: #333;
  padding: 1rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.nav a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav a:hover {
  background: rgba(255,255,255,0.1);
}

.nav a.router-link-active {
  background: rgba(255,255,255,0.2);
}
</style>
