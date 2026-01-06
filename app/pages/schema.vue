<script setup lang="ts">
import type { YogaClass } from '~/composables/useYogaSchedule'
import { useYogaSchedule } from '~/composables/useYogaSchedule'

useHead({
  title: 'Schema - Yoga i Tungelsta',
  meta: [
    { name: 'description', content: 'Se schemat för yoga i Tungelsta. Kundalini, Yin och mer.' }
  ]
})

const { schedule, loading, error, fetchSchedule } = useYogaSchedule()

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
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-green py-16 md:py-24">
      <div class="container-yoga">
        <div class="chip mb-6">
          <span class="text-kundalini-green">✦</span>
          Schema
        </div>
        <h1 class="heading-xl text-text-primary mb-4">
          Kommande pass
        </h1>
        <p class="text-body max-w-lg">
          Alla yogapass i Tungelsta de närmaste två veckorna.
          Ingen bokning krävs - droppa bara in!
        </p>
      </div>
    </section>

    <!-- Schema -->
    <section class="section-padding bg-surface-cream">
      <div class="container-yoga">
        <!-- Loading -->
        <div v-if="loading" class="text-center py-12">
          <div class="w-10 h-10 border-2 border-kundalini-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-body-sm">Hämtar schema...</p>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="card text-center">
          <p class="text-body-sm text-red-500">{{ error }}</p>
          <button @click="fetchSchedule(14)" class="btn-secondary mt-4">
            Försök igen
          </button>
        </div>

        <!-- Schedule -->
        <div v-else-if="schedule.length > 0" class="space-y-8">
          <div v-for="day in schedule" :key="day.date">
            <div class="flex items-center gap-3 mb-4">
              <h2 class="font-bold text-text-primary">{{ day.dayName }}</h2>
              <span class="text-text-muted text-sm">{{ formatDate(day.date) }}</span>
            </div>

            <div class="space-y-3">
              <button
                v-for="cls in day.classes"
                :key="cls.id"
                @click="openClassDetail(cls)"
                class="card card-hover block group w-full text-left"
              >
                <div class="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div class="sm:w-20 flex-shrink-0">
                    <div class="text-kundalini-green-dark font-bold">{{ cls.time }}</div>
                    <div v-if="cls.endTime" class="text-text-muted text-xs">- {{ cls.endTime }}</div>
                  </div>
                  <div class="flex-grow">
                    <h3 class="font-semibold text-text-primary group-hover:text-kundalini-green-dark transition-colors">{{ cls.name }}</h3>
                    <p v-if="cls.instructor" class="text-body-sm">{{ cls.instructor }}</p>
                  </div>
                  <div class="flex items-center gap-2 flex-shrink-0">
                    <span v-if="cls.isKundalini" class="chip !py-1 !px-3 text-xs">Kundalini</span>
                    <span v-else-if="cls.isYin" class="chip !py-1 !px-3 text-xs !bg-kundalini-lavender-light !text-kundalini-lavender">Yin</span>
                    <span v-else class="chip !py-1 !px-3 text-xs">Yoga</span>
                    <svg class="w-4 h-4 text-text-muted group-hover:text-kundalini-green-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- No classes -->
        <div v-else class="card text-center py-12">
          <div class="w-16 h-16 rounded-full bg-kundalini-green-pale flex items-center justify-center mx-auto mb-4">
            <span class="text-kundalini-green text-2xl">✦</span>
          </div>
          <p class="text-body mb-2">Inga schemalagda yogapass just nu</p>
          <p class="text-body-sm">Kolla tillbaka snart!</p>
        </div>

        <!-- Info -->
        <div class="card-green mt-8">
          <div class="flex items-start gap-3">
            <svg class="w-5 h-5 text-kundalini-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h4 class="font-medium text-text-primary mb-1">Bra att veta</h4>
              <p class="text-body-sm">
                Kom gärna 10 minuter innan passet börjar så du hinner landa.
                <strong>Klicka på ett pass</strong> för att se mer info och boka.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Priser -->
    <section class="section-padding bg-white">
      <div class="container-yoga">
        <h2 class="heading-lg text-text-primary mb-6 text-center">Priser</h2>

        <div class="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <!-- Engångspass -->
          <div class="card text-center">
            <div class="w-10 h-10 rounded-full bg-kundalini-green-pale flex items-center justify-center mx-auto mb-3">
              <span class="text-kundalini-green font-bold">1</span>
            </div>
            <h3 class="font-semibold text-text-primary mb-1">Engångspass</h3>
            <p class="text-body-sm mb-2">Drop-in</p>
            <p class="text-kundalini-green-dark font-bold text-xl">150 kr</p>
            <p class="text-text-muted text-xs mt-2">Klicka på ett pass ovan för att köpa</p>
          </div>

          <!-- Klippkort -->
          <a
            href="https://coregymclub.zoezi.se/webshop"
            target="_blank"
            class="card card-hover text-center border-2 border-kundalini-green group"
          >
            <div class="w-10 h-10 rounded-full bg-kundalini-green flex items-center justify-center mx-auto mb-3">
              <span class="text-white font-bold">10</span>
            </div>
            <h3 class="font-semibold text-text-primary mb-1 group-hover:text-kundalini-green-dark transition-colors">Klippkort</h3>
            <p class="text-body-sm mb-2">10 pass</p>
            <p class="text-kundalini-green-dark font-bold text-xl">1 200 kr</p>
            <p class="text-text-muted text-xs mt-2">Spara 300 kr!</p>
            <span class="inline-flex items-center gap-1 text-kundalini-green-dark text-sm font-medium mt-3 group-hover:underline">
              Köp klippkort
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </a>

          <!-- Medlemskap -->
          <a
            href="https://coregym.club/bli-medlem"
            target="_blank"
            class="card card-hover text-center group"
          >
            <div class="w-10 h-10 rounded-full bg-kundalini-green-pale flex items-center justify-center mx-auto mb-3">
              <svg class="w-5 h-5 text-kundalini-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="font-semibold text-text-primary mb-1 group-hover:text-kundalini-green-dark transition-colors">Medlemskap</h3>
            <p class="text-body-sm mb-2">Obegränsat</p>
            <p class="text-kundalini-green-dark font-bold text-xl">Ingår</p>
            <p class="text-text-muted text-xs mt-2">via Core Gym Club</p>
            <span class="inline-flex items-center gap-1 text-kundalini-green-dark text-sm font-medium mt-3 group-hover:underline">
              Bli medlem
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </a>
        </div>

        <!-- Medlemskaps-info -->
        <div class="card-green mt-8 max-w-3xl mx-auto">
          <div class="flex flex-col md:flex-row md:items-start gap-6">
            <div class="flex-1">
              <h3 class="font-semibold text-text-primary mb-3">Mer värde med medlemskap</h3>
              <p class="text-body-sm mb-4">
                Som medlem hos Core Gym Club får du inte bara obegränsad yoga – du får tillgång till så mycket mer:
              </p>
              <ul class="space-y-2">
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-kundalini-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-body-sm">All gruppträning i Tungelsta</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-kundalini-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-body-sm">Gymmet i Tungelsta</span>
                </li>
                <li class="flex items-start gap-2">
                  <svg class="w-4 h-4 text-kundalini-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-body-sm">Gymmet i Västerhaninge</span>
                </li>
              </ul>
            </div>
            <div class="flex-shrink-0">
              <a
                href="https://coregym.club/bli-medlem"
                target="_blank"
                class="btn-primary"
              >
                Bli medlem
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Plats -->
    <section class="section-padding bg-surface-cream">
      <div class="container-yoga">
        <div class="grid md:grid-cols-2 gap-6 items-center">
          <!-- Bild -->
          <div class="rounded-3xl overflow-hidden">
            <img
              src="/images/annexet-yoga-i-tungelsta.webp"
              alt="Gamla Café Medmig - en vacker röd träkyrka i Tungelsta"
              class="w-full h-auto object-cover"
            />
          </div>

          <!-- Info -->
          <div class="card">
            <h3 class="font-semibold text-text-primary mb-1">Gamla Café Medmig</h3>
            <p class="text-text-muted text-sm mb-3">(fd Pingstkyrkan)</p>
            <p class="text-body-sm mb-4">
              Rosvägen 2<br>
              137 91 Tungelsta
            </p>
            <a
              href="https://maps.apple.com/?address=Rosvagen%202,%20137%2091%20Tungelsta,%20Sweden"
              target="_blank"
              class="inline-flex items-center gap-2 text-kundalini-green-dark font-medium hover:underline text-sm"
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

    <!-- Class Detail Sheet -->
    <ClassDetailSheet
      :yoga-class="selectedClass"
      :open="isSheetOpen"
      @close="closeClassDetail"
    />
  </div>
</template>
