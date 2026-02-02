<script setup lang="ts">
import type { YogaClass } from '~/composables/useYogaSchedule'
import { useYogaSchedule, LOCATIONS } from '~/composables/useYogaSchedule'

useHead({
  title: 'Vegastaden - Core Gym Yoga',
  meta: [
    { name: 'description', content: 'Yoga i Vegastaden - ljudisolerad yogasal på Core Gym Vegastaden. Vinyasa, Yin och Power yoga med Angela Kemper.' }
  ]
})

const location = LOCATIONS.vegastaden
const { vegastadenClasses, loading, fetchSchedule } = useYogaSchedule()

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
    <!-- Hero -->
    <section class="relative min-h-[60vh] flex items-end overflow-hidden">
      <img
        src="/images/yoga-angela-movement.avif"
        alt="Yoga i Vegastaden"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />

      <div class="relative z-10 container-yoga py-16 w-full">
        <span class="inline-block px-4 py-1.5 rounded-full bg-terra-500/90 text-cream-50 text-sm font-medium mb-6">
          Core Gym Vegastaden
        </span>
        <h1 class="text-display-lg text-cream-50 mb-4">{{ location.name }}</h1>
        <p class="text-body-xl text-cream-200 max-w-lg">
          {{ location.description }}
        </p>
      </div>
    </section>

    <!-- Yogasalen image -->
    <section class="bg-white pt-12 md:pt-20">
      <div class="container-yoga">
        <div class="rounded-4xl overflow-hidden">
          <img
            src="/images/yogasalen-core-vegastaden.avif"
            alt="Yogasalen på Core Gym Vegastaden"
            class="w-full h-auto"
          />
        </div>
      </div>
    </section>

    <!-- About -->
    <section class="section bg-white">
      <div class="container-yoga">
        <div class="max-w-3xl mx-auto">
          <div class="grid md:grid-cols-2 gap-8">
            <!-- Info -->
            <div>
              <h2 class="text-heading text-forest mb-4">Om yogasalen</h2>
              <p class="text-sage-600 text-body mb-6">
                En helt ljudisolerad sal dedikerad till yoga. Här kan du andas ut vardagen i lugn och ro,
                oavsett vad som händer på gymgolvet.
              </p>
              <p class="text-sage-600 text-body">
                Vi erbjuder Vinyasa, Yin och Power yoga – perfekt för både nybörjare och erfarna yogis.
              </p>
            </div>

            <!-- Instructor -->
            <div class="card-terra p-6">
              <div class="flex items-center gap-4 mb-4">
                <img
                  src="/images/yoga-angela-movement.avif"
                  alt="Angela Kemper"
                  class="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p class="text-terra-600 text-sm font-medium">Instruktör</p>
                  <h3 class="text-heading-sm text-forest">Angela Kemper</h3>
                </div>
              </div>
              <p class="text-sage-600 text-body-sm">
                Angela leder våra yogapass i Vegastaden med fokus på rörelse, andning och närvaro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Kommande pass -->
    <section class="section bg-cream-50">
      <div class="container-yoga">
        <div class="max-w-2xl mx-auto">
          <h2 class="text-display text-forest mb-8 text-center">Kommande pass</h2>

          <!-- Loading -->
          <div v-if="loading" class="flex justify-center py-12">
            <div class="w-10 h-10 border-2 border-sage-200 border-t-sage-600 rounded-full animate-spin" />
          </div>

          <!-- Classes -->
          <div v-else-if="vegastadenClasses.length > 0" class="space-y-3">
            <button
              v-for="cls in vegastadenClasses.slice(0, 5)"
              :key="cls.id"
              @click="openClassDetail(cls)"
              class="card card-hover p-5 w-full text-left group"
            >
              <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                <div class="sm:w-28 flex-shrink-0">
                  <div class="text-heading-sm text-forest group-hover:text-sage-700 transition-colors">{{ cls.dayName }}</div>
                  <div class="text-sage-500 text-body-sm">{{ cls.time }} <span class="text-sage-400">({{ formatDuration(cls.duration) }})</span></div>
                </div>
                <div class="hidden sm:block w-px h-10 bg-cream-200" />
                <div class="flex-grow">
                  <h3 class="text-forest font-semibold group-hover:text-sage-700 transition-colors">{{ cls.name }}</h3>
                  <p class="text-sage-500 text-body-sm">{{ cls.instructor || 'Angela Kemper' }}</p>
                </div>
              </div>
            </button>
          </div>

          <!-- Empty -->
          <div v-else class="text-center py-12">
            <p class="text-sage-500">Inga schemalagda pass just nu</p>
          </div>

          <!-- Link to full schedule -->
          <div class="text-center mt-8">
            <NuxtLink to="/schema" class="text-sage-600 font-medium hover:text-sage-800 transition-colors">
              Se hela schemat
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Address -->
    <section class="section bg-white">
      <div class="container-yoga">
        <div class="max-w-lg mx-auto text-center">
          <h2 class="text-heading text-forest mb-6">Hitta hit</h2>
          <p class="text-sage-700 text-body-lg mb-2">Core Gym Vegastaden</p>
          <p class="text-sage-600 mb-6">{{ location.address }}</p>
          <a
            :href="location.mapsUrl"
            class="text-sage-600 font-medium hover:text-sage-800 transition-colors"
          >
            Öppna i kartor
          </a>
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
