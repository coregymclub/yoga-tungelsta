<script setup lang="ts">
useHead({
  title: 'Mari Vuorela - Kundalini Yoga',
  meta: [
    { name: 'description', content: 'Mari Vuorela - Kundalini yogalärare sedan 1994. Yoga med värme, närvaro och kraft.' }
  ]
})
</script>

<template>
  <div>
    <!-- Hero - Personlig, varm lavendel -->
    <section class="min-h-screen flex items-center bg-gradient-lavender relative overflow-hidden">
      <div class="absolute top-20 right-10 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
      <div class="absolute bottom-10 left-10 w-64 h-64 bg-yoga-green/20 rounded-full blur-3xl"></div>

      <div class="container-yoga py-20 relative z-10">
        <div class="max-w-3xl mx-auto text-center">
          <!-- Profilbild -->
          <div class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mx-auto mb-8 ring-4 ring-white/50 shadow-2xl">
            <img
              src="/images/instructor.png"
              alt="Mari Vuorela"
              class="w-full h-full object-cover"
            />
          </div>

          <h1 class="heading-xl text-text-primary mb-4">
            Mari Vuorela
          </h1>
          <p class="text-2xl md:text-3xl text-yoga-green-dark font-semibold mb-6">
            Kundalini Yoga
          </p>
          <p class="text-body text-xl max-w-lg mx-auto">
            Yogalärare sedan 1994. Jag leder yoga med värme, närvaro och kraft.
          </p>
        </div>
      </div>
    </section>

    <!-- Om Mari -->
    <section class="section-padding bg-white">
      <div class="container-yoga">
        <div class="max-w-2xl mx-auto">
          <h2 class="heading-lg text-text-primary mb-8 text-center">Min resa</h2>

          <div class="prose prose-lg text-body space-y-6">
            <p class="text-xl leading-relaxed">
              Kundalini yoga kom in i mitt liv 1994 och har sedan dess varit min dagliga följeslagare.
              Det är en kraftfull yogaform som kombinerar andning, rörelse, meditation och mantra.
            </p>

            <p class="text-xl leading-relaxed">
              För mig handlar yoga om att hitta hem till sig själv. Att stanna upp, känna efter,
              och möta det som är. I mina klasser skapar vi ett tryggt rum där du får vara precis
              som du är.
            </p>

            <p class="text-xl leading-relaxed">
              Jag undervisar i den vackra gamla träkyrkan i Tungelsta – en plats med själ och värme
              som passar perfekt för yoga och meditation.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Citat / Budskap -->
    <section class="py-20 md:py-28 bg-yoga-lavender-light">
      <div class="container-yoga">
        <blockquote class="max-w-2xl mx-auto text-center">
          <p class="text-2xl md:text-3xl text-text-primary font-medium leading-relaxed italic">
            "Kundalini yoga väcker din inre kraft och hjälper dig att leva mer medvetet,
            mer närvarande, mer du."
          </p>
          <footer class="mt-6 text-yoga-green-dark font-semibold text-lg">
            — Mari
          </footer>
        </blockquote>
      </div>
    </section>

    <!-- Aktuellt / Maris space -->
    <section class="section-padding bg-surface-cream">
      <div class="container-yoga">
        <h2 class="heading-lg text-text-primary mb-10 text-center">Aktuellt</h2>

        <div class="max-w-2xl mx-auto space-y-6">
          <!-- Här kan Mari lägga sina uppdateringar -->
          <div class="card p-8">
            <p class="text-text-muted mb-2 font-medium">Januari 2026</p>
            <h3 class="font-bold text-text-primary text-xl mb-3">Välkommen till ett nytt år!</h3>
            <p class="text-body text-lg">
              Nytt år, nya möjligheter. Jag ser fram emot att träffa dig på mattan!
              Schemat är uppdaterat och vi kör som vanligt på onsdagar och söndagar.
            </p>
          </div>

          <div class="card p-8">
            <p class="text-text-muted mb-2 font-medium">Tips</p>
            <h3 class="font-bold text-text-primary text-xl mb-3">Första gången?</h3>
            <p class="text-body text-lg">
              Kom gärna 10 minuter innan så vi hinner prata lite. Ta med bekväma kläder
              och en öppen inställning – mer behövs inte. Mattor och filtar finns på plats.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Kontakt -->
    <section class="section-padding bg-white">
      <div class="container-yoga">
        <div class="max-w-xl mx-auto text-center">
          <h2 class="heading-lg text-text-primary mb-6">Kontakta mig</h2>
          <p class="text-body text-xl mb-8">
            Har du frågor om yoga eller vill boka en privat session? Hör av dig!
          </p>

          <a
            href="mailto:mari.vuorela@icloud.com"
            class="btn-primary text-lg px-10 py-5 inline-flex items-center gap-3"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            mari.vuorela@icloud.com
          </a>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="py-20 md:py-28 bg-gradient-lavender">
      <div class="container-yoga text-center">
        <h2 class="heading-lg text-text-primary mb-6">
          Ses på mattan?
        </h2>
        <p class="text-body text-xl mb-10 max-w-lg mx-auto">
          Kolla schemat och hitta ett pass som passar dig.
        </p>
        <NuxtLink to="/schema" class="btn-primary text-lg px-10 py-5">
          Se schema
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
