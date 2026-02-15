<script setup lang="ts">
/**
 * Familjeyoga - Family yoga event landing page
 * Registration form + event info for kids 4-8 and their grown-ups
 */

const pageTitle = 'Familjeyoga \u2013 Sportlov p\u00e5 Core Annexet | 25 februari'
const pageDesc = 'Familjeyoga under sportlovet! Yogagl\u00e4dje f\u00f6r barn 4-8 \u00e5r med sina vuxna. Onsdag 25 februari kl 16-17 p\u00e5 Core Annexet i Tungelsta.'
const pageUrl = 'https://coregym.yoga/familjeyoga'
const pageImage = 'https://coregym.yoga/images/coregym-annexet.jpg'

useSeoMeta({
  title: pageTitle,
  description: pageDesc,
  ogTitle: pageTitle,
  ogDescription: pageDesc,
  ogUrl: pageUrl,
  ogImage: pageImage,
  ogType: 'website',
  ogSiteName: 'Core Gym Yoga',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDesc,
  twitterImage: pageImage,
})

const formData = ref({
  name: '',
  email: '',
  phone: '',
  numberOfPeople: 2,
  childAge: '',
  message: ''
})
const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

const heroVisible = ref(false)

onMounted(() => {
  setTimeout(() => heroVisible.value = true, 100)
})

async function handleSubmit() {
  if (!formData.value.name.trim()) {
    errorMessage.value = 'Ange ditt namn'
    return
  }
  if (!formData.value.email.trim() && !formData.value.phone.trim()) {
    errorMessage.value = 'Ange e-post eller telefon'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const timestamp = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })
    const contact = formData.value.phone || formData.value.email

    // Send email
    const emailHtml = `
      <h2>🧘 Anmälan: Familjeyoga 25 feb</h2>
      <p><strong>Tid:</strong> ${timestamp}</p>
      <p><strong>Event:</strong> Familjeyoga onsdag 25 februari kl 16-17</p>
      <hr>
      <p><strong>Namn:</strong> ${formData.value.name}</p>
      <p><strong>Antal personer:</strong> ${formData.value.numberOfPeople}</p>
      ${formData.value.childAge ? `<p><strong>Barnets ålder:</strong> ${formData.value.childAge} år</p>` : ''}
      ${formData.value.email ? `<p><strong>E-post:</strong> ${formData.value.email}</p>` : ''}
      ${formData.value.phone ? `<p><strong>Telefon:</strong> ${formData.value.phone}</p>` : ''}
      ${formData.value.message ? `<hr><p><strong>Meddelande:</strong> ${formData.value.message}</p>` : ''}
      <hr>
      <p style="color: #666; font-size: 12px;">Skickat via coregym.yoga/familjeyoga</p>
    `

    await fetch('https://student-email.coregymclub.se/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'info@coregym.yoga',
        subject: `🧘 Familjeyoga: ${formData.value.name} (${formData.value.numberOfPeople} pers)`,
        html: emailHtml,
        replyTo: formData.value.email || undefined
      })
    })

    // Post to teamchat yoga room
    try {
      const peopleText = formData.value.numberOfPeople > 1 ? ` – ${formData.value.numberOfPeople} personer` : ''
      await fetch('https://teamchat.coregym.club/api/terminal/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room: 'yoga',
          message: `🧘 Familjeyoga-anmälan: ${formData.value.name} (${contact})${peopleText}`
        })
      })
    } catch (e) {
      console.error('Teamchat error:', e)
    }

    // Create registration
    try {
      await fetch('https://api.coregym.club/registrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.value.name,
          email: formData.value.email || `familjeyoga-${formData.value.phone}@coregymclub.se`,
          phone: formData.value.phone || null,
          type: 'familjeyoga',
          source: 'web',
          details: {
            event: 'Familjeyoga 25 feb 2026',
            numberOfPeople: formData.value.numberOfPeople,
            childAge: formData.value.childAge || null
          }
        })
      })
    } catch (e) {
      console.error('Registration error:', e)
    }

    isSuccess.value = true
  } catch (error) {
    console.error('Submit error:', error)
    errorMessage.value = 'N\u00e5got gick fel. F\u00f6rs\u00f6k igen eller kontakta oss direkt.'
  } finally {
    isSubmitting.value = false
  }
}

