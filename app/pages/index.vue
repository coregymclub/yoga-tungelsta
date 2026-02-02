<script setup lang="ts">
import type { YogaClass } from '~/composables/useYogaSchedule'
import { useYogaSchedule, LOCATIONS } from '~/composables/useYogaSchedule'

useHead({
  title: 'Core Gym Yoga - Yoga i Haninge',
  meta: [
    { name: 'description', content: 'Kundalini, Yin och Ashtanga yoga i Haninge. Träkyrkan i Tungelsta och moderna yogasalen i Vegastaden. Ingår i Core Gym Club medlemskap.' }
  ]
})

const { upcomingClasses, yogaTypes, loading, fetchSchedule } = useYogaSchedule()

// Instructor types from API
interface Instructor {
  id: number
  slug: string
  name: string
  image: string | null
  classCount: number
  shortQuote: string | null
  bio: string | null
  specialties: string[]
  isYogaInstructor: boolean
  yogaSpecialties: string[]
}

// Fetch instructors from API
const instructors = ref<Instructor[]>([])
const instructorsLoading = ref(false)

async function fetchInstructors() {
  instructorsLoading.value = true
  try {
    const response = await fetch('https://api.coregym.club/instructors')
    if (!response.ok) throw new Error('Failed to fetch instructors')
    const data = await response.json()
    // Filter for yoga instructors and reverse order (so yoga-focused instructors come first)
    instructors.value = data.instructors
      .filter((i: Instructor) => i.isYogaInstructor)
      .reverse()
  } catch (e) {
    console.error('Failed to fetch instructors:', e)
  } finally {
    instructorsLoading.value = false
  }
}

// Get initials for placeholder
function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
}

// Format yoga specialties for display
function formatYogaSpecialties(yogaSpecialties: string[]): string {
  return yogaSpecialties.slice(0, 2).join(', ')
}

// Selected class for detail sheet
const selectedClass = ref<YogaClass | null>(null)
const isSheetOpen = ref(false)

function openClassDetail(cls: YogaClass) {
  selectedClass.value = cls
  isSheetOpen.value = true
}

function closeClassDetail() {
  isSheetOpen.value = false
}

// Format duration
function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (mins === 0) return `${hours}h`
    return `${hours}h ${mins}min`
  }
  return `${minutes} min`
}

onMounted(() => {
  fetchSchedule(14)
  fetchInstructors()
})

// Get yoga type icon
function getYogaIcon(type: { isKundalini: boolean; isYin: boolean; isAshtanga: boolean }) {
  if (type.isKundalini) return '✦'
  if (type.isYin) return '☽'
  if (type.isAshtanga) return '◈'
  return '○'
}

// Truncate description
function truncate(text: string, max: number = 120): string {
  if (!text || text.length <= max) return text
  return text.substring(0, max).trim() + '...'
}

// Get location badge color
function getLocationColor(siteKey: string | null) {
  if (siteKey === 'tungelsta') return 'bg-sage-100 text-sage-700'
  if (siteKey === 'vegastaden') return 'bg-terra-100 text-terra-700'
  return 'bg-cream-200 text-sage-600'
}
</script>

