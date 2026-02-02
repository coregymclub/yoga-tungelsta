<script setup lang="ts">
/**
 * YogaInterestSheet - Intresseanmälan för yoga events/retreats
 * Skickar till e-post och teamchat yoga-rum
 */

interface Props {
  open: boolean
  eventTitle?: string
  eventDate?: string
}

const props = withDefaults(defineProps<Props>(), {
  eventTitle: 'Yoga Retreat',
  eventDate: ''
})

const emit = defineEmits<{
  close: []
}>()

// Form state
const formData = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})
const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

// Reset form when sheet opens
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    formData.value = { name: '', email: '', phone: '', message: '' }
    isSuccess.value = false
    errorMessage.value = ''
  }
})

async function handleSubmit() {
  // Basic validation
  if (!formData.value.name.trim()) {
    errorMessage.value = 'Vänligen ange ditt namn'
    return
  }
  if (!formData.value.email.trim() && !formData.value.phone.trim()) {
    errorMessage.value = 'Vänligen ange e-post eller telefon'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const timestamp = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })

    // Build email HTML
    const emailHtml = `
      <h2>🧘 Intresseanmälan: ${props.eventTitle}</h2>
      <p><strong>Tid:</strong> ${timestamp}</p>
      ${props.eventDate ? `<p><strong>Event:</strong> ${props.eventDate}</p>` : ''}
      <hr>
      <p><strong>Namn:</strong> ${formData.value.name}</p>
      ${formData.value.email ? `<p><strong>E-post:</strong> ${formData.value.email}</p>` : ''}
      ${formData.value.phone ? `<p><strong>Telefon:</strong> ${formData.value.phone}</p>` : ''}
      ${formData.value.message ? `<hr><h3>Meddelande:</h3><p>${formData.value.message}</p>` : ''}
      <hr>
      <p style="color: #666; font-size: 12px;">Skickat via coregym.yoga</p>
    `

    // Send email
    const emailResponse = await fetch('https://student-email.coregymclub.se/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'info@coregym.club',
        subject: `🧘 Intresse: ${props.eventTitle} - ${formData.value.name}`,
        html: emailHtml,
        replyTo: formData.value.email || undefined
      })
    })

    if (!emailResponse.ok) {
      throw new Error('Kunde inte skicka e-post')
    }

    // Post to teamchat yoga room
    try {
      const contact = formData.value.phone || formData.value.email
      await fetch('https://teamchat.coregym.club/api/terminal/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room: 'yoga',
          message: `🧘 Intresse "${props.eventTitle}": ${formData.value.name} (${contact})`
        })
      })
    } catch (chatErr) {
      console.error('Kunde inte posta till teamchat:', chatErr)
      // Don't fail the whole submission if teamchat fails
    }

    isSuccess.value = true
  } catch (error) {
    console.error('Submit error:', error)
    errorMessage.value = 'Något gick fel. Försök igen eller kontakta oss direkt.'
  } finally {
    isSubmitting.value = false
  }
}

function handleClose() {
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="sheet">
      <div
        v-if="open"
        class="fixed inset-0 z-[70] flex items-end sm:items-center justify-center"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-forest/60 backdrop-blur-sm"
          @click="handleClose"
        />

        <!-- Sheet -->
        <div class="relative w-full max-w-lg mx-4 mb-4 sm:mb-0 bg-cream-50 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
          <!-- Header -->
          <div class="p-6 pb-4 border-b border-cream-200">
            <div class="flex items-start justify-between">
              <div>
                <h2 class="text-heading text-forest">Anmäl intresse</h2>
                <p class="text-sage-600 text-sm mt-1">{{ eventTitle }}</p>
              </div>
              <button
                type="button"
                class="w-10 h-10 rounded-full bg-cream-100 flex items-center justify-center hover:bg-cream-200 transition-colors"
                @click="handleClose"
              >
                <svg class="w-5 h-5 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 overflow-y-auto">
            <!-- Success state -->
            <div v-if="isSuccess" class="text-center py-8">
              <div class="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 class="text-heading-sm text-forest mb-2">Tack för din anmälan!</h3>
              <p class="text-sage-600 mb-6">
                Vi hör av oss med mer information.
              </p>
              <button
                type="button"
                class="btn-primary"
                @click="handleClose"
              >
                Stäng
              </button>
            </div>

            <!-- Form -->
            <form v-else @submit.prevent="handleSubmit" class="space-y-4">
              <!-- Error message -->
              <div v-if="errorMessage" class="p-3 bg-terra-50 text-terra-700 rounded-xl text-sm">
                {{ errorMessage }}
              </div>

              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-forest mb-1.5">
                  Namn <span class="text-terra-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="formData.name"
                  type="text"
                  required
                  autocomplete="name"
                  class="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white text-forest placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-all"
                  placeholder="Ditt namn"
                />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-forest mb-1.5">
                  E-post
                </label>
                <input
                  id="email"
                  v-model="formData.email"
                  type="email"
                  autocomplete="email"
                  class="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white text-forest placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-all"
                  placeholder="din@epost.se"
                />
              </div>

              <!-- Phone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-forest mb-1.5">
                  Telefon
                </label>
                <input
                  id="phone"
                  v-model="formData.phone"
                  type="tel"
                  autocomplete="tel"
                  class="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white text-forest placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-all"
                  placeholder="07X XXX XX XX"
                />
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-medium text-forest mb-1.5">
                  Meddelande (valfritt)
                </label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  rows="3"
                  class="w-full px-4 py-3 rounded-xl border border-cream-200 bg-white text-forest placeholder-sage-400 focus:outline-none focus:ring-2 focus:ring-sage-300 focus:border-transparent transition-all resize-none"
                  placeholder="Frågor eller önskemål?"
                />
              </div>

              <p class="text-xs text-sage-500">
                * Ange e-post eller telefon så vi kan nå dig
              </p>

              <!-- Submit -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="isSubmitting" class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Skickar...
                </span>
                <span v-else>Skicka intresseanmälan</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.sheet-enter-active {
  transition: opacity 0.3s ease;
}
.sheet-enter-active > div:last-child {
  transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
}
.sheet-leave-active {
  transition: opacity 0.2s ease;
}
.sheet-leave-active > div:last-child {
  transition: transform 0.2s ease;
}
.sheet-enter-from,
.sheet-leave-to {
  opacity: 0;
}
.sheet-enter-from > div:last-child,
.sheet-leave-to > div:last-child {
  transform: translateY(100%);
}
@media (min-width: 640px) {
  .sheet-enter-from > div:last-child,
  .sheet-leave-to > div:last-child {
    transform: translateY(20px) scale(0.95);
  }
}
</style>
