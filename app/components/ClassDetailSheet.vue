<script setup lang="ts">
import type { YogaClass } from '~/composables/useYogaSchedule'

const props = defineProps<{
  yogaClass: YogaClass | null
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

// Format date nicely
function formatDate(dateStr: string, dayName: string): string {
  const [year, month, day] = dateStr.split('-')
  return `${dayName} ${parseInt(day)}/${parseInt(month)}`
}

// Get booking URL
function getBookingUrl(classId: number): string {
  return `https://coregymclub.zoezi.se/booking/workout/${classId}`
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
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
        @click="emit('close')"
      />
    </Transition>

    <!-- Bottom Sheet -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-full"
      enter-to-class="translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0"
      leave-to-class="translate-y-full"
    >
      <div
        v-if="open && yogaClass"
        class="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[85vh] overflow-hidden"
      >
        <!-- Drag handle -->
        <div class="flex justify-center pt-3 pb-2">
          <div class="w-10 h-1 bg-surface-muted rounded-full" />
        </div>

        <!-- Content -->
        <div class="px-6 pb-8 overflow-y-auto max-h-[calc(85vh-3rem)]">
          <!-- Header -->
          <div class="flex items-start justify-between gap-4 mb-4">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <span v-if="yogaClass.isKundalini" class="chip !py-1 !px-3 text-xs">Kundalini</span>
                <span v-else-if="yogaClass.isYin" class="chip !py-1 !px-3 text-xs !bg-kundalini-lavender-light !text-kundalini-lavender">Yin</span>
                <span v-else class="chip !py-1 !px-3 text-xs">Yoga</span>
              </div>
              <h2 class="heading-md text-text-primary">{{ yogaClass.name }}</h2>
            </div>
            <button
              @click="emit('close')"
              class="w-10 h-10 rounded-full bg-surface-warm flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-surface-muted transition-colors flex-shrink-0"
              aria-label="Stäng"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Time & Date -->
          <div class="flex items-center gap-4 mb-6">
            <div class="flex items-center gap-2 text-text-secondary">
              <svg class="w-5 h-5 text-kundalini-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="font-medium">{{ formatDate(yogaClass.date, yogaClass.dayName) }}</span>
            </div>
            <div class="flex items-center gap-2 text-text-secondary">
              <svg class="w-5 h-5 text-kundalini-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span class="font-medium">
                {{ yogaClass.time }}
                <span v-if="yogaClass.endTime"> - {{ yogaClass.endTime }}</span>
              </span>
            </div>
          </div>

          <!-- Instructor -->
          <div v-if="yogaClass.instructor" class="flex items-center gap-3 mb-6">
            <div class="w-12 h-12 rounded-full bg-kundalini-green-pale flex items-center justify-center">
              <svg class="w-6 h-6 text-kundalini-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <p class="text-text-muted text-sm">Instruktör</p>
              <p class="font-medium text-text-primary">{{ yogaClass.instructor }}</p>
            </div>
          </div>

          <!-- Description -->
          <div v-if="yogaClass.description" class="mb-8">
            <h3 class="font-semibold text-text-primary mb-2">Om passet</h3>
            <p class="text-body">{{ yogaClass.description }}</p>
          </div>

          <!-- Price info -->
          <div class="card-green mb-6">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-text-muted text-sm">Engångspass</p>
                <p class="text-xl font-bold text-text-primary">150 kr</p>
              </div>
              <div class="text-right">
                <p class="text-text-muted text-sm">Har du klippkort?</p>
                <p class="text-body-sm">Använd det vid bokning</p>
              </div>
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
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <div class="flex gap-3">
              <a
                href="https://coregymclub.zoezi.se/webshop"
                target="_blank"
                class="btn-secondary flex-1 text-center text-sm"
              >
                Köp klippkort
              </a>
              <a
                href="https://coregym.club/bli-medlem"
                target="_blank"
                class="btn-soft flex-1 text-center text-sm"
              >
                Bli medlem
              </a>
            </div>
          </div>

          <!-- Location reminder -->
          <div class="mt-6 pt-6 border-t border-surface-muted">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-kundalini-green flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="font-medium text-text-primary text-sm">Gamla Café Medmig</p>
                <p class="text-text-muted text-sm">Rosvägen 2, Tungelsta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
