<script setup lang="ts">
useHead({
  title: 'Bli medlem - Core Gym Yoga',
  meta: [
    { name: 'description', content: 'Bli medlem och få tillgång till all yoga på Core Gym. Kundalini, Yin och mer i Tungelsta och Vegastaden.' }
  ]
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative min-h-[50vh] flex items-center bg-gradient-to-b from-sage-50 to-cream-50 pt-24 md:pt-32">
      <div class="container-yoga text-center">
        <h1 class="text-display-lg text-forest mb-6">Bli medlem</h1>
        <p class="text-body-xl text-sage-700 max-w-xl mx-auto">
          All yoga ingår i ditt medlemskap hos Core Gym Club
        </p>
      </div>
    </section>

    <!-- Membership options -->
    <section class="section bg-white">
      <div class="container-yoga">
        <div class="max-w-4xl mx-auto">
          <!-- Main membership -->
          <div class="card p-8 md:p-10 mb-8 border-2 border-sage-200">
            <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div>
                <span class="chip mb-4">Rekommenderas</span>
                <h2 class="text-heading-lg text-forest">Core Gym Medlemskap</h2>
              </div>
              <div class="text-right">
                <p class="text-display text-forest">349 kr</p>
                <p class="text-sage-500">per månad</p>
              </div>
            </div>

            <ul class="grid sm:grid-cols-2 gap-4 mb-8">
              <li class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-sage-700">Obegränsad yoga</span>
              </li>
              <li class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-sage-700">Tungelsta & Vegastaden</span>
              </li>
              <li class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-sage-700">Gym & gruppträning ingår</span>
              </li>
              <li class="flex items-center gap-3">
                <div class="w-6 h-6 rounded-full bg-sage-100 flex items-center justify-center flex-shrink-0">
                  <svg class="w-4 h-4 text-sage-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span class="text-sage-700">Friskvårdsbidrag</span>
              </li>
            </ul>

            <a
              href="https://z.coregym.club/memberships"
              target="_blank"
              class="btn-primary w-full md:w-auto"
            >
              Bli medlem nu
            </a>
          </div>

          <!-- Alternative options -->
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Klippkort -->
            <div class="card p-6">
              <h3 class="text-heading-sm text-forest mb-2">Klippkort</h3>
              <p class="text-sage-600 mb-4">10 pass att använda när du vill</p>
              <p class="text-heading text-forest mb-6">1 200 kr</p>
              <a
                href="https://z.coregym.club/webshop"
                target="_blank"
                class="btn-secondary w-full"
              >
                Köp klippkort
              </a>
            </div>

            <!-- Engångspass -->
            <div class="card p-6">
              <h3 class="text-heading-sm text-forest mb-2">Engångspass</h3>
              <p class="text-sage-600 mb-4">Prova på ett pass</p>
              <p class="text-heading text-forest mb-6">150 kr</p>
              <NuxtLink
                to="/schema"
                class="btn-secondary w-full text-center"
              >
                Boka ett pass
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section bg-cream-50">
      <div class="container-yoga">
        <div class="max-w-2xl mx-auto">
          <h2 class="text-display text-forest text-center mb-12">Vanliga frågor</h2>

          <div class="space-y-6">
            <div class="card p-6">
              <h3 class="text-heading-sm text-forest mb-2">Vad ingår i medlemskapet?</h3>
              <p class="text-sage-600">
                All yoga på båda våra platser (Tungelsta & Vegastaden), plus tillgång till gym och gruppträning på alla Core Gym-anläggningar.
              </p>
            </div>

            <div class="card p-6">
              <h3 class="text-heading-sm text-forest mb-2">Hur säger jag upp?</h3>
              <p class="text-sage-600">
                Du kan säga upp när du vill med två månaders uppsägningstid. Inga krångliga avtal.
              </p>
            </div>

            <div class="card p-6">
              <h3 class="text-heading-sm text-forest mb-2">Kan jag använda friskvårdsbidrag?</h3>
              <p class="text-sage-600">
                Ja! Vi är anslutna till Epassi, Benifex, Edenred och Wellnet.
              </p>
            </div>

            <div class="card p-6">
              <h3 class="text-heading-sm text-forest mb-2">Behöver jag ta med yogamatta?</h3>
              <p class="text-sage-600">
                Nej, vi har mattor att låna på plats. Men du är välkommen att ta med egen om du föredrar det.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section bg-white">
      <div class="container-narrow text-center">
        <h2 class="text-heading-lg text-forest mb-4">Redo att börja?</h2>
        <p class="text-sage-600 mb-8">Börja din yogaresa idag</p>
        <a
          href="https://z.coregym.club/memberships"
          target="_blank"
          class="btn-primary"
        >
          Bli medlem
        </a>
      </div>
    </section>
  </div>
</template>
