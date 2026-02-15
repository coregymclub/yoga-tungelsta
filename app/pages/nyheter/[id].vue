<script setup lang="ts">
/**
 * Dynamic news page - renders a single news item with full OG meta tags
 * URL: /nyheter/:id - shareable link for social media
 */

const route = useRoute()
const newsId = route.params.id as string

const NEWS_API = 'https://coregym-news-api.gustav-brydner.workers.dev'
const DEFAULT_IMAGE = 'https://coregym.yoga/images/coregym-annexet.jpg'

interface NewsItem {
  id: string
  title: string
  content: string | null
  summary: string | null
  imageUrl: string | null
  link: string | null
  author: string | null
  published_at: string | null
  categories: string[]
}

// Fetch news item server-side for SSR OG tags
const { data: newsItem, error } = await useFetch<NewsItem>(
  `${NEWS_API}/news/${newsId}`
)

// Redirect to dedicated pages for known event types
if (newsItem.value) {
  const cats = newsItem.value.categories || []
  const title = (newsItem.value.title || '').toLowerCase()

  if (newsItem.value.link) {
    const link = newsItem.value.link
    if (link.startsWith('https://coregym.yoga/') || link.startsWith('/')) {
      const path = link.replace('https://coregym.yoga', '')
      if (path !== `/nyheter/${newsId}`) {
        navigateTo(path, { redirectCode: 301 })
      }
    }
  } else if (cats.includes('retreat') || title.includes('retreat')) {
    navigateTo('/retreat', { redirectCode: 301 })
  }
}

// OG image: use news imageUrl, proxy through CDN, or default
function getOgImage(item: NewsItem | null): string {
  if (!item?.imageUrl) return DEFAULT_IMAGE
  return item.imageUrl.replace('coregymclub.zoezi.se', 'z.coregym.club')
}

const ogTitle = computed(() => newsItem.value?.title || 'Nyhet')
const ogDesc = computed(() => newsItem.value?.summary || newsItem.value?.title || '')
const ogImage = computed(() => getOgImage(newsItem.value))
const ogUrl = computed(() => `https://coregym.yoga/nyheter/${newsId}`)

useSeoMeta({
  title: () => `${ogTitle.value} | Core Gym Yoga`,
  description: () => ogDesc.value,
  ogTitle: () => ogTitle.value,
  ogDescription: () => ogDesc.value,
  ogUrl: () => ogUrl.value,
  ogImage: () => ogImage.value,
  ogType: 'article',
  ogSiteName: 'Core Gym Yoga',
  twitterCard: 'summary_large_image',
  twitterTitle: () => ogTitle.value,
  twitterDescription: () => ogDesc.value,
  twitterImage: () => ogImage.value,
})

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })
}

const showCopied = ref(false)

async function shareLink() {
  const url = `https://coregym.yoga/nyheter/${newsId}`

  if (navigator.share) {
    try {
      await navigator.share({
        title: newsItem.value?.title || 'Nyhet',
        text: newsItem.value?.summary || '',
        url
      })
      return
    } catch (e) {
      // User cancelled or share failed, fall through to clipboard
    }
  }

  try {
    await navigator.clipboard.writeText(url)
    showCopied.value = true
    setTimeout(() => showCopied.value = false, 2000)
  } catch (e) {
    // Fallback
    window.prompt('Kopiera l\u00e4nken:', url)
  }
}
</script>

