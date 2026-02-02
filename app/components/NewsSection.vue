<script setup lang="ts">
/**
 * NewsSection - Displays yoga-related news and events
 * Fetches from coregym-news-api with yoga/tungelsta categories
 */

interface NewsItem {
  id: string
  title: string
  content: string | null
  summary: string | null
  imageUrl: string | null
  author: string | null
  published_at: string | null
  categories: string[]
}

const NEWS_API = 'https://coregym-news-api.gustav-brydner.workers.dev'

const yogaNews = ref<NewsItem[]>([])
const otherNews = ref<NewsItem[]>([])
const isLoading = ref(true)
const selectedNews = ref<NewsItem | null>(null)
const showModal = ref(false)
const showInterestForm = ref(false)
const interestEventTitle = ref('')
const interestEventDate = ref('')

onMounted(async () => {
  await fetchNews()
})

async function fetchNews() {
  if (import.meta.server) {
    isLoading.value = false
    return
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(`${NEWS_API}/news?limit=10`, {
      signal: controller.signal
    })
    clearTimeout(timeout)

    if (res.ok) {
      const data = await res.json()
      const allNews = data.news || []

      // Split into yoga-specific and other relevant news
      yogaNews.value = allNews.filter((item: NewsItem) => {
        const cats = item.categories || []
        const title = item.title.toLowerCase()
        return cats.includes('yoga') ||
               cats.includes('retreat') ||
               title.includes('yoga') ||
               title.includes('retreat') ||
               title.includes('kundalini')
      }).slice(0, 3)

      // Other news: barndans, tungelsta-related (same venue)
      otherNews.value = allNews.filter((item: NewsItem) => {
        const cats = item.categories || []
        const title = item.title.toLowerCase()
        // Skip if already in yoga news
        if (yogaNews.value.some(y => y.id === item.id)) return false
        return cats.includes('barndans') ||
               cats.includes('tungelsta') ||
               title.includes('barndans') ||
               title.includes('tungelsta')
      }).slice(0, 2)
    }
  } catch (e) {
    console.error('Failed to fetch news:', e)
  } finally {
    isLoading.value = false
  }
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

function formatFullDate(dateStr: string | null): string {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })
}

function getImageUrl(url: string | null): string | null {
  if (!url) return null
  return url.replace('coregymclub.zoezi.se', 'z.coregym.club')
}

function isRetreat(item: NewsItem): boolean {
  const cats = item.categories || []
  const title = item.title.toLowerCase()
  return cats.includes('retreat') || title.includes('retreat') || title.includes('darkness') || title.includes('light')
}

function openNews(item: NewsItem) {
  // Check for special links
  const cats = item.categories || []
  const title = item.title.toLowerCase()

  if (cats.includes('barndans') || title.includes('barndans')) {
    window.open('https://coregym.club/barndans', '_blank')
    return
  }

  // For retreat/event - show interest form
  if (cats.includes('retreat') || title.includes('retreat') || title.includes('darkness') || title.includes('light')) {
    interestEventTitle.value = item.title
    interestEventDate.value = '22 mars 2026'
    showInterestForm.value = true
    return
  }

  selectedNews.value = item
  showModal.value = true
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  showModal.value = false
  selectedNews.value = null
  document.body.style.overflow = ''
}

// Close on escape
onMounted(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && showModal.value) closeModal()
  }
  window.addEventListener('keydown', handleEscape)
  onUnmounted(() => window.removeEventListener('keydown', handleEscape))
})
</script>