const showCopied = ref(false)

async function sharePage() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: pageTitle,
        text: pageDesc,
        url: pageUrl
      })
      return
    } catch (e) { /* cancelled */ }
  }
  try {
    await navigator.clipboard.writeText(pageUrl)
    showCopied.value = true
    setTimeout(() => showCopied.value = false, 2000)
  } catch (e) {
    window.prompt('Kopiera l\u00e4nken:', pageUrl)
  }
}
</script>

<template>
  <div class="familjeyoga-page">
    <!-- HERO -->
    <section class="hero-section">
      <div class="hero-bg">
        <div class="hero-gradient" />
      </div>

      <div class="hero-content" :class="{ 'hero-visible': heroVisible }">
        <div class="hero-eyebrow">
          <span class="eyebrow-line" />
          <span class="eyebrow-text">SPORTLOV &middot; TUNGELSTA</span>
          <span class="eyebrow-line" />
        </div>

        <h1 class="hero-title">Familjeyoga</h1>
        <p class="hero-subtitle">Yogagl&#228;dje f&#246;r barn 4&#8211;8 &#229;r med sina vuxna</p>

        <p class="hero-date">
          <span class="date-day">25</span>
          <span class="date-divider">/</span>
          <span class="date-month">feb</span>
          <span class="date-time">&middot; kl 16&#8211;17</span>
        </p>

        <div class="hero-actions">
          <a href="#anmalan" class="hero-cta">
            <span>Anm&#228;l dig</span>
            <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
          <button @click="sharePage" class="hero-share" :title="showCopied ? 'Kopierad!' : 'Dela'">
            <svg v-if="!showCopied" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            <svg v-else class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>

    <!-- INFO -->
    <section class="info-section">
      <div class="container-yoga">
        <div class="info-content">
          <p class="info-lead">
            Under sportlovet bjuder vi in till en timme av yoga, lek och avslappning
            f&#246;r hela familjen.
          </p>
          <p class="info-body">
            45 minuters yoga anpassat f&#246;r barn och deras vuxna &#8211; med r&#246;relser,
            lek och sk&#246;na &#246;vningar. Sedan avslutar vi med 15 minuters mysig
            avslappning tillsammans med rainstick och andra lugna ljud.
          </p>
        </div>
      </div>
    </section>

    <!-- DETAILS -->
    <section class="details-section">
      <div class="container-yoga">
        <div class="details-grid">
          <div class="detail-card">
            <div class="detail-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke-width="1.5" />
                <line x1="16" y1="2" x2="16" y2="6" stroke-width="1.5" stroke-linecap="round" />
                <line x1="8" y1="2" x2="8" y2="6" stroke-width="1.5" stroke-linecap="round" />
                <line x1="3" y1="10" x2="21" y2="10" stroke-width="1.5" />
              </svg>
            </div>
            <p class="detail-label">N&#228;r</p>
            <p class="detail-value">Onsdag 25 februari</p>
            <p class="detail-sub">Kl 16:00&#8211;17:00</p>
          </div>

          <div class="detail-card">
            <div class="detail-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p class="detail-label">Var</p>
            <p class="detail-value">Core Annexet</p>
            <p class="detail-sub">Rosv&#228;gen 2, Tungelsta</p>
          </div>

          <div class="detail-card">
            <div class="detail-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p class="detail-label">Instrukt&#246;r</p>
            <p class="detail-value">Mari Vuorela</p>
            <p class="detail-sub">Yoga f&#246;r alla &#229;ldrar</p>
          </div>

          <div class="detail-card">
            <div class="detail-icon-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p class="detail-label">Pris</p>
            <p class="detail-value">Gymkort g&#228;ller</p>
            <p class="detail-sub">Annars 150 kr/person</p>
          </div>
        </div>
      </div>
    </section>

    <!-- WHAT HAPPENS -->
    <section class="program-section">
      <div class="container-yoga">
        <div class="section-header">
          <p class="section-label">PROGRAMMET</p>
          <h2 class="section-title">En timme av yogagl&#228;dje</h2>
        </div>

        <div class="program-cards">
          <div class="program-card">
            <span class="program-time">45 min</span>
            <h3 class="program-title">Yoga &amp; lek</h3>
            <p class="program-desc">
              R&#246;relser och &#246;vningar anpassade f&#246;r barn och vuxna tillsammans.
              Lekfullt, enkelt och gl&#228;djefyllt &#8211; ingen erfarenhet beh&#246;vs!
            </p>
          </div>
          <div class="program-card">
            <span class="program-time">15 min</span>
            <h3 class="program-title">Vila &amp; avslappning</h3>
            <p class="program-desc">
              Mysig avslappning med rainstick och lugna ljud.
              En stund att bara vara stilla tillsammans.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- REGISTRATION FORM -->
    <section id="anmalan" class="form-section">
      <div class="form-bg">
        <div class="form-gradient" />
        <div class="form-pattern" />
      </div>

      <div class="container-yoga form-container">
        <div class="form-header">
          <p class="section-label">BOKA DIN PLATS</p>
          <h2 class="section-title">Anm&#228;lan</h2>
          <p class="form-intro">
            Fyll i formul&#228;ret nedan s&#229; &#228;r du anm&#228;ld.
            Gymkort p&#229; Core Gym Club g&#228;ller &#8211; annars 150 kr per person
            (eng&#229;ngstr&#228;ning).
          </p>
        </div>

        <!-- Success -->
        <div v-if="isSuccess" class="form-success">
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="success-title">Tack f&#246;r din anm&#228;lan!</h3>
          <p class="success-text">
            Vi har tagit emot din anm&#228;lan till familjeyogan 25 februari.
            V&#228;lkommen!
          </p>
          <NuxtLink to="/" class="success-link">
            Tillbaka till startsidan
          </NuxtLink>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="handleSubmit" class="event-form">
          <div v-if="errorMessage" class="form-error">
            {{ errorMessage }}
          </div>

          <div class="form-row form-row-2">
            <div class="form-group">
              <label for="name" class="form-label">
                Namn <span class="required">*</span>
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                autocomplete="name"
                class="form-input"
                placeholder="Ditt namn"
              />
            </div>
            <div class="form-group">
              <label for="numberOfPeople" class="form-label">Antal personer</label>
              <select
                id="numberOfPeople"
                v-model="formData.numberOfPeople"
                class="form-input form-select"
              >
                <option :value="2">2 (1 vuxen + 1 barn)</option>
                <option :value="3">3 personer</option>
                <option :value="4">4 personer</option>
                <option :value="5">5 personer</option>
              </select>
            </div>
          </div>

          <div class="form-row form-row-2">
            <div class="form-group">
              <label for="email" class="form-label">E-post</label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                autocomplete="email"
                class="form-input"
                placeholder="din@epost.se"
              />
            </div>
            <div class="form-group">
              <label for="phone" class="form-label">Telefon</label>
              <input
                id="phone"
                v-model="formData.phone"
                type="tel"
                autocomplete="tel"
                class="form-input"
                placeholder="07X XXX XX XX"
              />
            </div>
          </div>

          <div class="form-row form-row-2">
            <div class="form-group">
              <label for="childAge" class="form-label">Barnets &#229;lder</label>
              <select
                id="childAge"
                v-model="formData.childAge"
                class="form-input form-select"
              >
                <option value="">V&#228;lj</option>
                <option value="4">4 &#229;r</option>
                <option value="5">5 &#229;r</option>
                <option value="6">6 &#229;r</option>
                <option value="7">7 &#229;r</option>
                <option value="8">8 &#229;r</option>
              </select>
            </div>
            <div class="form-group">
              <label for="message" class="form-label">Meddelande (valfritt)</label>
              <input
                id="message"
                v-model="formData.message"
                type="text"
                class="form-input"
                placeholder="Fr&#229;gor eller &#246;nskem&#229;l?"
              />
            </div>
          </div>

          <p class="form-hint">* Ange e-post eller telefon s&#229; vi kan n&#229; dig</p>

          <button type="submit" :disabled="isSubmitting" class="form-submit">
            <span v-if="isSubmitting" class="submit-loading">
              <svg class="spinner" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.25"/>
                <path d="M12 2a10 10 0 0110 10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
              </svg>
              Skickar...
            </span>
            <span v-else>Anm&#228;l dig</span>
          </button>
        </form>
      </div>
    </section>

    <!-- FOOTER -->
    <section class="footer-cta">
      <div class="container-yoga">
        <p class="footer-text">Fr&#229;gor? Kontakta oss p&#229;</p>
        <a href="mailto:info@coregym.yoga" class="footer-email">info@coregym.yoga</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
.familjeyoga-page {
  --color-dark: #1a1915;
  --color-forest: #2d3a2d;
  --color-sage: #8b9e8b;
  --color-sage-light: #c4d4c4;
  --color-cream: #faf8f5;
  --color-cream-dark: #f0ebe3;
  --color-terra: #c4846a;
  --color-gold: #d4a574;
  --color-warm: #e8c9a0;

  --font-display: 'Suisse BP Intl', serif;
  --font-body: 'Neue Montreal', sans-serif;
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
}

/* HERO */
.hero-section {
  position: relative;
  min-height: 80vh;
  min-height: 80svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    160deg,
    #2d3a2d 0%,
    #3d5a3d 30%,
    #4a6a4a 60%,
    #5a7a5a 100%
  );
}

