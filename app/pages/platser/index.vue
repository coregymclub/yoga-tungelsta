<script setup lang="ts">
import { LOCATIONS } from '~/composables/useYogaSchedule'

useHead({
  title: 'Platser - Core Gym Yoga',
  meta: [
    { name: 'description', content: 'Yoga på två unika platser i Haninge - Tungelsta och Vegastaden.' }
  ]
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-hero relative overflow-hidden">
      <!-- Decorative -->
      <div class="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-sage-200/30 rounded-full blur-[100px]" />
      <div class="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-terra-200/20 rounded-full blur-[80px]" />

      <div class="container-yoga relative z-10 text-center">
        <p class="text-label-sm text-sage-500 mb-4">VÄLJ DIN PLATS</p>
        <h1 class="text-display-lg text-forest mb-6">Våra platser</h1>
        <p class="text-body-xl text-sage-600 max-w-lg mx-auto">
          Yoga i Haninge på två unika platser – välj den som passar dig bäst
        </p>
      </div>
    </section>

    <!-- Locations -->
    <section class="section bg-white">
      <div class="container-yoga">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Tungelsta -->
          <NuxtLink to="/platser/tungelsta" class="group">
            <div class="rounded-4xl overflow-hidden aspect-[4/3] mb-6 relative">
              <img
                :src="LOCATIONS.tungelsta.image"
                :alt="LOCATIONS.tungelsta.name"
                class="w-full h-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-105"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div class="chip mb-4">Träkyrkan</div>
            <h2 class="text-heading-lg text-forest mb-3 group-hover:text-sage-700 transition-colors">
              {{ LOCATIONS.tungelsta.name }}
            </h2>
            <p class="text-sage-600 text-body mb-2">{{ LOCATIONS.tungelsta.description }}</p>
            <p class="text-sage-400 text-body-sm">{{ LOCATIONS.tungelsta.address }}</p>
          </NuxtLink>

          <!-- Vegastaden -->
          <NuxtLink to="/platser/vegastaden" class="group">
            <div class="rounded-4xl overflow-hidden aspect-[4/3] mb-6 bg-gradient-to-br from-terra-50 to-cream-100 flex items-center justify-center">
              <div class="text-center">
                <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-terra-100 mb-4">
                  <svg class="w-8 h-8 text-terra-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span class="chip-terra">Kommer snart</span>
              </div>
            </div>
            <div class="chip-terra mb-4">Modern yogasal</div>
            <h2 class="text-heading-lg text-forest mb-3 group-hover:text-terra-600 transition-colors">
              {{ LOCATIONS.vegastaden.name }}
            </h2>
            <p class="text-sage-600 text-body mb-2">{{ LOCATIONS.vegastaden.description }}</p>
            <p class="text-sage-400 text-body-sm">{{ LOCATIONS.vegastaden.address }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section bg-sage-50">
      <div class="container-narrow text-center">
        <h2 class="text-display text-forest mb-6">Redo att prova yoga?</h2>
        <p class="text-body-xl text-sage-700 max-w-md mx-auto mb-10">
          Se schemat och boka ditt första pass
        </p>
        <NuxtLink to="/schema" class="btn-primary">
          Se schema
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
