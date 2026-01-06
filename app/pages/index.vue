<script setup lang="ts">
import { useYogaSchedule } from '~/composables/useYogaSchedule'

useHead({
  title: 'Yoga i Tungelsta - Kundalini, Yin & mer',
})

const { upcomingClasses, yogaTypes, loading, fetchSchedule } = useYogaSchedule()

// Fetch schedule on mount
onMounted(() => {
  fetchSchedule(14)
})

// Truncate description to a max length
function truncateDescription(text: string, maxLength: number = 120): string {
  if (!text || text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

// Get icon for yoga type
function getYogaIcon(type: { isKundalini: boolean; isYin: boolean; isAshtanga: boolean }) {
  if (type.isKundalini) return '✦'
  if (type.isYin) return '☽'
  if (type.isAshtanga) return '◈'
  return '○'
}

// Get icon background color
function getIconBg(type: { isKundalini: boolean; isYin: boolean; isAshtanga: boolean }) {
  if (type.isKundalini) return 'bg-kundalini-green-pale'
  if (type.isYin) return 'bg-kundalini-lavender-light'
  if (type.isAshtanga) return 'bg-amber-100'
  return 'bg-kundalini-green-pale'
}

// Get icon text color
function getIconColor(type: { isKundalini: boolean; isYin: boolean; isAshtanga: boolean }) {
  if (type.isKundalini) return 'text-kundalini-green'
  if (type.isYin) return 'text-kundalini-lavender'
  if (type.isAshtanga) return 'text-amber-600'
  return 'text-kundalini-green'
}
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="min-h-[85vh] flex items-center bg-gradient-green relative overflow-hidden">
      <div class="absolute top-10 right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>
      <div class="absolute bottom-20 left-5 w-48 h-48 bg-kundalini-green/20 rounded-full blur-3xl"></div>

      <div class="container-yoga py-16 relative z-10">
        <div class="chip mb-6">
          <span class="text-kundalini-green">✦</span>
          Tungelsta
        </div>

        <h1 class="heading-xl text-text-primary mb-4">
          Yoga i Tungelsta
        </h1>
        <p class="text-xl md:text-2xl text-kundalini-green-dark font-medium mb-6">
          I en vacker gammal träkyrka
        </p>

        <p class="text-body max-w-md mb-8">
          Kundalini, Yin och mer. Hitta din yogaform i våra
          ljusa, varma lokaler i gamla Café Medmig.
        </p>

        <div class="flex flex-col sm:flex-row gap-3">
          <NuxtLink to="/schema" class="btn-primary">
            Se schema
          </NuxtLink>
          <NuxtLink to="/kundalini" class="btn-secondary">
            Om Kundalini
          </NuxtLink>
        </div>

        <div class="mt-10 inline-flex items-center gap-2 text-text-muted text-sm">
          <svg class="w-4 h-4 text-kundalini-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          Ingår i medlemskap hos Core Gym Club
        </div>
      </div>
    </section>

    <!-- Bild från lokal -->
    <section class="section-padding bg-white">
      <div class="container-yoga">
        <div class="rounded-3xl overflow-hidden">
          <img
            src="/images/yoga-class.webp"
            alt="Yoga i den vackra träkyrkan i Tungelsta"
            class="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>

    <!-- Yogaformer -->
    <section class="section-padding bg-surface-cream">
      <div class="container-yoga">
        <div class="text-center mb-10">
          <div class="divider mx-auto mb-6"></div>
          <h2 class="heading-lg text-text-primary">
            Våra yogaformer
          </h2>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="text-center py-8">
          <div class="w-8 h-8 border-2 border-kundalini-green border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>

        <!-- Dynamic yoga types from API -->
        <div v-else-if="yogaTypes.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <component
            :is="type.isKundalini ? 'NuxtLink' : 'div'"
            v-for="type in yogaTypes"
            :key="type.name"
            :to="type.isKundalini ? '/kundalini' : undefined"
            :class="[
              'card',
              type.isKundalini ? 'card-hover group cursor-pointer' : ''
            ]"
          >
            <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors', getIconBg(type), type.isKundalini ? 'group-hover:bg-kundalini-green-light' : '']">
              <span :class="['text-xl', getIconColor(type)]">{{ getYogaIcon(type) }}</span>
            </div>
            <h3 class="font-semibold text-text-primary mb-2">{{ type.name }}</h3>
            <p class="text-body-sm mb-4">
              {{ truncateDescription(type.description) }}
            </p>
            <span v-if="type.isKundalini" class="text-kundalini-green-dark text-sm font-medium group-hover:underline">
              Läs mer →
            </span>
          </component>
        </div>

        <!-- Fallback if no yoga types yet -->
        <div v-else class="grid sm:grid-cols-2 gap-4">
          <!-- Kundalini -->
          <NuxtLink to="/kundalini" class="card card-hover group">
            <div class="w-12 h-12 rounded-2xl bg-kundalini-green-pale flex items-center justify-center mb-4 group-hover:bg-kundalini-green-light transition-colors">
              <span class="text-kundalini-green text-xl">✦</span>
            </div>
            <h3 class="font-semibold text-text-primary mb-2">Kundalini Yoga</h3>
            <p class="text-body-sm mb-4">
              Kraftfull yoga med andning, rörelse och meditation.
              Väck din inre energi.
            </p>
            <span class="text-kundalini-green-dark text-sm font-medium group-hover:underline">
              Läs mer →
            </span>
          </NuxtLink>

          <!-- Yin Yoga -->
          <div class="card">
            <div class="w-12 h-12 rounded-2xl bg-kundalini-lavender-light flex items-center justify-center mb-4">
              <span class="text-kundalini-lavender text-xl">☽</span>
            </div>
            <h3 class="font-semibold text-text-primary mb-2">Yin Yoga</h3>
            <p class="text-body-sm mb-4">
              Lugn, meditativ yoga med långa, mjuka positioner.
              Perfekt för återhämtning.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Kommande pass -->
    <section class="section-padding bg-white">
      <div class="container-yoga">
        <div class="flex items-center justify-between mb-6">
          <h2 class="heading-lg text-text-primary">Kommande pass</h2>
          <NuxtLink to="/schema" class="text-kundalini-green-dark font-medium text-sm hover:underline">
            Se alla →
          </NuxtLink>
        </div>

        <div v-if="loading" class="text-center py-8">
          <div class="w-8 h-8 border-2 border-kundalini-green border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>

        <div v-else-if="upcomingClasses.length > 0" class="space-y-3">
          <div
            v-for="cls in upcomingClasses"
            :key="cls.id"
            class="card"
          >
            <div class="flex flex-col sm:flex-row sm:items-center gap-3">
              <div class="sm:w-28 flex-shrink-0">
                <div class="text-kundalini-green-dark font-bold">{{ cls.dayName }}</div>
                <div class="text-text-muted text-sm">{{ cls.time }}</div>
              </div>
              <div class="flex-grow">
                <h3 class="font-semibold text-text-primary">{{ cls.name }}</h3>
                <p class="text-body-sm">{{ cls.instructor || 'Instruktör' }}</p>
              </div>
              <div class="flex-shrink-0">
                <span v-if="cls.isKundalini" class="chip !py-1 !px-3 text-xs">Kundalini</span>
                <span v-else-if="cls.isYin" class="chip !py-1 !px-3 text-xs !bg-kundalini-lavender-light !text-kundalini-lavender">Yin</span>
                <span v-else class="chip !py-1 !px-3 text-xs">Yoga</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="card text-center">
          <p class="text-body-sm">Inga schemalagda pass just nu. Kolla tillbaka snart!</p>
        </div>
      </div>
    </section>

    <!-- Lokalen -->
    <section class="section-padding bg-surface-cream">
      <div class="container-yoga">
        <div class="grid md:grid-cols-2 gap-6 items-center">
          <!-- Bild -->
          <div class="rounded-3xl overflow-hidden order-2 md:order-1">
            <img
              src="/images/annexet-yoga-i-tungelsta.webp"
              alt="Gamla Café Medmig - en vacker röd träkyrka i Tungelsta"
              class="w-full h-auto object-cover"
            />
          </div>

          <!-- Info -->
          <div class="card-green order-1 md:order-2">
            <h3 class="heading-md text-text-primary mb-2">Lokalen</h3>
            <p class="text-body mb-4">
              <strong>Gamla Café Medmig</strong><br>
              <span class="text-text-muted">(fd Pingstkyrkan)</span><br>
              Rosvägen 2, Tungelsta
            </p>
            <p class="text-body-sm mb-4">
              En vacker gammal röd träkyrka med varm, inbjudande atmosfär.
              Perfekt för yoga och meditation.
            </p>
            <a
              href="https://maps.apple.com/?address=Rosvagen%202,%20137%2091%20Tungelsta,%20Sweden"
              target="_blank"
              class="inline-flex items-center gap-2 text-kundalini-green-dark font-medium hover:underline"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Öppna i kartor
              </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Instruktör - Mari -->
    <section class="section-padding bg-white">
      <div class="container-yoga">
        <div class="max-w-2xl mx-auto">
          <div class="card flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div class="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src="/images/instructor.png"
                alt="Mari Vuorela - Yogalärare"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="text-center sm:text-left">
              <h3 class="font-semibold text-text-primary mb-1">Mari Vuorela</h3>
              <p class="text-kundalini-green-dark text-sm mb-3">Yogalärare sedan 1994</p>
              <p class="text-body-sm mb-4">
                Mari leder Kundalini Yoga med värme och närvaro.
                Kraftfullt och rofyllt på samma gång.
              </p>
              <a
                href="mailto:mari.vuorela@icloud.com"
                class="inline-flex items-center gap-2 text-kundalini-green-dark font-medium hover:underline text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                mari.vuorela@icloud.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-padding bg-surface-cream">
      <div class="container-yoga">
        <div class="text-center max-w-lg mx-auto">
          <h2 class="heading-lg text-text-primary mb-4">
            Redo att börja?
          </h2>
          <p class="text-body mb-8">
            All yoga ingår i ditt medlemskap hos Core Gym Club.
            Bli medlem och hitta din yogaform.
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-3">
            <a href="https://coregym.club/bli-medlem" target="_blank" class="btn-primary">
              Bli medlem
            </a>
            <NuxtLink to="/kontakt" class="btn-soft">
              Har du frågor?
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