.hero-gradient::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 30% 70%, rgba(232, 201, 160, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 70% 30%, rgba(196, 212, 196, 0.1) 0%, transparent 50%);
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1s var(--ease-smooth);
}

.hero-content.hero-visible {
  opacity: 1;
  transform: translateY(0);
}

.hero-eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.eyebrow-line {
  width: 50px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-sage-light), transparent);
}

.eyebrow-text {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--color-warm);
}

.hero-title {
  font-family: var(--font-display);
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 700;
  color: var(--color-cream);
  line-height: 1;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2.5vw, 1.35rem);
  color: var(--color-sage-light);
  margin-bottom: 2rem;
  opacity: 0.9;
}

.hero-date {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: var(--color-cream);
  margin-bottom: 2.5rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
}

.date-day { font-size: 1.5em; font-weight: 700; }
.date-divider { opacity: 0.4; }
.date-month { text-transform: lowercase; }
.date-time { opacity: 0.6; font-size: 0.8em; }

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 2.5rem;
  background: linear-gradient(135deg, var(--color-warm) 0%, var(--color-gold) 100%);
  color: var(--color-dark);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.4s var(--ease-smooth);
  box-shadow: 0 4px 20px rgba(232, 201, 160, 0.3);
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(232, 201, 160, 0.4);
}

