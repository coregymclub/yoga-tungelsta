<script setup lang="ts">
const { isLoggedIn, checkAuth, redirectToLogin, loginWithGoogle, isLoading } = useAuth()

useHead({
  title: 'Logga in - Yoga i Tungelsta'
})

// Google login state
const isGoogleLoading = ref(false)
const googleError = ref('')
const showGoogleLogin = ref(false)

// Hidden Google login - tap logo 5 times to enable
const logoTapCount = ref(0)
let logoTapTimeout: ReturnType<typeof setTimeout> | null = null

function handleLogoTap() {
  logoTapCount.value++
  if (logoTapTimeout) clearTimeout(logoTapTimeout)
  logoTapTimeout = setTimeout(() => {
    logoTapCount.value = 0
  }, 2000)
  if (logoTapCount.value >= 5) {
    showGoogleLogin.value = true
    logoTapCount.value = 0
  }
}

// Listen for Google token from Zoezi iframe
async function handleGoogleMessage(event: MessageEvent) {
  if (event.data && event.data.id_token) {
    isGoogleLoading.value = true
    googleError.value = ''

    try {
      const success = await loginWithGoogle(event.data.id_token)
      if (success) {
        showGoogleLogin.value = false
        navigateTo('/profil')
      } else {
        googleError.value = 'Kontot finns inte eller är inte kopplat till Google'
      }
    } catch (err) {
      googleError.value = 'Något gick fel'
    }

    isGoogleLoading.value = false
  }
}

onMounted(async () => {
  window.addEventListener('message', handleGoogleMessage)

  // Check if already logged in
  await checkAuth()
  if (isLoggedIn.value) {
    navigateTo('/profil')
  }
})

onUnmounted(() => {
  window.removeEventListener('message', handleGoogleMessage)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-lavender relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-10 right-10 w-48 h-48 bg-white/30 rounded-full blur-3xl"></div>
    <div class="absolute bottom-20 left-5 w-64 h-64 bg-yoga-green/20 rounded-full blur-3xl"></div>

    <div class="container-yoga py-20 relative z-10">
      <div class="max-w-sm mx-auto text-center">
        <!-- Logo -->
        <div
          class="w-24 h-24 rounded-full bg-yoga-green-pale flex items-center justify-center mx-auto mb-8 cursor-pointer select-none"
          @click="handleLogoTap"
        >
          <span class="text-yoga-green text-4xl">✦</span>
        </div>

        <h1 class="heading-lg text-text-primary mb-4">
          Logga in
        </h1>
        <p class="text-body mb-10">
          Logga in för att se ditt klippkort och boka yoga.
        </p>

        <!-- Loading -->
        <div v-if="isLoading" class="py-8">
          <div class="w-10 h-10 border-2 border-yoga-green border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>

        <div v-else class="space-y-4">
          <!-- BankID button -->
          <button
            class="btn-primary w-full text-lg py-5 flex items-center justify-center gap-3"
            @click="redirectToLogin"
          >
            <img src="/bankid.png" alt="BankID" class="w-6 h-6 object-contain" />
            Logga in med BankID
          </button>

          <!-- Google login (hidden by default) -->
          <template v-if="showGoogleLogin">
            <div v-if="isGoogleLoading" class="flex items-center justify-center gap-2 py-4 text-text-muted">
              <div class="w-5 h-5 border-2 border-yoga-green-light border-t-yoga-green rounded-full animate-spin" />
              <span>Loggar in...</span>
            </div>

            <div v-else class="relative">
              <!-- Invisible iframe that receives the actual click -->
              <iframe
                src="https://service.zoezi.se/googleauth/"
                frameborder="0"
                scrolling="no"
                class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <!-- Styled button overlay -->
              <div class="btn-secondary w-full text-lg py-5 flex items-center justify-center gap-3 pointer-events-none">
                <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Fortsätt med Google
              </div>
            </div>

            <p v-if="googleError" class="text-red-500 text-sm">{{ googleError }}</p>
          </template>

          <!-- Back to home -->
          <NuxtLink to="/" class="block text-text-muted hover:text-yoga-green-dark transition-colors mt-8">
            Tillbaka till startsidan
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
