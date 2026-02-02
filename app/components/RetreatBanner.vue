<script setup lang="ts">
/**
 * RetreatBanner - Promotional banner for the yoga retreat
 * Displays above the main content with a subtle, elegant design
 */

const dismissed = ref(false)

// Check if user has dismissed the banner
onMounted(() => {
  if (typeof localStorage !== 'undefined') {
    dismissed.value = localStorage.getItem('retreat-banner-dismissed') === 'true'
  }
})

function dismiss() {
  dismissed.value = true
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('retreat-banner-dismissed', 'true')
  }
}
</script>

<template>
  <div v-if="!dismissed" class="retreat-banner">
    <NuxtLink to="/retreat" class="banner-content">
      <div class="banner-inner">
        <span class="banner-badge">22 mars</span>
        <span class="banner-text">
          <strong>From Darkness to Light</strong> – Yoga retreat på Core Annexet
        </span>
        <span class="banner-cta">
          Läs mer
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </NuxtLink>
    <button @click.prevent="dismiss" class="banner-close" aria-label="Stäng">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.retreat-banner {
  position: relative;
  background: linear-gradient(135deg, #2d3a2d 0%, #3d4a3d 50%, #4a5a4a 100%);
  color: #faf8f5;
  overflow: hidden;
}

.retreat-banner::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 50%, rgba(212, 165, 116, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 80% 50%, rgba(196, 132, 106, 0.1) 0%, transparent 50%);
  pointer-events: none;
}

.banner-content {
  display: flex;
  justify-content: center;
  padding: 0.875rem 3rem 0.875rem 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: background 0.3s ease;
}

.banner-content:hover {
  background: rgba(255, 255, 255, 0.05);
}

.banner-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.banner-badge {
  background: rgba(212, 165, 116, 0.2);
  border: 1px solid rgba(212, 165, 116, 0.3);
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #d4a574;
}

.banner-text {
  font-size: 0.9rem;
  color: rgba(250, 248, 245, 0.9);
}

.banner-text strong {
  color: #faf8f5;
  font-weight: 600;
}

.banner-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: #d4a574;
  transition: gap 0.2s ease;
}

.banner-content:hover .banner-cta {
  gap: 0.5rem;
}

.banner-close {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  padding: 0.5rem;
  color: rgba(250, 248, 245, 0.5);
  transition: color 0.2s ease;
  background: none;
  border: none;
  cursor: pointer;
}

.banner-close:hover {
  color: rgba(250, 248, 245, 0.9);
}

@media (max-width: 640px) {
  .banner-content {
    padding: 0.75rem 2.5rem 0.75rem 1rem;
  }

  .banner-inner {
    gap: 0.5rem;
  }

  .banner-text {
    font-size: 0.8rem;
  }

  .banner-cta {
    display: none;
  }
}
</style>
