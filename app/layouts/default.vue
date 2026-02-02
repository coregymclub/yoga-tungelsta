<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { useSheetState } from '~/composables/useSheetState'
import { useReferrer } from '~/composables/useReferrer'

const route = useRoute()
const { isLoggedIn, checkAuth } = useAuth()
const { isSheetOpen } = useSheetState()
const { cameFromMainSite, trackReferrer, mainSiteUrl } = useReferrer()

onMounted(() => {
  checkAuth()
  trackReferrer()
})

// Navigation items - split for centered logo layout
const leftNavItems = [
  { label: 'Hem', to: '/', icon: 'home' },
  { label: 'Schema', to: '/schema', icon: 'calendar' },
]

const rightNavItems = computed(() => {
  const items = [
    { label: 'Platser', to: '/platser', icon: 'location' },
  ]

  if (isLoggedIn.value) {
    items.push({ label: 'Profil', to: '/profil', icon: 'user' })
  } else {
    items.push({ label: 'Logga in', to: '/login', icon: 'login' })
  }

  return items
})

// Scroll state for header
const isScrolled = ref(false)

// Mobile nav scroll behavior - more subtle on scroll down
const mobileNavCompact = ref(false)
const lastScrollY = ref(0)

onMounted(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY

    // Desktop header
    isScrolled.value = currentScrollY > 20

    // Mobile nav - get more compact when scrolling down
    if (currentScrollY < 50) {
      mobileNavCompact.value = false
    } else if (currentScrollY > lastScrollY.value + 5) {
      mobileNavCompact.value = true
    } else if (currentScrollY < lastScrollY.value - 5) {
      mobileNavCompact.value = false
    }

    lastScrollY.value = currentScrollY
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>

<template>
  <div class="min-h-screen flex flex-col bg-cream-50">
    <!-- Back to main site banner - shows when visitor came from coregym.club -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="-translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-full opacity-0"
    >
      <div
        v-if="cameFromMainSite"
        class="fixed top-0 left-0 right-0 z-[60] bg-forest text-cream-50 py-2 text-center text-sm"
      >
        <a
          :href="mainSiteUrl"
          class="inline-flex items-center gap-2 hover:text-white transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Tillbaka till coregym.club
        </a>
      </div>
    </Transition>

    <!-- Header - Desktop only, centered with logo in middle -->
    <header
      class="fixed left-0 right-0 z-50 transition-all duration-500 hidden md:block"
      :class="[
        isScrolled ? 'py-3' : 'py-6',
        cameFromMainSite ? 'top-10' : 'top-0'
      ]"
    >
      <div class="container-yoga">
        <nav
          class="grid grid-cols-[1fr_auto_1fr] items-center mx-auto w-fit px-4 py-2 rounded-full transition-all duration-500"
          :class="isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-soft border border-cream-200/50' : ''"
        >
          <!-- Left nav items -->
          <div class="flex items-center justify-end gap-1">
            <NuxtLink
              v-for="item in leftNavItems"
              :key="item.to"
              :to="item.to"
              class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              :class="route.path === item.to
                ? 'bg-sage-100 text-sage-800'
                : 'text-sage-600 hover:text-sage-800 hover:bg-sage-50'"
            >
              {{ item.label }}
            </NuxtLink>
          </div>

          <!-- Center Logo - Always centered -->
          <NuxtLink
            to="/"
            class="logo-desktop mx-8"
            aria-label="Hem"
          >
            <svg class="w-9 h-9 text-sage-500" viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M462.75,205.15c-85.88,0-168.42,36.35-226.45,99.77-25.64,28.07-69.18,29.97-97.25,4.3-14.3-13.05-22.3-30.74-22.33-48.72-.03-30.59,17.75-49.12,29.12-60.21,43.83-42.86,149.05-132.82,316.91-132.82,245.11,0,444.52,199.38,444.52,444.52s-199.41,444.52-444.52,444.52c-167.86,0-273.08-89.96-316.91-132.85-11.37-11.09-29.16-29.59-29.12-60.18.03-17.97,8.04-35.67,22.33-48.75,28.07-25.64,71.61-23.74,97.25,4.3,58.03,63.45,140.57,99.77,226.45,99.77,68.22,0,128.08-20.43,178.92-57.53,35.1-25.57,41.93-46.01,41.99-66.35.03-15.89-5.82-31.52-15.67-42.8-13.3-15.26-30.93-23.55-51.08-23.55-15.85,0-32.55,7.32-46.85,16.63-32.86,21.46-67.62,36.69-107.31,36.69-93.7,0-169.98-76.22-169.98-169.92s76.28-169.98,169.98-169.98c39.68,0,74.45,15.29,107.31,36.72,14.3,9.31,30.99,16.66,46.85,16.66,20.15,0,37.78-8.29,51.08-23.55,9.84-11.31,15.7-26.94,15.67-42.8-.06-20.34-6.88-40.77-41.99-66.38-50.83-37.07-110.7-57.53-178.92-57.53"/>
            </svg>
          </NuxtLink>

          <!-- Right nav items -->
          <div class="flex items-center justify-start gap-1">
            <NuxtLink
              v-for="item in rightNavItems"
              :key="item.to"
              :to="item.to"
              class="px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300"
              :class="route.path === item.to
                ? 'bg-sage-100 text-sage-800'
                : 'text-sage-600 hover:text-sage-800 hover:bg-sage-50'"
            >
              {{ item.label }}
            </NuxtLink>

          </div>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 pb-24 md:pb-0">
      <slot />
    </main>

    <!-- Footer - Desktop only -->
    <footer class="hidden md:block bg-gradient-footer text-cream-100 relative overflow-hidden">
      <!-- Decorative elements -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-sage-600/5 rounded-full blur-3xl" />
      <div class="absolute bottom-0 right-1/4 w-64 h-64 bg-terra-500/5 rounded-full blur-3xl" />

      <div class="container-yoga py-20 relative">
        <!-- Top section - centered brand -->
        <div class="text-center mb-16">
          <!-- Logo - just the C -->
          <svg class="w-12 h-12 text-sage-400 mx-auto mb-6" viewBox="0 0 1024 1024" fill="currentColor">
            <path d="M462.75,205.15c-85.88,0-168.42,36.35-226.45,99.77-25.64,28.07-69.18,29.97-97.25,4.3-14.3-13.05-22.3-30.74-22.33-48.72-.03-30.59,17.75-49.12,29.12-60.21,43.83-42.86,149.05-132.82,316.91-132.82,245.11,0,444.52,199.38,444.52,444.52s-199.41,444.52-444.52,444.52c-167.86,0-273.08-89.96-316.91-132.85-11.37-11.09-29.16-29.59-29.12-60.18.03-17.97,8.04-35.67,22.33-48.75,28.07-25.64,71.61-23.74,97.25,4.3,58.03,63.45,140.57,99.77,226.45,99.77,68.22,0,128.08-20.43,178.92-57.53,35.1-25.57,41.93-46.01,41.99-66.35.03-15.89-5.82-31.52-15.67-42.8-13.3-15.26-30.93-23.55-51.08-23.55-15.85,0-32.55,7.32-46.85,16.63-32.86,21.46-67.62,36.69-107.31,36.69-93.7,0-169.98-76.22-169.98-169.92s76.28-169.98,169.98-169.98c39.68,0,74.45,15.29,107.31,36.72,14.3,9.31,30.99,16.66,46.85,16.66,20.15,0,37.78-8.29,51.08-23.55,9.84-11.31,15.7-26.94,15.67-42.8-.06-20.34-6.88-40.77-41.99-66.38-50.83-37.07-110.7-57.53-178.92-57.53"/>
          </svg>
          <h4 class="font-display text-2xl font-bold text-cream-50 mb-3">Core Gym Yoga</h4>
          <p class="text-cream-300 max-w-md mx-auto">
            Yoga i Haninge. Kundalini, Yin och mer. En del av Core Gym Club.
          </p>
        </div>

        <!-- Links grid -->
        <div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto text-center mb-16">
          <div>
            <h5 class="text-label-sm text-cream-400 mb-4">Platser</h5>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/platser/tungelsta" class="text-cream-300 hover:text-cream-50 transition-colors">
                  Tungelsta
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/platser/vegastaden" class="text-cream-300 hover:text-cream-50 transition-colors">
                  Vegastaden
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h5 class="text-label-sm text-cream-400 mb-4">Yoga</h5>
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/kundalini" class="text-cream-300 hover:text-cream-50 transition-colors">
                  Kundalini
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/schema" class="text-cream-300 hover:text-cream-50 transition-colors">
                  Schema
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div>
            <h5 class="text-label-sm text-cream-400 mb-4">Core Gym</h5>
            <ul class="space-y-2">
              <li>
                <a href="https://coregym.club" target="_blank" class="text-cream-300 hover:text-cream-50 transition-colors">
                  coregym.club
                </a>
              </li>
              <li>
                <NuxtLink to="/bli-medlem" class="text-cream-300 hover:text-cream-50 transition-colors">
                  Bli medlem
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bottom -->
        <div class="text-center pt-8 border-t border-cream-800/30">
          <p class="text-cream-500 text-sm">
            &copy; {{ new Date().getFullYear() }} Core Gym Club
          </p>
        </div>
      </div>
    </footer>

    <!-- Mobile Navigation - Compact, liquid glass, scroll-aware, hidden when sheet is open -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-full opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-full opacity-0"
    >
    <div
      v-show="!isSheetOpen"
      class="fixed bottom-0 left-0 right-0 z-40 md:hidden transition-all duration-300"
      :class="mobileNavCompact ? 'translate-y-1 scale-[0.95] opacity-90' : 'translate-y-0 scale-100 opacity-100'"
    >
      <div class="px-4 pb-safe">
        <nav class="nav-mobile relative">
          <!-- Liquid glass refraction layer (Chromium only) -->
          <div class="nav-glass-refraction" />
          <!-- Glass overlay -->
          <div class="nav-glass-overlay" />
          <!-- Specular highlight -->
          <div class="nav-glass-specular" />
          <!-- Left items -->
          <NuxtLink
            v-for="item in leftNavItems"
            :key="item.to"
            :to="item.to"
            class="nav-mobile-item"
            :class="route.path === item.to ? 'nav-mobile-item-active' : ''"
          >
            <svg v-if="item.icon === 'home'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <svg v-else-if="item.icon === 'calendar'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
            </svg>
            <span class="text-[10px] font-medium mt-0.5">{{ item.label }}</span>
          </NuxtLink>

          <!-- Center Logo - Bigger, offset slightly right, no circle -->
          <NuxtLink to="/" class="logo-mobile" aria-label="Hem">
            <svg class="w-9 h-9 text-sage-500" viewBox="0 0 1024 1024" fill="currentColor">
              <path d="M462.75,205.15c-85.88,0-168.42,36.35-226.45,99.77-25.64,28.07-69.18,29.97-97.25,4.3-14.3-13.05-22.3-30.74-22.33-48.72-.03-30.59,17.75-49.12,29.12-60.21,43.83-42.86,149.05-132.82,316.91-132.82,245.11,0,444.52,199.38,444.52,444.52s-199.41,444.52-444.52,444.52c-167.86,0-273.08-89.96-316.91-132.85-11.37-11.09-29.16-29.59-29.12-60.18.03-17.97,8.04-35.67,22.33-48.75,28.07-25.64,71.61-23.74,97.25,4.3,58.03,63.45,140.57,99.77,226.45,99.77,68.22,0,128.08-20.43,178.92-57.53,35.1-25.57,41.93-46.01,41.99-66.35.03-15.89-5.82-31.52-15.67-42.8-13.3-15.26-30.93-23.55-51.08-23.55-15.85,0-32.55,7.32-46.85,16.63-32.86,21.46-67.62,36.69-107.31,36.69-93.7,0-169.98-76.22-169.98-169.92s76.28-169.98,169.98-169.98c39.68,0,74.45,15.29,107.31,36.72,14.3,9.31,30.99,16.66,46.85,16.66,20.15,0,37.78-8.29,51.08-23.55,9.84-11.31,15.7-26.94,15.67-42.8-.06-20.34-6.88-40.77-41.99-66.38-50.83-37.07-110.7-57.53-178.92-57.53"/>
            </svg>
          </NuxtLink>

          <!-- Right items -->
          <NuxtLink
            v-for="item in rightNavItems"
            :key="item.to"
            :to="item.to"
            class="nav-mobile-item"
            :class="route.path === item.to ? 'nav-mobile-item-active' : ''"
          >
            <svg v-if="item.icon === 'location'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <svg v-else-if="item.icon === 'user'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            <svg v-else-if="item.icon === 'login'" class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
            </svg>
            <span class="text-[10px] font-medium mt-0.5">{{ item.label }}</span>
          </NuxtLink>
        </nav>
      </div>
    </div>
    </Transition>
  </div>
