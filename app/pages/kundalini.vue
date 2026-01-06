<script setup lang="ts">
useHead({
  title: 'Kundalini Yoga - Yoga i Tungelsta',
  meta: [
    { name: 'description', content: 'Kundalini Yoga med Mari Vuorela i Tungelsta. En kraftfull och rolig yogaform som arbetar igenom alla dina dimensioner.' }
  ]
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-gradient-green py-16 md:py-24">
      <div class="container-yoga">
        <div class="chip mb-6">
          <span class="text-kundalini-green">✦</span>
          Om Kundalini
        </div>
        <h1 class="heading-xl text-text-primary mb-4">
          Medvetenhetens yoga
        </h1>
        <p class="text-body max-w-lg">
          Kundalini Yoga är en kraftfull yogaform som kombinerar fysiska övningar,
          andningstekniker, meditation och mantra för att väcka din inre energi.
        </p>
      </div>
    </section>

    <!-- Vad är Kundalini -->
    <section class="section-padding bg-surface-cream">
      <div class="container-yoga">
        <div class="max-w-2xl">
          <h2 class="heading-lg text-text-primary mb-6">Vad är Kundalini?</h2>

          <div class="space-y-4">
            <p class="text-body">
              Kundalini är ett sanskrit-ord som betyder "den upprullade". Det syftar på
              en sovande energi som enligt yogafilosofin vilar vid basen av ryggraden,
              ofta symboliserad av en orm som ligger upprullad.
            </p>

            <p class="text-body">
              Genom specifika övningar - kriyas - kan denna energi väckas och stiga
              uppåt genom kroppens energicentra (chakran). När kundalini-energin flödar
              fritt upplever man ökad vitalitet, klarhet och inre frid.
            </p>
          </div>

          <div class="card-green mt-8">
            <p class="text-body italic text-center">
              "Kundalini Yoga är den snabbaste vägen till att etablera en relation
              med ditt medvetande."
            </p>
            <p class="text-center text-text-muted text-sm mt-3">
              — Yogi Bhajan
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Ett typiskt pass -->
    <section class="section-padding bg-white">
      <div class="container-yoga">
        <div class="text-center mb-10">
          <h2 class="heading-lg text-text-primary mb-3">Ett typiskt pass</h2>
          <p class="text-body max-w-lg mx-auto">
            Ett Kundalini Yoga-pass är en resa genom flera moment som tillsammans
            skapar en djup upplevelse.
          </p>
        </div>

        <div class="max-w-2xl mx-auto space-y-4">
          <!-- Steg 1 -->
          <div class="card flex gap-5">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-kundalini-green-pale flex items-center justify-center">
              <span class="text-kundalini-green-dark font-bold">1</span>
            </div>
            <div>
              <h3 class="font-semibold text-text-primary mb-1">Öppning</h3>
              <p class="text-body-sm">
                Vi börjar med Adi Mantra för att ansluta till den inre visheten och skapa ett heligt rum.
              </p>
            </div>
          </div>

          <!-- Steg 2 -->
          <div class="card flex gap-5">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-kundalini-green-pale flex items-center justify-center">
              <span class="text-kundalini-green-dark font-bold">2</span>
            </div>
            <div>
              <h3 class="font-semibold text-text-primary mb-1">Uppvärmning</h3>
              <p class="text-body-sm">
                Mjuka övningar för att värma upp kroppen och förbereda den för dagens kriya.
              </p>
            </div>
          </div>

          <!-- Steg 3 -->
          <div class="card flex gap-5">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-kundalini-green-pale flex items-center justify-center">
              <span class="text-kundalini-green-dark font-bold">3</span>
            </div>
            <div>
              <h3 class="font-semibold text-text-primary mb-1">Kriya</h3>
              <p class="text-body-sm">
                Huvudmomentet - en serie övningar och andningstekniker som arbetar på ett specifikt tema.
              </p>
            </div>
          </div>

          <!-- Steg 4 -->
          <div class="card flex gap-5">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-kundalini-green-pale flex items-center justify-center">
              <span class="text-kundalini-green-dark font-bold">4</span>
            </div>
            <div>
              <h3 class="font-semibold text-text-primary mb-1">Djup avslappning</h3>
              <p class="text-body-sm">
                En stund av total vila där kroppen integrerar effekterna av övningarna.
              </p>
            </div>
          </div>

          <!-- Steg 5 -->
          <div class="card flex gap-5">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-kundalini-green-pale flex items-center justify-center">
              <span class="text-kundalini-green-dark font-bold">5</span>
            </div>
            <div>
              <h3 class="font-semibold text-text-primary mb-1">Meditation</h3>
              <p class="text-body-sm">
                Guidad meditation, ofta med mantra, för att fördjupa upplevelsen.
              </p>
            </div>
          </div>

          <!-- Steg 6 -->
          <div class="card flex gap-5">
            <div class="flex-shrink-0 w-10 h-10 rounded-full bg-kundalini-green-pale flex items-center justify-center">
              <span class="text-kundalini-green-dark font-bold">6</span>
            </div>
            <div>
              <h3 class="font-semibold text-text-primary mb-1">Avslutning</h3>
              <p class="text-body-sm">
                Vi avslutar med "Sat Nam" och välsignelsesången "Long Time Sun".
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- För vem -->
    <section class="section-padding bg-surface-cream">
      <div class="container-yoga">
        <div class="max-w-2xl mx-auto">
          <h2 class="heading-lg text-text-primary mb-6">Passar det för mig?</h2>

          <p class="text-body mb-6">
            <strong>Ja!</strong> Kundalini Yoga passar alla, oavsett ålder,
            fysisk kondition eller tidigare erfarenhet av yoga.
          </p>

          <div class="grid grid-cols-2 gap-3">
            <div class="card text-center">
              <h4 class="font-semibold text-text-primary mb-1">Nybörjare</h4>
              <p class="text-body-sm">Ingen förkunskap krävs</p>
            </div>
            <div class="card text-center">
              <h4 class="font-semibold text-text-primary mb-1">Erfarna</h4>
              <p class="text-body-sm">Fördjupa din praktik</p>
            </div>
            <div class="card text-center">
              <h4 class="font-semibold text-text-primary mb-1">Stressade</h4>
              <p class="text-body-sm">Hitta inre lugn</p>
            </div>
            <div class="card text-center">
              <h4 class="font-semibold text-text-primary mb-1">Sökare</h4>
              <p class="text-body-sm">Utforska din inre värld</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vad ta med -->
    <section class="section-padding bg-white">
      <div class="container-yoga">
        <div class="max-w-2xl mx-auto">
          <h2 class="heading-md text-text-primary mb-6 text-center">Vad ska jag ta med?</h2>

          <div class="grid sm:grid-cols-2 gap-4">
            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-kundalini-green-pale flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-kundalini-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-text-primary">Bekväma kläder</h4>
                <p class="text-body-sm">Löst sittande, gärna i naturmaterial</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-kundalini-green-pale flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-kundalini-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-text-primary">Vattenflaska</h4>
                <p class="text-body-sm">Håll dig hydrerad</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-kundalini-green-pale flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-kundalini-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-text-primary">Yogamatta</h4>
                <p class="text-body-sm">Finns att låna på plats</p>
              </div>
            </div>

            <div class="flex items-start gap-3">
              <div class="w-8 h-8 rounded-full bg-kundalini-green-pale flex items-center justify-center flex-shrink-0">
                <svg class="w-4 h-4 text-kundalini-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h4 class="font-medium text-text-primary">Öppet sinne</h4>
                <p class="text-body-sm">Var nyfiken och tillåtande</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mari -->
    <section class="section-padding bg-white">
      <div class="container-yoga">
        <div class="max-w-2xl mx-auto">
          <div class="card flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <div class="w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src="/images/instructor.png"
                alt="Mari Vuorela"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="text-center sm:text-left">
              <h3 class="font-semibold text-text-primary mb-1">Mari Vuorela</h3>
              <p class="text-kundalini-green-dark text-sm mb-3">Yogalärare sedan 1994</p>
              <p class="text-body-sm mb-4">
                Kundaliniyoga är en kraftfull och rolig yogaform. Kraftfull på så sätt att den
                arbetar igenom alla dina dimensioner: kroppen, dess muskler, nervbanor och
                funktioner. Ditt mentala välbefinnande genom att avlägsna stress.
              </p>
              <p class="text-body-sm mb-4">
                Huvudsyftet är att ge dig en upplevelse av vitalitet och samtidigt en djup vila,
                en känsla av att vara levande.
              </p>
              <a
                href="mailto:mari.vuorela@icloud.com"
                class="inline-flex items-center gap-2 text-kundalini-green-dark font-medium hover:underline text-sm"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                mari.vuorela@icloud.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Omdömen -->
    <section class="section-padding bg-surface-cream">
      <div class="container-yoga">
        <h2 class="heading-md text-text-primary mb-6 text-center">Vad deltagare säger</h2>

        <div class="max-w-2xl mx-auto space-y-4">
          <div class="card">
            <p class="text-body italic mb-3">
              "Andningen, utrensningen. Har givit mig lugn."
            </p>
          </div>
          <div class="card">
            <p class="text-body italic mb-3">
              "Att jag nu vet vad jag anade – att jag aktivt behöver och kan finna hjärn-ro."
            </p>
          </div>
          <div class="card">
            <p class="text-body italic mb-3">
              "Väldigt, väldigt behagligt, närvarande utan att tränga sig på. Väldigt bra med
              rationella beskrivningar till varför vi gör olika övningar – ökar motivationen."
            </p>
          </div>
          <div class="card">
            <p class="text-body italic mb-3">
              "Mycket bra, alltid trevligt att gå dit! Lätt att förstå."
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section-padding bg-white">
      <div class="container-yoga text-center">
        <h2 class="heading-md text-text-primary mb-4">Redo att prova?</h2>
        <p class="text-body max-w-md mx-auto mb-6">
          Kolla in vårt schema och hitta en tid som passar dig.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-3">
          <NuxtLink to="/schema" class="btn-primary">
            Se schema
          </NuxtLink>
          <a href="https://coregym.club/bli-medlem" target="_blank" class="btn-secondary">
            Bli medlem
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