<template>
  <section v-if="!isLoading && (yogaNews.length > 0 || otherNews.length > 0)" class="section bg-cream-50">
    <div class="container-yoga">
      <!-- Section header -->
      <div class="text-center mb-12">
        <p class="text-label-sm text-sage-500 mb-4">AKTUELLT</p>
        <h2 class="text-display text-forest">Kommande event</h2>
      </div>

      <!-- Featured Yoga Event - Clean card style -->
      <div v-if="yogaNews.length > 0" class="max-w-3xl mx-auto">
        <article
          v-for="item in yogaNews"
          :key="item.id"
          class="card card-hover mb-6 overflow-hidden cursor-pointer group"
          @click="openNews(item)"
        >
          <div class="flex flex-col md:flex-row">
            <!-- Image -->
            <div v-if="getImageUrl(item.imageUrl)" class="md:w-72 h-48 md:h-auto flex-shrink-0">
              <img
                :src="getImageUrl(item.imageUrl)!"
                :alt="item.title"
                loading="lazy"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Content -->
            <div class="flex-1 p-6 md:p-8 flex flex-col justify-center">
              <span class="text-terra-600 text-sm font-medium mb-2">
                {{ isRetreat(item) ? 'Yoga Retreat' : 'Event' }}
              </span>

              <h3 class="text-heading-lg text-forest mb-3 group-hover:text-sage-700 transition-colors">
                {{ item.title }}
              </h3>

              <p v-if="item.summary" class="text-sage-600 text-body mb-4 line-clamp-2">
                {{ item.summary }}
              </p>

              <span class="text-sage-600 font-medium group-hover:text-forest transition-colors">
                Läs mer
              </span>
            </div>
          </div>
        </article>
      </div>

      <!-- Other News - Smaller cards -->
      <div v-if="otherNews.length > 0" class="mt-16">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-heading text-forest">I samma lokal</h3>
          <a
            href="https://coregym.club"
            target="_blank"
            class="text-sage-600 text-sm font-medium hover:text-sage-800 transition-colors"
          >
            Mer på coregym.club
          </a>
        </div>

        <div class="grid sm:grid-cols-2 gap-4 max-w-2xl">
          <article
            v-for="item in otherNews"
            :key="item.id"
            class="card card-hover p-4 cursor-pointer group"
            @click="openNews(item)"
          >
            <div class="flex gap-4">
              <div v-if="getImageUrl(item.imageUrl)" class="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  :src="getImageUrl(item.imageUrl)!"
                  :alt="item.title"
                  loading="lazy"
                  class="w-full h-full object-cover"
                />
              </div>
              <div class="flex-1 min-w-0">
                <span class="text-sage-500 text-xs">{{ formatDate(item.published_at) }}</span>
                <h4 class="text-forest font-semibold line-clamp-2 group-hover:text-sage-700 transition-colors">
                  {{ item.title }}
                </h4>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <!-- News Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div
          v-if="showModal && selectedNews"
          class="fixed inset-0 z-[60] bg-cream-50 overflow-hidden flex flex-col"
        >
          <!-- Header image -->
          <div class="relative flex-shrink-0">
            <div v-if="getImageUrl(selectedNews.imageUrl)" class="h-64 md:h-80 overflow-hidden">
              <img
                :src="getImageUrl(selectedNews.imageUrl)!"
                :alt="selectedNews.title"
                loading="lazy"
                class="w-full h-full object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-b from-forest/40 via-transparent to-transparent" />
            </div>
            <div v-else class="h-32 bg-sage-100" />

            <!-- Close button -->
            <button
              class="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white hover:scale-105 shadow-soft"
              @click="closeModal"
            >
              <svg class="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-y-auto">
            <div class="max-w-3xl mx-auto px-6 py-8 md:py-12">
              <span class="text-sage-500 text-sm">{{ formatFullDate(selectedNews.published_at) }}</span>
              <h1 class="text-display text-forest mb-8 mt-2">
                {{ selectedNews.title }}
              </h1>
              <div
                class="prose prose-lg max-w-none text-sage-700 prose-headings:text-forest prose-a:text-sage-600"
                v-html="selectedNews.content || selectedNews.summary"
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>

  <!-- Loading skeleton -->
  <section v-else-if="isLoading" class="section bg-white">
    <div class="container-yoga">
      <div class="text-center mb-10">
        <div class="h-4 w-24 bg-sage-100 rounded mx-auto mb-4 animate-pulse" />
        <div class="h-10 w-48 bg-sage-100 rounded mx-auto animate-pulse" />
      </div>
      <div class="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div class="aspect-[16/9] bg-sage-100 rounded-3xl animate-pulse md:col-span-2" />
      </div>
    </div>
  </section>

  <!-- Interest Form Sheet -->
  <YogaInterestSheet
    :open="showInterestForm"
    :event-title="interestEventTitle"
    :event-date="interestEventDate"
    @close="showInterestForm = false"
  />
</template>

<style scoped>
.modal-enter-active {
  transition: opacity 0.3s ease, transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.modal-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.modal-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.modal-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
