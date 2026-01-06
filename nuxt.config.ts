// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Tailwind CSS
  modules: ['@nuxtjs/tailwindcss'],

  // Global CSS
  css: ['~/assets/css/main.css'],

  // Site configuration
  app: {
    head: {
      title: 'Yoga i Tungelsta',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'description', content: 'Yoga i Tungelsta - Kundalini, Yin och mer. I en vacker gammal träkyrka. Ingår i medlemskap hos Core Gym Club.' },
        { key: 'theme-color', name: 'theme-color', content: '#e8f0e8' },
        { name: 'mobile-web-app-capable', content: 'yes' },
        { property: 'og:title', content: 'Yoga i Tungelsta' },
        { property: 'og:description', content: 'Yoga i Tungelsta - Kundalini, Yin och mer i en vacker gammal träkyrka.' },
        { property: 'og:type', content: 'website' },
        { name: 'robots', content: 'index, follow' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ]
    }
  },

  // SSR for SEO
  ssr: true,
  nitro: {
    preset: 'cloudflare-pages'
  }
})
