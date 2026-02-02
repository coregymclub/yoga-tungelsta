<script setup lang="ts">
import type { YogaClass } from '~/composables/useYogaSchedule'
import { useYogaSchedule, LOCATIONS } from '~/composables/useYogaSchedule'

useHead({
  title: 'Tungelsta - Core Gym Yoga',
  meta: [
    { name: 'description', content: 'Yoga i Tungelsta - i en vacker gammal röd träkyrka. Kundalini Yoga med Mari Vuorela.' }
  ]
})

const location = LOCATIONS.tungelsta
const { tungelstaClasses, loading, fetchSchedule } = useYogaSchedule()

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
})
</script>

<template>
  <div>
    <!-- Hero med bild -->
    <section class="relative min-h-[70vh] flex items-end overflow-hidden">
      <img
        src="/images/yoga-tungelsta-ylva.avif"
        alt="Yogasalen i Tungelsta"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />

      <div class="relative z-10 container-yoga py-16 w-full">
        <div class="chip mb-6">Träkyrkan</div>
        <h1 class="text-display-lg text-cream-50 mb-4">{{ location.name }}</h1>
        <p class="text-body-xl text-cream-200 max-w-lg">
          {{ location.description }}
        </p>
      </div>
    </section>

    <!-- Info -->
    <section class="section bg-white">
      <div class="container-yoga">
        <div class="grid md:grid-cols-2 gap-12">
          <!-- Om platsen -->
          <div>
            <p class="text-label-sm text-sage-500 mb-4">OM PLATSEN</p>
            <h2 class="text-heading-lg text-forest mb-8">En unik yogaupplevelse</h2>
            <div class="space-y-6 text-sage-700">
              <p class="text-body-lg">
                I hjärtat av Tungelsta ligger en vacker gammal röd träkyrka – tidigare
                Pingstkyrkan, senare Café Medmig, och nu hem för yoga och meditation.
              </p>
              <p class="text-body">
                De höga taken, träväggarna och det varma ljuset skapar en unik atmosfär
                som är perfekt för yoga. Här kan du släppa vardagen och fokusera på dig själv.
              </p>
              <p class="text-body">
                Mari Vuorela, yogalärare sedan 1994, leder regelbundna Kundalini Yoga-pass
                i denna speciella miljö.
              </p>
            </div>
          </div>

          <!-- Praktisk info -->
          <div class="space-y-6">
            <div class="card-sage p-8">
              <h3 class="text-heading-sm text-forest mb-6">Adress</h3>
              <p class="text-sage-700 text-body mb-6">
                Gamla Café Medmig<br>
                <span class="text-sage-500">(fd Pingstkyrkan)</span><br>
                {{ location.address }}
              </p>
              <a
                :href="location.mapsUrl"
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

            <div class="card p-8">
              <h3 class="text-heading-sm text-forest mb-6">Bra att veta</h3>
              <ul class="space-y-4">
                <li class="flex items-start gap-4">
                  <div class="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-sage-700 text-body-sm">Yogamattor finns att låna på plats</span>
                </li>
                <li class="flex items-start gap-4">
                  <div class="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-sage-700 text-body-sm">Kom gärna 10 minuter innan passet</span>
                </li>
                <li class="flex items-start gap-4">
                  <div class="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-sage-700 text-body-sm">Ta med bekväma, löst sittande kläder</span>
                </li>
                <li class="flex items-start gap-4">
                  <div class="w-8 h-8 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span class="text-sage-700 text-body-sm">Parkering finns utanför lokalen</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Kommande pass -->
    <section class="section bg-cream-50">
      <div class="container-yoga">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p class="text-label-sm text-sage-500 mb-3">NÄSTA PASS</p>
            <h2 class="text-display text-forest">Kommande pass i Tungelsta</h2>
          </div>
          <NuxtLink
            to="/schema"
            class="inline-flex items-center gap-2 text-sage-600 font-medium hover:text-sage-800 transition-colors group"
          >
            <span>Se alla</span>
            <svg class="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
        </div>

        <div v-if="loading" class="flex justify-center py-16">
          <div class="w-12 h-12 border-2 border-sage-200 border-t-sage-600 rounded-full animate-spin" />
        </div>

        <div v-else-if="tungelstaClasses.length > 0" class="space-y-4">
          <button
            v-for="cls in tungelstaClasses.slice(0, 5)"
            :key="cls.id"
            @click="openClassDetail(cls)"
            class="card card-hover p-6 w-full text-left group"
          >
            <div class="flex flex-col sm:flex-row sm:items-center gap-4">
              <div class="sm:w-28 flex-shrink-0">
                <div class="text-heading-sm text-forest group-hover:text-sage-700 transition-colors">{{ cls.dayName }}</div>
                <div class="text-sage-500 text-body-sm">{{ cls.time }} <span class="text-sage-400">({{ formatDuration(cls.duration) }})</span></div>
              </div>
              <div class="hidden sm:block w-px h-12 bg-cream-200" />
              <div class="flex-grow">
                <h3 class="text-heading-sm text-forest group-hover:text-sage-700 transition-colors mb-1">{{ cls.name }}</h3>
                <p class="text-sage-500 text-body-sm">{{ cls.instructor || 'Instruktör' }}</p>
              </div>
            </div>
          </button>
        </div>

        <div v-else class="card text-center py-16">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage-100 mb-6">
            <svg class="w-8 h-8 text-sage-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p class="text-sage-600 text-body-lg">Inga schemalagda pass just nu</p>
        </div>
      </div>
    </section>

    <!-- Mari -->
    <section class="section bg-gradient-to-b from-terra-50 to-cream-50">
      <div class="container-yoga">
        <NuxtLink to="/mari" class="card card-hover flex flex-col sm:flex-row gap-8 items-center sm:items-start group max-w-2xl mx-auto p-8">
          <div class="w-32 h-32 rounded-3xl overflow-hidden flex-shrink-0 ring-4 ring-white shadow-soft">
            <img
              src="/images/instructor.png"
              alt="Mari Vuorela"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="text-center sm:text-left flex-1">
            <h3 class="text-heading text-forest mb-2 group-hover:text-sage-700 transition-colors">
              Mari Vuorela
            </h3>
            <p class="text-terra-600 font-medium mb-4">Yogalärare sedan 1994</p>
            <p class="text-sage-600 text-body mb-6">
              Mari leder Kundalini Yoga med värme och närvaro. Kraftfullt och rofyllt på samma gång.
            </p>
            <span class="text-sage-600 font-medium group-hover:text-sage-800 transition-colors">
              Läs mer om Mari
            </span>
          </div>
        </NuxtLink>
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
