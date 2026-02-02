<script setup lang="ts">
import type { YogaClass } from '~/composables/useYogaSchedule'
import { useYogaSchedule, LOCATIONS } from '~/composables/useYogaSchedule'

useHead({
  title: 'Schema - Core Gym Yoga',
  meta: [
    { name: 'description', content: 'Se schemat för yoga i Haninge. Tungelsta och Vegastaden.' }
  ]
})

const { schedule, allClasses, loading, error, fetchSchedule } = useYogaSchedule()

// Filter state - default to showing all (both locations)
const selectedLocation = ref<string>('tungelsta')

// Filtered schedule based on location
const filteredSchedule = computed(() => {
  const siteId = selectedLocation.value === 'tungelsta' ? 2 : 1

  return schedule.value.map(day => ({
    ...day,
    classes: day.classes.filter(cls => cls.siteId === siteId)
  })).filter(day => day.classes.length > 0)
})

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

onMounted(() => {
  fetchSchedule(14)
})

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-')
  return `${parseInt(day)}/${parseInt(month)}`
}

function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (mins === 0) return `${hours}h`
    return `${hours}h ${mins}min`
  }
  return `${minutes} min`
}

function getLocationColor(siteKey: string | null) {
  if (siteKey === 'tungelsta') return 'bg-sage-100 text-sage-700'
  if (siteKey === 'vegastaden') return 'bg-terra-100 text-terra-700'
  return 'bg-cream-200 text-sage-600'
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-hero relative overflow-hidden">
      <!-- Decorative -->
      <div class="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-sage-200/30 rounded-full blur-[100px]" />
      <div class="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-terra-200/20 rounded-full blur-[80px]" />

      <div class="container-yoga relative z-10 text-center">
        <p class="text-label-sm text-sage-500 mb-4">YOGAPASS</p>
        <h1 class="text-display-lg text-forest mb-6">Schema</h1>
        <p class="text-body-xl text-sage-600 max-w-lg mx-auto mb-10">
          Alla yogapass de närmaste två veckorna
        </p>

        <!-- Location filter -->
        <div class="flex flex-wrap justify-center gap-3">
          <button
            @click="selectedLocation = 'tungelsta'"
            :class="[
              'px-6 py-3 rounded-full font-medium transition-all duration-300',
              selectedLocation === 'tungelsta'
                ? 'bg-sage-600 text-cream-50 shadow-soft'
                : 'bg-white text-sage-600 hover:bg-sage-50 border border-cream-200'
            ]"
          >
            Tungelsta
          </button>
          <button
            @click="selectedLocation = 'vegastaden'"
            :class="[
              'px-6 py-3 rounded-full font-medium transition-all duration-300',
              selectedLocation === 'vegastaden'
                ? 'bg-terra-500 text-cream-50 shadow-soft'
                : 'bg-white text-sage-600 hover:bg-sage-50 border border-cream-200'
            ]"
          >
            Vegastaden
          </button>
        </div>
      </div>
    </section>

    <!-- Schema -->
    <section class="section bg-cream-50">
      <div class="container-yoga">
        <!-- Loading -->
        <div v-if="loading" class="text-center py-16">
          <div class="w-12 h-12 border-2 border-sage-200 border-t-sage-600 rounded-full animate-spin mx-auto mb-6"></div>
          <p class="text-sage-500">Hämtar schema...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="card text-center py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terra-100 mb-6">
            <svg class="w-8 h-8 text-terra-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <p class="text-terra-600 mb-6">{{ error }}</p>
          <button @click="fetchSchedule(14)" class="btn-secondary">
            Försök igen
          </button>
        </div>

        <!-- Schedule -->
        <div v-else-if="filteredSchedule.length > 0" class="space-y-10">
          <div v-for="day in filteredSchedule" :key="day.date">
            <!-- Day header -->
            <div class="flex items-center gap-4 mb-5">
              <h2 class="text-heading text-forest">{{ day.dayName }}</h2>
              <span class="text-sage-400 text-body">{{ formatDate(day.date) }}</span>
              <div class="flex-1 h-px bg-cream-200" />
            </div>

            <!-- Classes -->
            <div class="space-y-4">
              <button
                v-for="cls in day.classes"
                :key="cls.id"
                @click="openClassDetail(cls)"
                class="card card-hover block group w-full text-left p-6"
              >
                <div class="flex flex-col sm:flex-row sm:items-center gap-4">
                  <!-- Time -->
                  <div class="sm:w-28 flex-shrink-0">
                    <div class="text-heading-sm text-forest group-hover:text-sage-700 transition-colors">{{ cls.time }}</div>
                    <div class="text-sage-400 text-body-sm">{{ formatDuration(cls.duration) }}</div>
                  </div>

                  <!-- Divider -->
                  <div class="hidden sm:block w-px h-12 bg-cream-200" />

                  <!-- Class info -->
                  <div class="flex-grow">
                    <h3 class="text-heading-sm text-forest group-hover:text-sage-700 transition-colors mb-1">
                      {{ cls.name }}
                    </h3>
                    <p v-if="cls.instructor" class="text-sage-500 text-body-sm">{{ cls.instructor }}</p>
                  </div>

                  <!-- Location -->
                  <div class="flex items-center gap-3 flex-shrink-0">
                    <span :class="['text-label px-4 py-2 rounded-full', getLocationColor(cls.siteKey)]">
                      {{ cls.siteName }}
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- No classes -->
        <div v-else class="card text-center py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-100 mb-6">
            <svg class="w-8 h-8 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-sage-600 text-body-lg mb-2">Inga schemalagda yogapass just nu</p>
          <p class="text-sage-400 text-body-sm">Kolla tillbaka snart!</p>
        </div>

        <!-- Info box -->
        <div class="card-sage mt-10 p-6">
          <div class="flex items-start gap-4">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-sage-200 flex items-center justify-center">
              <svg class="w-5 h-5 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 class="text-heading-sm text-forest mb-2">Bra att veta</h4>
              <p class="text-sage-600 text-body-sm">
                Kom gärna 10 minuter innan passet börjar så du hinner landa.
                <strong class="text-sage-700">Klicka på ett pass</strong> för att se mer info och boka.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Priser -->
    <section class="section bg-gradient-to-br from-sage-50 via-sage-100/50 to-cream-100 relative overflow-hidden">
      <!-- Decorative -->
      <div class="absolute top-1/4 right-0 w-[400px] h-[400px] bg-sage-200/40 rounded-full blur-[120px]" />
      <div class="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-cream-200/30 rounded-full blur-[80px]" />

      <div class="container-yoga relative z-10">
        <div class="text-center mb-12">
          <p class="text-label-sm text-sage-600 mb-4">ALTERNATIV</p>
          <h2 class="text-display text-forest">Priser</h2>
        </div>

        <div class="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <!-- Engångspass -->
          <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft text-center p-8 border border-white/50">
            <div class="w-14 h-14 rounded-full bg-sage-100 flex items-center justify-center mx-auto mb-6">
              <span class="text-sage-700 font-display font-bold text-xl">1</span>
            </div>
            <h3 class="text-heading-sm text-forest mb-2">Engångspass</h3>
            <p class="text-sage-500 text-body-sm mb-4">Drop-in</p>
            <p class="text-display text-forest mb-4">150 kr</p>
            <p class="text-sage-500 text-body-sm">Klicka på ett pass ovan för att köpa</p>
          </div>

          <!-- Klippkort - Featured -->
          <a
            href="https://z.coregym.club/webshop"
            target="_blank"
            class="bg-forest rounded-3xl shadow-soft-lg text-center group p-8 relative transform hover:scale-[1.02] transition-transform"
          >
            <!-- Popular badge -->
            <div class="absolute -top-3 left-1/2 -translate-x-1/2">
              <span class="px-4 py-1.5 bg-terra-500 text-cream-50 text-label-sm rounded-full shadow-soft">Populärt</span>
            </div>

            <div class="w-14 h-14 rounded-full bg-sage-400/30 flex items-center justify-center mx-auto mb-6">
              <span class="text-cream-50 font-display font-bold text-xl">10</span>
            </div>
            <h3 class="text-heading-sm text-cream-50 mb-2">Klippkort</h3>
            <p class="text-sage-300 text-body-sm mb-4">10 pass</p>
            <p class="text-display text-cream-50 mb-2">1 200 kr</p>
            <p class="text-sage-300 text-body-sm font-medium mb-6">Spara 300 kr</p>
            <span class="inline-flex items-center gap-2 text-cream-100 font-medium group-hover:text-white transition-colors">
              Köp klippkort
            </span>
          </a>

          <!-- Medlemskap -->
          <NuxtLink
            to="/bli-medlem"
            class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-soft text-center group p-8 border border-white/50 hover:bg-white transition-colors"
          >
            <div class="w-14 h-14 rounded-full bg-sage-200 flex items-center justify-center mx-auto mb-6">
              <svg class="w-7 h-7 text-sage-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="text-heading-sm text-forest mb-2 group-hover:text-sage-700 transition-colors">Medlemskap</h3>
            <p class="text-sage-500 text-body-sm mb-4">Obegränsat</p>
            <p class="text-display text-forest mb-4">Ingår</p>
            <p class="text-sage-500 text-body-sm mb-6">via Core Gym Club</p>
            <span class="inline-flex items-center gap-2 text-sage-700 font-medium group-hover:text-forest transition-colors">
              Bli medlem
            </span>
          </NuxtLink>
        </div>

        <!-- Medlemskaps-info -->
        <div class="bg-white/60 backdrop-blur-sm rounded-3xl border border-white/50 mt-10 max-w-3xl mx-auto p-8">
          <div class="flex flex-col md:flex-row md:items-start gap-8">
            <div class="flex-1">
              <h3 class="text-heading-sm text-forest mb-4">Mer värde med medlemskap</h3>
              <p class="text-sage-600 text-body-sm mb-6">
                Som medlem hos Core Gym Club får du inte bara obegränsad yoga – du får tillgång till så mycket mer:
              </p>
              <ul class="space-y-3">
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sage-700 text-body-sm">All gruppträning i Tungelsta</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sage-700 text-body-sm">Gymmet i Tungelsta</span>
                </li>
                <li class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-sage-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-sage-700 text-body-sm">Gymmet i Västerhaninge</span>
                </li>
              </ul>
            </div>
            <div class="flex-shrink-0">
              <NuxtLink to="/bli-medlem" class="btn-primary">
                Bli medlem
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Plats -->
    <section class="section bg-cream-50">
      <div class="container-yoga">
        <div class="text-center mb-12">
          <p class="text-label-sm text-sage-500 mb-4">HITTA HIT</p>
          <h2 class="text-display text-forest">Plats</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          <!-- Bild -->
          <div class="rounded-4xl overflow-hidden">
            <img
              src="/images/annexet-yoga-i-tungelsta.webp"
              alt="Gamla Café Medmig - en vacker röd träkyrka i Tungelsta"
              class="w-full h-auto object-cover"
            />
          </div>

          <!-- Info -->
          <div class="card p-8">
            <h3 class="text-heading text-forest mb-2">Gamla Café Medmig</h3>
            <p class="text-sage-500 text-body-sm mb-6">(fd Pingstkyrkan)</p>
            <p class="text-sage-700 text-body mb-6">
              Rosvägen 2<br>
              137 91 Tungelsta
            </p>
            <a
              href="https://maps.apple.com/?address=Rosvagen%202,%20137%2091%20Tungelsta,%20Sweden"
              target="_blank"
              class="inline-flex items-center gap-2 text-sage-700 font-medium hover:text-sage-900 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Öppna i kartor
            </a>
          </div>
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
