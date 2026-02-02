<script setup lang="ts">
useHead({
  title: 'Kontakt - Yoga i Tungelsta',
  meta: [
    { name: 'description', content: 'Kontakta oss för frågor om yoga i Tungelsta.' }
  ]
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-green py-16 md:py-24">
      <div class="container-yoga">
        <div class="chip mb-6">
          <span class="text-yoga-green">✦</span>
          Kontakt
        </div>
        <h1 class="heading-xl text-text-primary mb-4">
          Hör av dig
        </h1>
        <p class="text-body max-w-lg">
          Har du frågor om yoga i Tungelsta?
          Du är varmt välkommen att höra av dig.
        </p>
      </div>
    </section>

    <!-- Kontakt-info -->
    <section class="section-padding bg-surface-cream">
      <div class="container-yoga">
        <div class="grid sm:grid-cols-2 gap-4">
          <!-- Mari -->
          <div class="card">
            <div class="w-20 h-20 rounded-2xl overflow-hidden mb-4">
              <img
                src="/images/instructor.png"
                alt="Mari Vuorela"
                class="w-full h-full object-cover"
              />
            </div>
            <h3 class="font-semibold text-text-primary mb-1">Mari Vuorela</h3>
            <p class="text-yoga-green-dark text-sm mb-3">Kundalini Yoga</p>
            <p class="text-body-sm mb-4">
              Yogalärare sedan 1994. Frågor om Kundalini Yoga?
            </p>
            <div class="space-y-2">
              <a
                href="mailto:mari.vuorela@icloud.com"
                class="flex items-center gap-2 text-yoga-green-dark font-medium hover:underline text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                mari.vuorela@icloud.com
              </a>
              <a
                href="tel:+46706112777"
                class="flex items-center gap-2 text-yoga-green-dark font-medium hover:underline text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                070-611 27 77
              </a>
            </div>
          </div>

          <!-- Plats -->
          <div class="card">
            <div class="w-12 h-12 rounded-2xl bg-yoga-green-pale flex items-center justify-center mb-4">
              <svg class="w-6 h-6 text-yoga-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 class="font-semibold text-text-primary mb-1">Plats</h3>
            <p class="text-body-sm mb-4">
              Gamla Café Medmig<br>
              <span class="text-text-muted">(fd Pingstkyrkan)</span><br>
              Rosvägen 2, 137 91 Tungelsta
            </p>
            <a
              href="https://maps.apple.com/?address=Rosvagen%202,%20137%2091%20Tungelsta,%20Sweden"
              target="_blank"
              class="inline-flex items-center gap-2 text-yoga-green-dark font-medium hover:underline text-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Öppna i kartor
            </a>
          </div>
        </div>

        <!-- Medlemskap-info -->
        <div class="card-green mt-6">
          <h3 class="font-semibold text-text-primary mb-3">Om medlemskap</h3>
          <p class="text-body mb-4">
            All yoga i Tungelsta ingår i medlemskapet hos Core Gym Club.
            För frågor om medlemskap, priser och betalning, kontakta
            Core Gym Club direkt.
          </p>
          <div class="flex flex-col sm:flex-row gap-3">
            <a
              href="https://coregym.club/bli-medlem"
              target="_blank"
              class="btn-primary"
            >
              Bli medlem
            </a>
            <a
              href="https://coregym.club/kontakt"
              target="_blank"
              class="btn-secondary"
            >
              Kontakta Core Gym Club
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section-padding bg-white">
      <div class="container-yoga">
        <h2 class="heading-lg text-text-primary mb-6 text-center">Vanliga frågor</h2>

        <div class="max-w-2xl mx-auto space-y-3">
          <div class="card">
            <h3 class="font-semibold text-text-primary mb-2">
              Behöver jag vara medlem för att delta?
            </h3>
            <p class="text-body-sm">
              Ja, yogan ingår i medlemskapet hos Core Gym Club.
              Du kan enkelt bli medlem via deras hemsida.
            </p>
          </div>

          <div class="card">
            <h3 class="font-semibold text-text-primary mb-2">
              Behöver jag boka plats?
            </h3>
            <p class="text-body-sm">
              Nej, du behöver inte boka. Kom bara till passet i god tid.
            </p>
          </div>

          <div class="card">
            <h3 class="font-semibold text-text-primary mb-2">
              Jag har aldrig provat yoga, kan jag ändå komma?
            </h3>
            <p class="text-body-sm">
              Absolut! Våra pass passar alla, oavsett tidigare erfarenhet.
              Alla övningar kan anpassas efter din nivå.
            </p>
          </div>

          <div class="card">
            <h3 class="font-semibold text-text-primary mb-2">
              Vad ska jag ha på mig?
            </h3>
            <p class="text-body-sm">
              Bekväma, löst sittande kläder som du kan röra dig fritt i.
              Gärna i naturmaterial.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