<template>
  <div class="news-page">
    <!-- Not found -->
    <div v-if="error || !newsItem" class="not-found">
      <div class="container-yoga">
        <h1 class="not-found-title">Nyheten hittades inte</h1>
        <p class="not-found-text">Den h&#228;r nyheten finns inte l&#228;ngre.</p>
        <NuxtLink to="/" class="back-link">Tillbaka till startsidan</NuxtLink>
      </div>
    </div>

    <!-- News content -->
    <template v-else>
      <!-- Header image -->
      <div class="news-hero">
        <div v-if="getOgImage(newsItem) !== DEFAULT_IMAGE" class="hero-image-wrap">
          <img
            :src="getOgImage(newsItem)"
            :alt="newsItem.title"
            class="hero-image"
          />
          <div class="hero-overlay" />
        </div>
        <div v-else class="hero-placeholder" />
      </div>

      <!-- Content -->
      <article class="news-content">
        <div class="container-yoga content-container">
          <!-- Meta -->
          <div class="news-meta">
            <span v-if="newsItem.published_at" class="meta-date">
              {{ formatDate(newsItem.published_at) }}
            </span>
            <span v-for="cat in newsItem.categories" :key="cat" class="meta-tag">
              {{ cat }}
            </span>
          </div>

          <h1 class="news-title">{{ newsItem.title }}</h1>

          <p v-if="newsItem.summary && !newsItem.content" class="news-summary">
            {{ newsItem.summary }}
          </p>

          <div
            v-if="newsItem.content"
            class="news-body prose"
            v-html="newsItem.content"
          />

          <!-- Share -->
          <div class="share-section">
            <button @click="shareLink" class="share-button">
              <svg v-if="!showCopied" class="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <svg v-else class="share-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ showCopied ? 'L&#228;nk kopierad!' : 'Dela' }}</span>
            </button>
          </div>

          <!-- Back -->
          <div class="back-section">
            <NuxtLink to="/" class="back-link">
              <svg class="back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Tillbaka
            </NuxtLink>
          </div>
        </div>
      </article>
    </template>
  </div>
</template>

<style scoped>
.news-page {
  --color-forest: #2d3a2d;
  --color-sage: #8b9e8b;
  --color-sage-light: #c4d4c4;
  --color-cream: #faf8f5;
  --color-cream-dark: #f0ebe3;
  --color-terra: #c4846a;
  --font-display: 'Suisse BP Intl', serif;
  --font-body: 'Neue Montreal', sans-serif;
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);

  min-height: 100vh;
  background: var(--color-cream);
}

/* Hero */
.news-hero {
  position: relative;
}

.hero-image-wrap {
  position: relative;
  height: 40vh;
  max-height: 400px;
  overflow: hidden;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, var(--color-cream) 100%);
}

.hero-placeholder {
  height: 80px;
  background: linear-gradient(135deg, var(--color-forest) 0%, #3d4a3d 100%);
}

/* Content */
.content-container {
  max-width: 720px;
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.news-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.meta-date {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-sage);
}

.meta-tag {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  background: var(--color-cream-dark);
  border-radius: 100px;
  font-family: var(--font-body);
  font-size: 0.7rem;
  font-weight: 500;
  color: var(--color-sage);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.news-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--color-forest);
  line-height: 1.2;
  margin-bottom: 2rem;
}

.news-summary {
  font-family: var(--font-body);
  font-size: 1.25rem;
  color: var(--color-forest);
  opacity: 0.85;
  line-height: 1.8;
}

.news-body {
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--color-forest);
  line-height: 1.8;
}

.news-body :deep(h2) {
  font-family: var(--font-display);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-forest);
  margin: 2rem 0 1rem;
}

.news-body :deep(h3) {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-forest);
  margin: 1.5rem 0 0.75rem;
}

.news-body :deep(p) {
  margin-bottom: 1rem;
}

.news-body :deep(a) {
  color: var(--color-terra);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.news-body :deep(a:hover) {
  opacity: 0.8;
}

/* Share */
.share-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid var(--color-cream-dark);
}

.share-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: white;
  border: 1px solid var(--color-cream-dark);
  border-radius: 100px;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-forest);
  cursor: pointer;
  transition: all 0.3s var(--ease-smooth);
}

.share-button:hover {
  background: var(--color-cream-dark);
}

.share-icon {
  width: 18px;
  height: 18px;
}

/* Back */
.back-section {
  margin-top: 2rem;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-sage);
  text-decoration: none;
  transition: color 0.3s;
}

.back-link:hover {
  color: var(--color-forest);
}

.back-icon {
  width: 18px;
  height: 18px;
}

/* Not found */
.not-found {
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.not-found-title {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-forest);
  margin-bottom: 1rem;
}

.not-found-text {
  font-family: var(--font-body);
  color: var(--color-sage);
  margin-bottom: 2rem;
}
</style>
