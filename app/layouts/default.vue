<script setup lang="ts">
const route = useRoute()

// Meny state
const isMenuOpen = ref(false)

// Stäng meny vid navigation
watch(() => route.path, () => {
  isMenuOpen.value = false
})

// Navigation items
const navItems = [
  { label: 'Hem', to: '/' },
  { label: 'Kundalini', to: '/kundalini' },
  { label: 'Schema', to: '/schema' },
  { label: 'Kontakt', to: '/kontakt' },
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-surface-cream">
    <!-- Header - clean, ljus -->
    <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-surface-muted/30">
      <div class="container-yoga">
        <nav class="flex items-center justify-between h-16">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="w-9 h-9 rounded-full bg-kundalini-green-pale flex items-center justify-center group-hover:bg-kundalini-green-light transition-colors">
              <span class="text-kundalini-green text-lg">✦</span>
            </div>
            <span class="font-semibold text-text-primary">
              Yoga i Tungelsta
            </span>
          </NuxtLink>

          <!-- Desktop Nav -->
          <div class="hidden md:flex items-center gap-6">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="text-text-secondary hover:text-kundalini-green-dark transition-colors text-sm font-medium"
              active-class="!text-kundalini-green-dark"
            >
              {{ item.label }}
            </NuxtLink>
            <a
              href="https://coregym.club/bli-medlem"
              target="_blank"
              class="btn-primary !py-2.5 !px-5 !min-h-0 text-sm"
            >
              Bli medlem
            </a>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="isMenuOpen = !isMenuOpen"
            class="md:hidden w-10 h-10 flex items-center justify-center text-text-primary rounded-full hover:bg-surface-warm transition-colors"
            aria-label="Meny"
          >
            <svg v-if="!isMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </nav>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div v-if="isMenuOpen" class="md:hidden bg-white border-t border-surface-muted/30">
          <div class="container-yoga py-4 space-y-1">
            <NuxtLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              class="block py-3 px-4 text-text-secondary hover:text-kundalini-green-dark hover:bg-kundalini-green-pale rounded-2xl transition-all font-medium"
              active-class="!text-kundalini-green-dark bg-kundalini-green-pale"
            >
              {{ item.label }}
            </NuxtLink>
            <div class="pt-3">
              <a
                href="https://coregym.club/bli-medlem"
                target="_blank"
                class="btn-primary w-full text-center"
              >
                Bli medlem
              </a>
            </div>
          </div>
        </div>
      </Transition>
    </header>

    <!-- Main Content -->
    <main class="flex-1 pt-16">
      <slot />
    </main>

    <!-- Footer - enkel, ljus -->
    <footer class="bg-white border-t border-surface-muted/30">
      <div class="container-yoga py-12">
        <div class="grid gap-8 md:grid-cols-3">
          <!-- Om -->
          <div>
            <div class="flex items-center gap-2 mb-3">
              <div class="w-8 h-8 rounded-full bg-kundalini-green-pale flex items-center justify-center">
                <span class="text-kundalini-green">✦</span>
              </div>
              <span class="font-semibold text-text-primary">Yoga i Tungelsta</span>
            </div>
            <p class="text-body-sm">
              Kundalini, Yin och mer i en vacker gammal träkyrka.
            </p>
          </div>

          <!-- Navigation -->
          <div>
            <h4 class="font-semibold text-text-primary mb-3">Sidor</h4>
            <ul class="space-y-2">
              <li v-for="item in navItems" :key="item.to">
                <NuxtLink :to="item.to" class="text-body-sm hover:text-kundalini-green-dark transition-colors">
                  {{ item.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Kontakt -->
          <div>
            <h4 class="font-semibold text-text-primary mb-3">Plats</h4>
            <p class="text-body-sm">
              Gamla Café Medmig<br>
              <span class="text-text-muted">(fd Pingstkyrkan)</span><br>
              Rosvägen 2, Tungelsta
            </p>
            <p class="text-body-sm mt-3">
              Ingår i medlemskap hos
              <a href="https://coregym.club" target="_blank" class="text-kundalini-green-dark hover:underline">
                Core Gym Club
              </a>
            </p>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-10 pt-6 border-t border-surface-muted/30 text-center">
          <p class="text-body-sm">&copy; {{ new Date().getFullYear() }} Yoga i Tungelsta</p>
        </div>
      </div>
    </footer>
  </div>
</template>
