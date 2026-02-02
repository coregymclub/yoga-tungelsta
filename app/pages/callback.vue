<script setup lang="ts">
/**
 * BankID callback page
 * After BankID login, Zoezi redirects here with ?zs=SESSION_TOKEN
 * We sync the session and redirect to profile
 */
const route = useRoute()

const error = ref('')
const showPwaMessage = ref(false)

onMounted(async () => {
  // Get session from query params (sent by Zoezi login)
  const zoeziSession = route.query.zs as string | undefined
  const fromPwa = route.query.from === 'pwa'

  if (zoeziSession) {
    try {
      // Use server-side endpoint to set cookie on .yogatungelsta.se
      const response = await fetch('/api/auth/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session: zoeziSession }),
        credentials: 'include'
      })

      if (!response.ok) {
        const data = await response.json()
        error.value = 'Kunde inte verifiera sessionen. Försök logga in igen.'
        return
      }

      const data = await response.json()
      console.log('[callback] Session synced successfully:', data.user?.firstname)

    } catch (err) {
      console.error('[callback] Session sync error:', err)
      // Fallback: try setting cookie via JavaScript
      const expires = new Date('2040-01-01').toUTCString()
      document.cookie = `session=${zoeziSession}; Path=/; Expires=${expires}; Secure; SameSite=Lax`
      document.cookie = `session=${zoeziSession}; Path=/; Domain=.yogatungelsta.se; Expires=${expires}; Secure; SameSite=Lax`
    }
  }

  // Check if user started login from PWA but is now in Safari
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  const isIOSPWA = (window.navigator as any).standalone === true
  const inPWA = isStandalone || isIOSPWA

  if (fromPwa && !inPWA) {
    // User started from PWA but is now in Safari - show message
    showPwaMessage.value = true
    return
  }

  // Redirect to profile
  setTimeout(() => {
    navigateTo('/profil', { replace: true })
  }, 300)
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-green px-6">
    <!-- Logo -->
    <div class="w-24 h-24 rounded-full bg-yoga-green-pale flex items-center justify-center mb-6">
      <span class="text-yoga-green text-4xl">✦</span>
    </div>

    <!-- PWA message -->
    <template v-if="showPwaMessage">
      <div class="text-center max-w-xs">
        <div class="mb-4">
          <svg class="w-16 h-16 mx-auto text-yoga-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="heading-md text-text-primary mb-2">
          Inloggningen lyckades!
        </h1>
        <p class="text-body mb-6">
          Gå tillbaka till appen på hemskärmen för att fortsätta.
        </p>
        <div class="flex items-center justify-center gap-2 text-sm text-text-muted">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Öppna Yoga i Tungelsta från hemskärmen</span>
        </div>
      </div>
    </template>

    <!-- Error message -->
    <template v-else-if="error">
      <div class="text-center max-w-xs">
        <div class="mb-4">
          <svg class="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 class="heading-md text-text-primary mb-2">
          Något gick fel
        </h1>
        <p class="text-body mb-6">
          {{ error }}
        </p>
        <NuxtLink to="/login" class="btn-primary">
          Försök igen
        </NuxtLink>
      </div>
    </template>

    <!-- Loading -->
    <template v-else>
      <div class="w-10 h-10 border-2 border-yoga-green-light border-t-yoga-green rounded-full animate-spin"></div>
      <p class="text-body mt-4">Loggar in...</p>
    </template>
  </div>
</template>
