<script setup lang="ts">
// Root component
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>

  <!-- SVG Filters for Liquid Glass Effect -->
  <svg style="position: absolute; width: 0; height: 0; overflow: hidden;">
    <defs>
      <!-- Liquid glass distortion - more visible effect -->
      <filter id="liquid-glass" x="-50%" y="-50%" width="200%" height="200%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01 0.01"
          numOctaves="2"
          seed="5"
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="blurred"
          scale="35"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>

      <!-- Stronger glass for cards -->
      <filter id="liquid-glass-strong" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01 0.01"
          numOctaves="2"
          seed="92"
          result="noise"
        />
        <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="blurred"
          scale="25"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </defs>
  </svg>
</template>