.cta-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s;
}

.hero-cta:hover .cta-arrow {
  transform: translateY(3px);
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}

.hero-share {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(250, 248, 245, 0.3);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: var(--color-cream);
  cursor: pointer;
  transition: all 0.3s var(--ease-smooth);
}

.hero-share:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(250, 248, 245, 0.5);
}

/* INFO */
.info-section {
  padding: 6rem 0;
  background: var(--color-cream);
}

.info-content {
  max-width: 650px;
  margin: 0 auto;
  text-align: center;
}

.info-lead {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2.25rem);
  font-weight: 700;
  color: var(--color-forest);
  line-height: 1.3;
  margin-bottom: 1.5rem;
}

.info-body {
  font-family: var(--font-body);
  font-size: 1.15rem;
  color: var(--color-forest);
  opacity: 0.85;
  line-height: 1.8;
}

/* DETAILS */
.details-section {
  padding: 4rem 0;
  background: var(--color-cream-dark);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  max-width: 700px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .details-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.detail-card {
  text-align: center;
  padding: 2rem 1rem;
  background: white;
  border-radius: 1.5rem;
}

.detail-icon-wrap {
  width: 40px;
  height: 40px;
  margin: 0 auto 1rem;
  color: var(--color-sage);
}

.detail-icon-wrap svg {
  width: 100%;
  height: 100%;
}

.detail-label {
  font-family: var(--font-body);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  color: var(--color-sage);
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}

.detail-value {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-forest);
  margin-bottom: 0.25rem;
}

