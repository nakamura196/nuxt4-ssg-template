<template>
  <header class="app-header">
    <div class="header-container">
      <nav class="nav-menu">
        <NuxtLink :to="localePath('/')" class="nav-link">
          {{ $t('products') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/categories')" class="nav-link">
          {{ $t('categories') }}
        </NuxtLink>
        <NuxtLink :to="localePath('/items')" class="nav-link">
          {{ $t('catalog') }}
        </NuxtLink>
      </nav>
      
      <div class="language-switcher">
        <NuxtLink 
          v-for="locale in availableLocales" 
          :key="locale.code"
          :to="switchLocalePath(locale.code)"
          :class="['lang-btn', { active: locale.code === currentLocale }]"
        >
          {{ locale.name }}
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()

const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => locales.value)
</script>

<style scoped>
.app-header {
  background: #2c3e50;
  color: white;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255,255,255,0.1);
}

.nav-link.router-link-active {
  background-color: rgba(255,255,255,0.2);
}

.language-switcher {
  display: flex;
  gap: 0.5rem;
}

.lang-btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: transparent;
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;
  text-decoration: none;
}

.lang-btn:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.5);
}

.lang-btn.active {
  background: rgba(255,255,255,0.2);
  border-color: white;
  font-weight: bold;
}

@media (max-width: 768px) {
  .header-container {
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
  }
  
  .nav-menu {
    width: 100%;
    justify-content: center;
    gap: 1rem;
  }
  
  .nav-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }
}
</style>