<script setup lang="ts">
import type { YogaClass } from '~/composables/useYogaSchedule'
import { LOCATIONS } from '~/composables/useYogaSchedule'
import { useSheetState } from '~/composables/useSheetState'

const props = defineProps<{
  yogaClass: YogaClass | null
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

// Use global sheet state to hide bottom nav
const { openSheet, closeSheet } = useSheetState()

// Watch open prop to sync with global state
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    openSheet()
  } else {
    closeSheet()
  }
})

// Format date nicely
function formatDate(dateStr: string, dayName: string): string {
  const [year, month, day] = dateStr.split('-')
  return `${dayName} ${parseInt(day)}/${parseInt(month)}`
}

// Format duration
function formatDuration(minutes: number): string {
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (mins === 0) return `${hours} tim`
    return `${hours} tim ${mins} min`
  }
  return `${minutes} min`
}

// Get booking URL - using z.coregym.club
function getBookingUrl(classId: number): string {
  return `https://z.coregym.club/booking/workout/${classId}`
}

// Get location info based on class
function getLocationInfo(siteKey: string | null) {
  if (siteKey === 'tungelsta') {
    return {
      name: 'Gamla Café Medmig',
      address: LOCATIONS.tungelsta.address,
      mapsUrl: LOCATIONS.tungelsta.mapsUrl
    }
  }
  if (siteKey === 'vegastaden') {
    return {
      name: 'Core Gym Vegastaden',
      address: LOCATIONS.vegastaden.address,
      mapsUrl: LOCATIONS.vegastaden.mapsUrl
    }
  }
  return null
}

// Close on escape
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close')
  }
}

// Add/remove event listener
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  // Ensure sheet state is closed when component unmounts
  closeSheet()
})
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="fixed inset-0 bg-forest/40 backdrop-blur-sm z-50"
        @click="emit('close')"
      />
    </Transition>

    <!-- Bottom Sheet -->
    <Transition
      enter-active-class="transition duration-300 ease-smooth"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div
        v-if="open && yogaClass"
        class="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-soft-xl max-h-[85vh] overflow-hidden"
      >
        <!-- Drag handle -->
        <div class="flex justify-center pt-3 pb-2">
          <div class="w-10 h-1 bg-cream-200 rounded-full" />
        </div>

        <!-- Content -->
        <div class="px-6 pb-8 overflow-y-auto max-h-[calc(85vh-3rem)]">
          <!-- Header -->
          <div class="flex items-start justify-between gap-4 mb-4">
            <div>
              <div class="flex items-center gap-2 mb-2">
                <span
                  v-if="yogaClass.siteKey === 'tungelsta'"
                  class="text-label-sm px-3 py-1 rounded-full bg-sage-100 text-sage-700"
                >
                  Tungelsta
                </span>
                <span
                  v-else-if="yogaClass.siteKey === 'vegastaden'"
                  class="text-label-sm px-3 py-1 rounded-full bg-terra-100 text-terra-700"
                >
                  Vegastaden
                </span>
              </div>
              <h2 class="text-heading text-forest">{{ yogaClass.name }}</h2>
            </div>
            <button
              @click="emit('close')"
              class="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center text-sage-500 hover:text-forest hover:bg-cream-200 transition-colors flex-shrink-0"
              aria-label="Stäng"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Time, Date & Duration -->
          <div class="flex flex-wrap items-center gap-4 mb-6">
            <div class="flex items-center gap-2 text-sage-700">
              <svg class="w-5 h-5 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="font-medium">{{ formatDate(yogaClass.date, yogaClass.dayName) }}</span>
            </div>
            <div class="flex items-center gap-2 text-sage-700">
              <svg class="w-5 h-5 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="font-medium">{{ yogaClass.time }}</span>
            </div>
            <div class="flex items-center gap-2 text-sage-600">
              <span class="text-body-sm">({{ formatDuration(yogaClass.duration) }})</span>
            </div>
          </div>

          <!-- Instructor -->
          <div v-if="yogaClass.instructor" class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 rounded-full bg-sage-100 flex items-center justify-center">
              <img
                v-if="yogaClass.instructorImage"
                :src="yogaClass.instructorImage"
                :alt="yogaClass.instructor"
                class="w-full h-full rounded-full object-cover"
              />
              <svg v-else class="w-6 h-6 text-sage-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p class="text-sage-500 text-body-sm">Instruktör</p>
              <p class="font-medium text-forest">{{ yogaClass.instructor }}</p>
            </div>
          </div>

          <!-- Description -->
          <div v-if="yogaClass.description" class="mb-8">
            <h3 class="font-semibold text-forest mb-2">Om passet</h3>
            <p class="text-sage-600 text-body leading-relaxed">{{ yogaClass.description }}</p>
          </div>

          <!-- Price info -->
          <div class="bg-sage-50 rounded-2xl p-5 mb-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sage-500 text-body-sm">Engångspass</p>
                <p class="text-heading-sm text-forest">150 kr</p>
              </div>
              <div class="text-right">
                <p class="text-sage-500 text-body-sm">Har du klippkort?</p>
                <p class="text-sage-600 text-body-sm">Använd det vid bokning</p>
              </div>
            </div>
          </div>

          <!-- Spots left -->
          <div v-if="yogaClass.spotsLeft !== undefined" class="mb-6">
            <div
              class="flex items-center gap-2 text-body-sm"
              :class="yogaClass.spotsLeft <= 3 ? 'text-terra-600' : 'text-sage-600'"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span v-if="yogaClass.spotsLeft > 0">{{ yogaClass.spotsLeft }} platser kvar</span>
              <span v-else class="font-medium">Fullbokat</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="space-y-3">
            <a
              :href="getBookingUrl(yogaClass.id)"
              target="_blank"
              class="btn-primary w-full flex items-center justify-center gap-2"
            >
              Boka detta pass
            </a>

            <div class="flex gap-3">
              <a
                href="https://z.coregym.club/webshop"
                target="_blank"
                class="btn-secondary flex-1 text-center text-sm"
              >
                Köp klippkort
              </a>
              <a
                href="https://z.coregym.club/memberships"
                target="_blank"
                class="flex-1 text-center text-sm px-4 py-3 rounded-full bg-cream-100 text-sage-700 font-medium hover:bg-cream-200 transition-colors"
              >
                Bli medlem
              </a>
            </div>
          </div>

          <!-- Location -->
          <div v-if="getLocationInfo(yogaClass.siteKey)" class="mt-6 pt-6 border-t border-cream-200">
            <a
              :href="getLocationInfo(yogaClass.siteKey)?.mapsUrl"
              target="_blank"
              class="flex items-start gap-3 group"
            >
              <svg class="w-5 h-5 text-sage-500 flex-shrink-0 mt-0.5 group-hover:text-sage-700 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="font-medium text-forest text-sm group-hover:text-sage-700 transition-colors">
                  {{ getLocationInfo(yogaClass.siteKey)?.name }}
                </p>
                <p class="text-sage-500 text-sm">{{ getLocationInfo(yogaClass.siteKey)?.address }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