</template>

<style scoped>
.pb-safe {
  padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
}

/* Desktop logo - just the C, no background */
.logo-desktop {
  @apply transition-all duration-300;
  filter: drop-shadow(0 2px 8px rgba(156, 184, 138, 0.2));
}

.logo-desktop:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 4px 12px rgba(156, 184, 138, 0.3));
}

.logo-desktop:active {
  transform: scale(0.95);
}

/* Mobile logo - just the C, offset right for visual centering */
.logo-mobile {
  @apply transition-all duration-300;
  position: relative;
  z-index: 3;
  margin-left: 4px; /* Slight offset to feel more centered */
  filter: drop-shadow(0 2px 12px rgba(156, 184, 138, 0.25));
}

.logo-mobile:hover {
  transform: scale(1.1);
}

.logo-mobile:active {
  transform: scale(0.92);
}

/* Apple-inspired liquid glass nav - layered composition */
.nav-mobile {
  @apply flex items-center justify-around py-2 px-1;
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  isolation: isolate;
}

/* Layer 0: Refraction/distortion - applies SVG displacement to backdrop (Chromium only) */
.nav-glass-refraction {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  /* SVG filter as backdrop-filter - only works in Chromium */
  backdrop-filter: url(#liquid-glass) blur(1px);
  -webkit-backdrop-filter: url(#liquid-glass) blur(1px);
}

/* Layer 1: Base glass fill with blur */
.nav-glass-overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.55) 0%,
    rgba(255, 255, 255, 0.35) 100%
  );
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
}

/* Layer 2: Specular highlights - light reflections */
.nav-glass-specular {
  position: absolute;
  inset: 0;
  z-index: 2;
  border-radius: inherit;
  pointer-events: none;
  /* Top edge highlight */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(255, 255, 255, 0.2),
    inset 1px 0 0 rgba(255, 255, 255, 0.4),
    inset -1px 0 0 rgba(255, 255, 255, 0.4),
    /* Outer shadow for depth */
    0 8px 32px -8px rgba(30, 42, 28, 0.15),
    0 2px 8px rgba(30, 42, 28, 0.08);
  /* Subtle gradient for curved glass feel */
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 40%,
    transparent 60%,
    rgba(255, 255, 255, 0.08) 100%
  );
}

.nav-mobile-item {
  @apply flex flex-col items-center justify-center
         px-3 py-1.5 rounded-xl
         text-sage-600
         transition-all duration-300;
  position: relative;
  z-index: 3;
}

.nav-mobile-item:active {
  transform: scale(0.92);
}

.nav-mobile-item-active {
  @apply text-sage-800;
  background: rgba(156, 184, 138, 0.18);
}

.nav-mobile-item-active svg {
  @apply text-sage-600;
}
</style>
