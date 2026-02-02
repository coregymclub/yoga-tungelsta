<script setup lang="ts">
const { user, isLoggedIn, isLoading, checkAuth, logout, punchCards, totalPunchesLeft, getInitials, refreshPunchCards } = useAuth()

useHead({
  title: 'Min profil - Yoga i Tungelsta'
})

onMounted(async () => {
  await checkAuth()

  // Redirect to login if not logged in
  if (!isLoggedIn.value) {
    navigateTo('/login')
  }
})

const handleLogout = async () => {
  await logout()
}

// Format date nicely
function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })
}
</script>

<template>
  <div class="min-h-screen bg-surface-cream">
    <!-- Hero -->
    <section class="bg-gradient-lavender py-12 md:py-20">
      <div class="container-yoga">
        <!-- Loading -->
        <div v-if="isLoading" class="text-center py-12">
          <div class="w-10 h-10 border-2 border-yoga-green border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>

        <!-- Profile header -->
        <div v-else-if="user" class="text-center">
          <!-- Avatar -->
          <div class="w-24 h-24 rounded-full bg-white flex items-center justify-center mx-auto mb-6 ring-4 ring-white/50 shadow-xl">
            <span class="text-yoga-green text-3xl font-bold">
              {{ getInitials(user.firstname, user.lastname) }}
            </span>
          </div>

          <h1 class="heading-lg text-text-primary mb-2">
            {{ user.firstname }} {{ user.lastname }}
          </h1>
          <p class="text-body text-lg">{{ user.email }}</p>
        </div>
      </div>
    </section>

    <!-- Content -->
    <section class="section-padding" v-if="user">
      <div class="container-yoga">
        <div class="max-w-lg mx-auto space-y-6">

          <!-- Punch Card Balance - Hero Card -->
          <div class="card-green p-8 text-center">
            <div class="w-16 h-16 rounded-full bg-yoga-green flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-2xl">{{ totalPunchesLeft }}</span>
            </div>
            <h2 class="heading-md text-text-primary mb-2">
              {{ totalPunchesLeft === 1 ? 'klipp kvar' : 'klipp kvar' }}
            </h2>
            <p class="text-body">
              {{ totalPunchesLeft > 0 ? 'Använd ditt klippkort för att droppa in på yoga.' : 'Ditt klippkort är slut. Köp ett nytt för att fortsätta.' }}
            </p>

            <!-- Buy new punch card if empty -->
            <a
              v-if="totalPunchesLeft === 0"
              href="https://coregymclub.zoezi.se/webshop"
              target="_blank"
              class="btn-primary mt-6 inline-flex items-center gap-2"
            >
              Köp nytt klippkort
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <!-- Punch Cards List -->
          <div v-if="punchCards.length > 0" class="space-y-3">
            <h3 class="font-bold text-text-primary text-lg">Dina klippkort</h3>
            <div
              v-for="card in punchCards"
              :key="card.id"
              class="card p-5"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-text-primary">{{ card.cardtype_name }}</span>
                <span class="chip !py-1.5 !px-3 text-sm">
                  {{ card.usesLeft || 0 }} klipp
                </span>
              </div>
              <p class="text-body-sm">
                Giltigt t.o.m. {{ formatDate(card.validToDate) }}
              </p>
            </div>
          </div>

          <!-- No punch cards -->
          <div v-else class="card p-8 text-center">
            <div class="w-14 h-14 rounded-full bg-yoga-green-pale flex items-center justify-center mx-auto mb-4">
              <svg class="w-7 h-7 text-yoga-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 class="font-bold text-text-primary text-xl mb-2">Inget klippkort</h3>
            <p class="text-body mb-6">
              Köp ett klippkort för att komma igång med yoga.
            </p>
            <a
              href="https://coregymclub.zoezi.se/webshop"
              target="_blank"
              class="btn-primary inline-flex items-center gap-2"
            >
              Köp klippkort
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <!-- Quick Actions -->
          <div class="space-y-3">
            <h3 class="font-bold text-text-primary text-lg">Snabblänkar</h3>

            <NuxtLink to="/schema" class="card card-hover p-5 flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-yoga-green-pale flex items-center justify-center">
                <svg class="w-6 h-6 text-yoga-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="flex-1">
                <div class="font-bold text-text-primary">Se schema</div>
                <div class="text-body-sm">Hitta nästa yogapass</div>
              </div>
              <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>

            <a
              href="https://coregymclub.zoezi.se/webshop"
              target="_blank"
              class="card card-hover p-5 flex items-center gap-4"
            >
              <div class="w-12 h-12 rounded-2xl bg-yoga-gold-light flex items-center justify-center">
                <svg class="w-6 h-6 text-yoga-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div class="flex-1">
                <div class="font-bold text-text-primary">Köp klippkort</div>
                <div class="text-body-sm">Webbshop hos Core Gym</div>
              </div>
              <svg class="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          <!-- Logout -->
          <button
            class="w-full py-4 rounded-xl bg-white border border-surface-muted text-red-600 font-semibold hover:bg-red-50 transition-colors"
            @click="handleLogout"
          >
            Logga ut
          </button>

        </div>
      </div>
    </section>
  </div>
</template>