<template>
  <div>
    <!-- Retreat Banner -->
    <RetreatBanner />

    <!-- Hero - Clean centered with background image -->
    <section class="relative min-h-[80vh] flex items-center overflow-hidden bg-gradient-hero pt-24 md:pt-32">
      <!-- Background image -->
      <div class="absolute inset-0 z-0">
        <img src="/images/yoga-tungelsta-ylva.avif" alt="Yoga på Core Gym" class="w-full h-full object-cover opacity-15" />
      </div>

      <!-- Decorative elements -->
      <div class="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sage-300/20 rounded-full blur-[120px] animate-breathe" />
      <div class="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-terra-300/15 rounded-full blur-[100px] animate-breathe delay-300" />

      <div class="container-yoga relative z-10 text-center">
        <!-- Main headline -->
        <h1 class="text-[clamp(3rem,12vw,6rem)] leading-[0.9] tracking-[-0.04em] font-display font-bold text-forest mb-8 animate-fade-up">
          Yoga i Haninge
        </h1>

        <!-- Subheadline -->
        <p class="text-body-xl text-sage-700 max-w-xl mx-auto mb-4 animate-fade-up delay-100">
          Kundalini, Yin, Vinyasa och mer
        </p>
        <p class="text-body-lg text-sage-500 max-w-lg mx-auto mb-12 animate-fade-up delay-200">
          Två unika platser. Ingår i Core Gym Club.
        </p>

        <!-- CTA Button -->
        <div class="flex justify-center animate-fade-up delay-300">
          <NuxtLink to="/schema" class="btn-primary">
            Se schema
          </NuxtLink>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <svg class="w-5 h-5 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>

    <!-- Platser -->
    <section class="section bg-white relative overflow-hidden">
      <div class="container-yoga relative z-10">
        <!-- Location cards -->
        <div class="grid md:grid-cols-2 gap-6">
          <!-- Tungelsta -->
          <NuxtLink
            to="/platser/tungelsta"
            class="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-sage-100"
          >
            <img
              :src="LOCATIONS.tungelsta.image"
              :alt="LOCATIONS.tungelsta.name"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" />
            <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p class="text-sage-300 text-sm mb-2">Träkyrkan</p>
              <h3 class="text-heading-lg text-cream-50">Tungelsta</h3>
            </div>
          </NuxtLink>

          <!-- Vegastaden -->
          <NuxtLink
            to="/platser/vegastaden"
            class="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-terra-100"
          >
            <img
              src="/images/yoga-angela-movement.avif"
              alt="Yoga i Vegastaden med Angela"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" />
            <div class="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p class="text-sage-300 text-sm mb-2">Yogasalen</p>
              <h3 class="text-heading-lg text-cream-50">Vegastaden</h3>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Kommande pass -->
    <section class="section bg-cream-50 relative overflow-hidden">
      <!-- Decorative -->
      <div class="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-sage-200 to-transparent" />

      <div class="container-yoga relative z-10">
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h2 class="text-display text-forest">Kommande pass</h2>
          </div>
          <NuxtLink
            to="/schema"
            class="text-sage-600 font-medium hover:text-sage-800 transition-colors"
          >
            Se hela schemat
          </NuxtLink>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-16">
          <div class="w-12 h-12 border-2 border-sage-200 border-t-sage-600 rounded-full animate-spin" />
        </div>

        <!-- Classes list -->
        <div v-else-if="upcomingClasses.length > 0" class="space-y-4">
          <button
            v-for="cls in upcomingClasses"
            :key="cls.id"
            @click="openClassDetail(cls)"
            class="card card-hover p-6 w-full text-left group"
          >
            <div class="flex flex-col sm:flex-row sm:items-center gap-4">
              <!-- Time -->
              <div class="sm:w-28 flex-shrink-0">
                <div class="text-heading-sm text-forest group-hover:text-sage-700 transition-colors">{{ cls.dayName }}</div>
                <div class="text-sage-500 text-body-sm">{{ cls.time }} <span class="text-sage-400">({{ formatDuration(cls.duration) }})</span></div>
              </div>

              <!-- Divider on desktop -->
              <div class="hidden sm:block w-px h-12 bg-cream-200" />

              <!-- Class info -->
              <div class="flex-grow">
                <h3 class="text-heading-sm text-forest group-hover:text-sage-700 transition-colors mb-1">{{ cls.name }}</h3>
                <p class="text-sage-500 text-body-sm">{{ cls.instructor || 'Instruktör' }}</p>
              </div>

              <!-- Location badge -->
              <div class="flex-shrink-0">
                <span :class="['text-label px-4 py-2 rounded-full', getLocationColor(cls.siteKey)]">
                  {{ cls.siteName }}
                </span>
              </div>
            </div>
          </button>
        </div>

        <!-- Empty state -->
        <div v-else class="card text-center py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-100 mb-6">
            <svg class="w-8 h-8 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-sage-600 text-body-lg mb-2">Inga schemalagda pass just nu</p>
          <p class="text-sage-400 text-body-sm">Kolla tillbaka snart!</p>
        </div>
      </div>
    </section>

    <!-- Yogaformer -->
    <section class="section bg-white relative overflow-hidden">
      <div class="container-yoga relative z-10">
        <!-- Header -->
        <div class="text-center mb-16">
          <p class="text-label-sm text-sage-500 mb-4">UTFORSKA</p>
          <h2 class="text-display text-forest mb-6">Yogaformer</h2>
          <p class="text-body-lg text-sage-600 max-w-lg mx-auto">
            Från kraftfull Kundalini till lugn Yin – hitta din stil
          </p>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center py-12">
          <div class="w-10 h-10 border-2 border-sage-200 border-t-sage-600 rounded-full animate-spin" />
        </div>

        <!-- Dynamic yoga types -->
        <div v-else-if="yogaTypes.length > 0" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <component
            :is="type.isKundalini ? 'NuxtLink' : 'div'"
            v-for="type in yogaTypes"
            :key="type.name"
            :to="type.isKundalini ? '/kundalini' : undefined"
            :class="[
              'card p-8',
              type.isKundalini ? 'card-hover group cursor-pointer' : ''
            ]"
          >
            <!-- Icon -->
            <div :class="[
              'w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300',
              type.isKundalini ? 'bg-sage-100 group-hover:scale-110' : 'bg-cream-100',
              type.isYin ? 'bg-terra-50' : '',
              type.isAshtanga ? 'bg-cream-200' : ''
            ]">
              <span :class="[
                'text-2xl',
                type.isKundalini ? 'text-sage-600' : 'text-sage-500',
                type.isYin ? 'text-terra-500' : '',
                type.isAshtanga ? 'text-sage-600' : ''
              ]">{{ getYogaIcon(type) }}</span>
            </div>

            <h3 class="text-heading-sm text-forest mb-3">{{ type.name }}</h3>
            <p class="text-sage-600 text-body-sm mb-6 leading-relaxed">
              {{ truncate(type.description) }}
            </p>

            <span
              v-if="type.isKundalini"
              class="text-sage-600 font-medium group-hover:text-sage-800 transition-colors"
            >
              Läs mer
            </span>
          </component>
        </div>

        <!-- Fallback static cards -->
        <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Kundalini -->
          <NuxtLink to="/kundalini" class="card card-hover group p-8">
            <div class="w-14 h-14 rounded-2xl bg-sage-100 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
              <span class="text-sage-600 text-2xl">✦</span>
            </div>
            <h3 class="text-heading-sm text-forest mb-3">Kundalini Yoga</h3>
            <p class="text-sage-600 text-body-sm mb-6 leading-relaxed">
              Kraftfull yoga med andning, rörelse och meditation. Väck din inre energi och upplev transformation.
            </p>
            <span class="text-sage-600 font-medium group-hover:text-sage-800 transition-colors">
              Läs mer
            </span>
          </NuxtLink>

          <!-- Yin -->
          <div class="card p-8">
            <div class="w-14 h-14 rounded-2xl bg-terra-50 flex items-center justify-center mb-6">
              <span class="text-terra-500 text-2xl">☽</span>
            </div>
            <h3 class="text-heading-sm text-forest mb-3">Yin Yoga</h3>
            <p class="text-sage-600 text-body-sm leading-relaxed">
              Lugn, meditativ yoga med långa, mjuka positioner. Perfekt för återhämtning och djup avslappning.
            </p>
          </div>

          <!-- Ashtanga -->
          <div class="card p-8">
            <div class="w-14 h-14 rounded-2xl bg-cream-200 flex items-center justify-center mb-6">
              <span class="text-sage-600 text-2xl">◈</span>
            </div>
            <h3 class="text-heading-sm text-forest mb-3">Ashtanga</h3>
            <p class="text-sage-600 text-body-sm leading-relaxed">
              Dynamisk, fysisk yoga i en fast sekvens. Bygger styrka, flexibilitet och fokus.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Instruktörer - Grid layout -->
    <section class="section bg-cream-50">
      <div class="container-yoga">
        <div class="text-center mb-12">
          <p class="text-label-sm text-sage-500 mb-4">MÖTE TEAMET</p>
          <h2 class="text-display text-forest">Våra instruktörer</h2>
        </div>

        <!-- Loading -->
        <div v-if="instructorsLoading" class="flex justify-center py-12">
          <div class="w-10 h-10 border-2 border-sage-200 border-t-sage-600 rounded-full animate-spin" />
        </div>

        <!-- Grid of instructors -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto">
          <component
            v-for="instructor in instructors"
            :key="instructor.id"
            :is="instructor.bio ? 'NuxtLink' : 'div'"
            :to="instructor.bio ? `/${instructor.slug}` : undefined"
            class="text-center group"
            :class="instructor.bio ? 'cursor-pointer' : ''"
          >
            <div class="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-cream-200 bg-cream-100 transition-all duration-300"
                 :class="instructor.bio ? 'group-hover:ring-sage-300 group-hover:scale-105' : ''">
              <img
                v-if="instructor.image"
                :src="instructor.image"
                :alt="instructor.name"
                class="w-full h-full object-cover grayscale transition-all duration-500"
                :class="instructor.bio ? 'group-hover:grayscale-0' : ''"
              />
              <span v-else class="w-full h-full flex items-center justify-center text-sage-400 text-2xl font-display">
                {{ getInitials(instructor.name) }}
              </span>
            </div>
            <h3 class="text-heading-sm text-forest mb-1 group-hover:text-sage-700 transition-colors">
              {{ instructor.name.split(' ')[0] }}
            </h3>
            <p class="text-sage-500 text-sm">{{ formatYogaSpecialties(instructor.yogaSpecialties) }}</p>
          </component>
        </div>
      </div>
    </section>

    <!-- Aktuellt / News -->
    <NewsSection />

    <!-- CTA Section with Angela background -->
    <section class="section-lg relative overflow-hidden">
      <!-- Background image -->
      <div class="absolute inset-0">
        <img
          src="/images/yoga-angela-grain.avif"
          alt="Angela hjälper en deltagare"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-forest/60" />
      </div>

      <div class="container-narrow relative z-10 text-center">
        <h2 class="text-display text-cream-50 mb-6">
          Redo att börja?
        </h2>
        <p class="text-body-xl text-cream-200 max-w-md mx-auto mb-10">
          All yoga ingår i ditt medlemskap hos Core Gym Club.
          Börja din resa idag.
        </p>

        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <NuxtLink to="/bli-medlem" class="btn-primary">
            Bli medlem
          </NuxtLink>
          <NuxtLink to="/schema" class="btn-secondary border-cream-200 text-cream-50 hover:bg-cream-50/10">
            Se schema
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Class Detail Sheet -->
    <ClassDetailSheet
      :yoga-class="selectedClass"
      :open="isSheetOpen"
      @close="closeClassDetail"
    />
  </div>
</template>

<style scoped>
/* Ensure animations work with opacity-0-initial */
.animate-fade-up {
  opacity: 0;
}
</style>
