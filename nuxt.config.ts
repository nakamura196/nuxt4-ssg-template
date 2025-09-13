// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/content'
  ],

  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true
    },
    experimental: {
      wasm: true
    }
  },
  
  hooks: {
    'nitro:config': (nitroConfig) => {
      // 個別JSONファイルからルートを動的に生成
      const itemFiles = ['laptop-001', 'laptop-002', 'mouse-001', 'keyboard-001', 'monitor-001']
      const itemRoutes = itemFiles.map(id => `/items/${id}`)
      
      if (nitroConfig.prerender?.routes) {
        nitroConfig.prerender.routes.push(...itemRoutes)
      }
    }
  },

  experimental: {
    payloadExtraction: false
  },

  ssr: true,

  routeRules: {
    '/': { prerender: true },
    '/products/**': { prerender: true },
    '/categories': { prerender: true },
    '/categories/**': { prerender: true },
    '/items': { prerender: true },
    '/items/**': { prerender: true }
  },

  app: {
    baseURL: process.env.NITRO_APP_BASE_URL || '/',
    buildAssetsDir: '/_nuxt/'
  }
})