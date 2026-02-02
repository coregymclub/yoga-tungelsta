// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Tailwind CSS
  modules: ['@nuxtjs/tailwindcss'],

  // Global CSS
  css: ['~/assets/css/main.css'],

  // Runtime config
  runtimeConfig: {
    public: {
      zoeziUrl: 'https://z.coregym.club'
    }
  },

  // Site configuration
  app: {
    head: {
      title: 'Core Gym Yoga',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Yoga i Haninge - Kundalini, Yin, Ashtanga och mer. Tungelsta & Vegastaden. Ingår i medlemskap hos Core Gym Club.' },
        { key: 'theme-color', name: 'theme-color', content: '#D93636' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { property: 'og:title', content: 'Core Gym Yoga' },
        { property: 'og:description', content: 'Yoga i Haninge - Kundalini, Yin och mer. Tungelsta & Vegastaden.' },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/core-symbol.svg' },
      ]
    }
  },

  // SSR for SEO
  ssr: true,
  nitro: {
    preset: 'cloudflare-pages'
  }
})