.detail-sub {
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--color-sage);
}

/* PROGRAM */
.program-section {
  padding: 6rem 0;
  background: var(--color-cream);
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
}

.section-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  color: var(--color-sage);
  margin-bottom: 1rem;
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-forest);
}

.program-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .program-cards {
    grid-template-columns: 1fr 1fr;
  }
}

.program-card {
  padding: 2rem;
  background: white;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}

.program-time {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--color-cream-dark);
  border-radius: 100px;
  font-family: var(--font-body);
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--color-terra);
  margin-bottom: 1rem;
}

.program-title {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--color-forest);
  margin-bottom: 0.75rem;
}

.program-desc {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-forest);
  opacity: 0.8;
  line-height: 1.7;
}

/* FORM */
.form-section {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
}

.form-bg {
  position: absolute;
  inset: 0;
}

.form-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, var(--color-cream) 0%, var(--color-cream-dark) 100%);
}

.form-pattern {
  position: absolute;
  inset: 0;
  background-image: radial-gradient(var(--color-sage-light) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.3;
}

.form-container {
  position: relative;
  z-index: 10;
  max-width: 600px;
}

.form-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.form-intro {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-forest);
  opacity: 0.8;
  line-height: 1.7;
  margin-top: 1rem;
}

.event-form {
  background: white;
  padding: 2.5rem;
  border-radius: 2rem;
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
}

.form-error {
  padding: 1rem 1.5rem;
  background: #fef2f2;
  color: #b91c1c;
  border-radius: 1rem;
  font-family: var(--font-body);
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.form-row { margin-bottom: 1.5rem; }

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 480px) {
  .form-row-2 { grid-template-columns: 1fr; }
}

.form-label {
  display: block;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-forest);
  margin-bottom: 0.5rem;
}

.required { color: var(--color-terra); }

.form-input {
  width: 100%;
  padding: 1rem 1.25rem;
  background: var(--color-cream);
  border: 2px solid transparent;
  border-radius: 1rem;
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-forest);
  transition: all 0.3s var(--ease-smooth);
}

.form-input::placeholder {
  color: var(--color-sage);
  opacity: 0.6;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-sage);
  background: white;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%238b9e8b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 3rem;
  cursor: pointer;
}

.form-hint {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-sage);
  margin-bottom: 1.5rem;
}

.form-submit {
  width: 100%;
  padding: 1.25rem 2rem;
  background: linear-gradient(135deg, var(--color-forest) 0%, #3d4a3d 100%);
  color: var(--color-cream);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.4s var(--ease-smooth);
}

.form-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(45, 58, 45, 0.3);
}

.form-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.submit-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
}

.spinner {
  width: 20px;
  height: 20px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* SUCCESS */
.form-success {
  background: white;
  padding: 4rem 2.5rem;
  border-radius: 2rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(0,0,0,0.08);
}

.success-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, var(--color-sage-light) 0%, var(--color-sage) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.success-icon svg { width: 40px; height: 40px; color: white; }

.success-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-forest);
  margin-bottom: 0.75rem;
}

.success-text {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-sage);
  margin-bottom: 2rem;
}

.success-link {
  display: inline-flex;
  padding: 1rem 2rem;
  background: var(--color-cream);
  color: var(--color-forest);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.3s var(--ease-smooth);
}

.success-link:hover {
  background: var(--color-cream-dark);
}

/* FOOTER */
.footer-cta {
  padding: 4rem 0;
  background: var(--color-dark);
  text-align: center;
}

.footer-text {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-sage);
  margin-bottom: 0.5rem;
}

.footer-email {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-cream);
  text-decoration: none;
  transition: color 0.3s;
}

.footer-email:hover {
  color: var(--color-gold);
}
</style>
