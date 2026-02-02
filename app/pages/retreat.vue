<script setup lang="ts">
/**
 * From Darkness to Light - Yoga Retreat Event Page
 * A contemplative, immersive experience honoring the sacred journey
 */

useHead({
  title: 'From Darkness to Light – Yoga Retreat | 22 mars 2025',
  meta: [
    { name: 'description', content: 'En dag av inre resa och transformation. Yoga retreat på Core Annexet i Tungelsta med fyra erfarna yogalärare. 22 mars kl 10-15. 595 kr.' }
  ]
})

// Form state
const formData = ref({
  name: '',
  email: '',
  phone: '',
  numberOfPeople: 1,
  message: ''
})
const isSubmitting = ref(false)
const isSuccess = ref(false)
const errorMessage = ref('')

// Scroll animation states
const heroVisible = ref(false)
const scheduleVisible = ref(false)
const venueVisible = ref(false)
const formVisible = ref(false)

onMounted(() => {
  // Trigger hero animation
  setTimeout(() => heroVisible.value = true, 100)

  // Intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id
        if (id === 'schedule-section') scheduleVisible.value = true
        if (id === 'venue-section') venueVisible.value = true
        if (id === 'form-section') formVisible.value = true
      }
    })
  }, { threshold: 0.2 })

  document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el))
})

async function handleSubmit() {
  if (!formData.value.name.trim()) {
    errorMessage.value = 'Vänligen ange ditt namn'
    return
  }
  if (!formData.value.email.trim() && !formData.value.phone.trim()) {
    errorMessage.value = 'Vänligen ange e-post eller telefon'
    return
  }

  isSubmitting.value = true
  errorMessage.value = ''

  try {
    const timestamp = new Date().toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' })

    const emailHtml = `
      <h2>🌅 Intresseanmälan: From Darkness to Light</h2>
      <p><strong>Tid:</strong> ${timestamp}</p>
      <p><strong>Event:</strong> Yoga Retreat 22 mars 2025, kl 10-15</p>
      <hr>
      <p><strong>Namn:</strong> ${formData.value.name}</p>
      <p><strong>Antal personer:</strong> ${formData.value.numberOfPeople}</p>
      ${formData.value.email ? `<p><strong>E-post:</strong> ${formData.value.email}</p>` : ''}
      ${formData.value.phone ? `<p><strong>Telefon:</strong> ${formData.value.phone}</p>` : ''}
      ${formData.value.message ? `<hr><h3>Meddelande:</h3><p>${formData.value.message}</p>` : ''}
      <hr>
      <p style="color: #666; font-size: 12px;">Skickat via coregym.yoga/retreat</p>
    `

    const emailResponse = await fetch('https://student-email.coregymclub.se/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: 'info@coregym.yoga',
        subject: `🌅 Retreat-intresse: ${formData.value.name}`,
        html: emailHtml,
        replyTo: formData.value.email || undefined
      })
    })

    if (!emailResponse.ok) throw new Error('Kunde inte skicka')

    // Post to teamchat yoga room
    try {
      const contact = formData.value.phone || formData.value.email
      const peopleText = formData.value.numberOfPeople > 1 ? ` – ${formData.value.numberOfPeople} personer` : ''
      await fetch('https://teamchat.coregym.club/api/terminal/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          room: 'yoga',
          message: `🌅 Retreat-intresse: ${formData.value.name} (${contact})${peopleText}`
        })
      })
    } catch (e) {
      console.error('Teamchat error:', e)
    }

    isSuccess.value = true
  } catch (error) {
    console.error('Submit error:', error)
    errorMessage.value = 'Något gick fel. Försök igen eller kontakta oss direkt.'
  } finally {
    isSubmitting.value = false
  }
}

// Schedule items - full program with flexible times
const schedule = [
  { time: '09:30', title: 'Dörrarna öppnas', desc: 'Ankomst och välkomstte' },
  { time: '10:00', title: 'Vinyasa Flow', desc: 'Jenny – uppvärmande, flödande rörelse' },
  { time: '', title: 'Ashtanga', desc: 'Karoline – kraftfull och strukturerad praktik' },
  { time: '', title: 'Paus', desc: 'Vila och återhämtning' },
  { time: '12:00', title: 'Lunch', desc: 'Vegetarisk linssoppa' },
  { time: '13:00', title: 'Yin Yoga', desc: 'Ylva – lugn och djupgående stretching' },
  { time: '', title: 'Kundalini Yoga', desc: 'Mari – andning och meditation' },
  { time: '', title: 'Djupavslappning', desc: 'Guidad avslappning och stillhet' },
  { time: '', title: 'Soundhealing', desc: 'Avslutande klangbad' },
  { time: '15:00', title: 'Avslutning', desc: 'Te, kaffe och fika' }
]

// Instructors - only name and yoga style
const instructors = [
  { name: 'Jenny', role: 'Vinyasa Flow' },
  { name: 'Karoline', role: 'Ashtanga' },
  { name: 'Ylva', role: 'Yin Yoga' },
  { name: 'Mari', role: 'Kundalini Yoga' }
]
</script>

<template>
  <div class="retreat-page">
    <!-- ========================================
         HERO - Full viewport, dramatic contrast
         ======================================== -->
    <section class="hero-section">
      <!-- Background layers -->
      <div class="hero-bg">
        <div class="hero-gradient-dark" />
        <div class="hero-gradient-light" />
        <div class="hero-stars" />
        <div class="hero-glow" />
      </div>

      <!-- Content -->
      <div
        class="hero-content"
        :class="{ 'hero-visible': heroVisible }"
      >
        <div class="hero-eyebrow">
          <span class="eyebrow-line" />
          <span class="eyebrow-text">YOGA RETREAT · TUNGELSTA</span>
          <span class="eyebrow-line" />
        </div>

        <h1 class="hero-title">
          <span class="title-from">From</span>
          <span class="title-darkness">Darkness</span>
          <span class="title-to">to</span>
          <span class="title-light">Light</span>
        </h1>

        <p class="hero-date">
          <span class="date-day">22</span>
          <span class="date-divider">/</span>
          <span class="date-month">mars</span>
          <span class="date-time">· kl 10–15</span>
        </p>

        <p class="hero-tagline">
          En dag av inre resa och transformation<br>
          på Core Annexet i Tungelsta
        </p>

        <a href="#anmalan" class="hero-cta">
          <span>Gör en intresseanmälan</span>
          <svg class="cta-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>

      </div>
    </section>

    <!-- ========================================
         INTRO - The journey begins
         ======================================== -->
    <section class="intro-section">
      <div class="container-yoga">
        <div class="intro-content">
          <p class="intro-lead">
            När vintermörkret har släppt sitt grepp samlas vi för att välkomna ljuset.
          </p>
          <p class="intro-subtitle">
            <em>From Darkness to Light</em> – Från mörker till ljus
          </p>
          <p class="intro-body">
            En transformerande yogaresa. I vintertidens sista dagar bjuder vi in till en heldag
            som för dig från tyngd till lätthet, från stress till stillhet.
          </p>
          <p class="intro-body">
            Våra fyra erfarna instruktörer guidar dig genom dagens yogasessioner,
            där varje del bygger på varandra och tar dig närmare ditt inre ljus.
          </p>
        </div>
      </div>
    </section>

    <!-- ========================================
         VENUE - The sacred space (moved before schedule)
         ======================================== -->
    <section class="venue-section section-visible">
      <div class="venue-bg">
        <img
          src="/images/yoga-tungelsta-ylva.avif"
          alt="Core Annexet i Tungelsta"
          class="venue-image"
        />
        <div class="venue-overlay" />
      </div>

      <div class="container-yoga venue-content">
        <div class="venue-text">
          <p class="section-label section-label-light">PLATSEN</p>
          <h2 class="venue-title">Core Annexet</h2>
          <p class="venue-desc">
            Core Annexet är vår nya yogalokal i Tungelsta – en fridfull oas för yoga
            och meditation med plats för grupper och events.
          </p>
          <p class="venue-desc">
            Här möts vi i en lugn miljö, perfekt för en dag av inre arbete
            och transformation.
          </p>

          <div class="venue-details">
            <div class="venue-detail">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="detail-label">Adress</p>
                <p class="detail-value">Rosvägen 2, 137 91 Tungelsta</p>
              </div>
            </div>
            <div class="venue-detail">
              <svg class="detail-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <div>
                <p class="detail-label">Parkering</p>
                <p class="detail-value">Gratis parkering utanför lokalen</p>
              </div>
            </div>
          </div>

          <a
            href="https://maps.apple.com/?address=Rosvagen%202,%20137%2091%20Tungelsta,%20Sweden"
            target="_blank"
            class="venue-map-link"
          >
            <span>Öppna i kartor</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <!-- ========================================
         SCHEDULE - The day's journey
         ======================================== -->
    <section class="schedule-section section-visible">
      <div class="container-yoga">
        <div class="section-header">
          <p class="section-label">DAGENS RESA</p>
          <h2 class="section-title">Schema</h2>
        </div>

        <div class="schedule-timeline">
          <div class="timeline-line" />
          <div
            v-for="(item, index) in schedule"
            :key="item.time"
            class="timeline-item"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="timeline-dot" />
            <div v-if="item.time" class="timeline-time">{{ item.time }}</div>
            <div class="timeline-content">
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p class="timeline-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <div class="schedule-note">
          <svg class="note-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>Tiderna är ungefärliga och kan justeras under dagen.</p>
        </div>
      </div>
    </section>

    <!-- ========================================
         BEGINNER INFO
         ======================================== -->
    <section class="beginner-section">
      <div class="container-yoga">
        <div class="beginner-content">
          <div class="beginner-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <h2 class="beginner-title">Ny på yoga?</h2>
          <p class="beginner-text">
            Perfekt! Retreatet passar alla, oavsett om du är nybörjare eller erfaren yogi.
            Våra instruktörer guidar dig genom varje moment och anpassar övningarna efter din nivå.
          </p>
        </div>
      </div>
    </section>

    <!-- ========================================
         INSTRUCTORS - The guides
         ======================================== -->
    <section class="instructors-section">
      <div class="container-yoga">
        <div class="section-header">
          <p class="section-label">DINA GUIDER</p>
          <h2 class="section-title">Instruktörer</h2>
        </div>

        <div class="instructors-grid">
          <div
            v-for="instructor in instructors"
            :key="instructor.name"
            class="instructor-card"
          >
            <div class="instructor-avatar">
              <span class="avatar-initial">{{ instructor.name.charAt(0) }}</span>
            </div>
            <h3 class="instructor-name">{{ instructor.name }}</h3>
            <p class="instructor-role">{{ instructor.role }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ========================================
         REGISTRATION FORM
         ======================================== -->
    <section
      id="anmalan"
      class="form-section section-visible"
    >
      <div class="form-bg">
        <div class="form-gradient" />
        <div class="form-pattern" />
      </div>

      <div class="container-yoga form-container">
        <div class="form-header">
          <p class="section-label">BOKA DIN PLATS</p>
          <h2 class="section-title">Intresseanmälan</h2>

          <!-- Price box -->
          <div class="price-box">
            <div class="price-amount">595 kr</div>
            <div class="price-includes">
              <p>I priset ingår:</p>
              <ul>
                <li>Alla yogapass & soundhealing</li>
                <li>Välkomstte</li>
                <li>Vegetarisk linssoppa till lunch</li>
                <li>Te/kaffe med tilltugg</li>
              </ul>
            </div>
          </div>

          <p class="form-intro">
            Fyll i formuläret nedan så hör vi av oss med mer information och bekräftelse.
          </p>
        </div>

        <!-- Success state -->
        <div v-if="isSuccess" class="form-success">
          <div class="success-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="success-title">Tack för din anmälan!</h3>
          <p class="success-text">
            Vi har tagit emot din intresseanmälan och hör av oss inom kort med mer information.
          </p>
          <NuxtLink to="/" class="success-link">
            Tillbaka till startsidan
          </NuxtLink>
        </div>

        <!-- Form -->
        <form v-else @submit.prevent="handleSubmit" class="retreat-form">
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
                <option :value="1">1 person</option>
                <option :value="2">2 personer</option>
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

          <div class="form-row">
            <div class="form-group">
              <label for="message" class="form-label">Meddelande (valfritt)</label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="4"
                class="form-input form-textarea"
                placeholder="Frågor eller önskemål?"
              />
            </div>
          </div>

          <p class="form-hint">* Ange e-post eller telefon så vi kan nå dig</p>

          <button type="submit" :disabled="isSubmitting" class="form-submit">
            <span v-if="isSubmitting" class="submit-loading">
              <svg class="spinner" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" fill="none" opacity="0.25"/>
                <path d="M12 2a10 10 0 0110 10" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>
              </svg>
              Skickar...
            </span>
            <span v-else>Gör en intresseanmälan</span>
          </button>
        </form>
      </div>
    </section>

    <!-- ========================================
         FOOTER CTA
         ======================================== -->
    <section class="footer-cta">
      <div class="container-yoga">
        <p class="footer-text">Har du frågor? Kontakta oss på</p>
        <a href="mailto:info@coregym.yoga" class="footer-email">info@coregym.yoga</a>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* ========================================
   CSS CUSTOM PROPERTIES
   ======================================== */
.retreat-page {
  --color-dark: #1a1915;
  --color-forest: #2d3a2d;
  --color-sage: #8b9e8b;
  --color-sage-light: #c4d4c4;
  --color-cream: #faf8f5;
  --color-cream-dark: #f0ebe3;
  --color-terra: #c4846a;
  --color-gold: #d4a574;

  --font-display: 'Suisse BP Intl', serif;
  --font-body: 'Neue Montreal', sans-serif;

  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* ========================================
   HERO SECTION
   ======================================== */
.hero-section {
  position: relative;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
}

.hero-gradient-dark {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    #0d0d0b 0%,
    #1a1915 30%,
    #2d3a2d 70%,
    #3d4a3d 100%
  );
}

.hero-gradient-light {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 80% 60% at 50% 100%,
    rgba(212, 165, 116, 0.15) 0%,
    transparent 60%
  );
}

.hero-stars {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 100%),
    radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.2) 0%, transparent 100%),
    radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.25) 0%, transparent 100%),
    radial-gradient(1px 1px at 80% 50%, rgba(255,255,255,0.15) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 10% 60%, rgba(255,255,255,0.2) 0%, transparent 100%),
    radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.25) 0%, transparent 100%);
}

.hero-glow {
  position: absolute;
  bottom: -20%;
  left: 50%;
  transform: translateX(-50%);
  width: 120%;
  height: 60%;
  background: radial-gradient(
    ellipse at center,
    rgba(212, 165, 116, 0.08) 0%,
    transparent 70%
  );
}

.hero-content {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 2rem;
  opacity: 0;
  transform: translateY(30px);
  transition: all 1.2s var(--ease-smooth);
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
  margin-bottom: 3rem;
}

.eyebrow-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--color-sage-light), transparent);
}

.eyebrow-text {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: var(--color-sage-light);
  opacity: 0.8;
}

.hero-title {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1;
  margin-bottom: 2rem;
}

.title-from,
.title-to {
  display: block;
  font-size: clamp(1rem, 3vw, 1.5rem);
  font-weight: 400;
  font-style: italic;
  letter-spacing: 0.2em;
  color: var(--color-sage-light);
  opacity: 0.7;
  margin: 0.5rem 0;
}

.title-darkness {
  display: block;
  font-size: clamp(3rem, 12vw, 8rem);
  background: linear-gradient(
    180deg,
    var(--color-cream) 0%,
    var(--color-sage-light) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 80px rgba(212, 165, 116, 0.2);
}

.title-light {
  display: block;
  font-size: clamp(3rem, 12vw, 8rem);
  background: linear-gradient(
    180deg,
    var(--color-gold) 0%,
    var(--color-terra) 50%,
    var(--color-cream) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 100px rgba(212, 165, 116, 0.3);
}

.hero-date {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: var(--color-cream);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.5rem;
}

.date-day {
  font-size: 1.5em;
  font-weight: 700;
}

.date-divider {
  opacity: 0.4;
}

.date-month {
  text-transform: lowercase;
}

.date-time {
  opacity: 0.6;
  font-size: 0.8em;
}

.hero-tagline {
  font-family: var(--font-body);
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: var(--color-sage-light);
  opacity: 0.8;
  line-height: 1.8;
  margin-bottom: 3rem;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 2.5rem;
  background: linear-gradient(135deg, var(--color-terra) 0%, var(--color-gold) 100%);
  color: var(--color-dark);
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  border-radius: 100px;
  text-decoration: none;
  transition: all 0.4s var(--ease-smooth);
  box-shadow:
    0 4px 20px rgba(196, 132, 106, 0.3),
    0 0 60px rgba(212, 165, 116, 0.15);
}

.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow:
    0 8px 30px rgba(196, 132, 106, 0.4),
    0 0 80px rgba(212, 165, 116, 0.2);
}

.cta-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s var(--ease-spring);
}

.hero-cta:hover .cta-arrow {
  transform: translateY(3px);
}

/* ========================================
   INTRO SECTION
   ======================================== */
.intro-section {
  padding: 8rem 0;
  background: var(--color-cream);
  position: relative;
}

.intro-content {
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
}

.intro-lead {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-forest);
  line-height: 1.3;
  margin-bottom: 1.5rem;
}

.intro-subtitle {
  font-family: var(--font-display);
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: var(--color-terra);
  margin-bottom: 2rem;
}

.intro-subtitle em {
  font-style: italic;
}

.intro-body {
  font-family: var(--font-body);
  font-size: 1.25rem;
  color: var(--color-forest);
  opacity: 0.85;
  line-height: 1.8;
  margin-bottom: 1.5rem;
}

.intro-body em {
  color: var(--color-terra);
  font-style: normal;
  font-weight: 500;
}

/* ========================================
   SECTION HEADERS
   ======================================== */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.25em;
  color: var(--color-sage);
  margin-bottom: 1rem;
}

.section-label-light {
  color: var(--color-sage-light);
}

.section-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--color-forest);
}

/* ========================================
   SCHEDULE SECTION
   ======================================== */
.schedule-section {
  padding: 6rem 0;
  background: var(--color-cream-dark);
}

.schedule-section.section-visible {
  opacity: 1;
}

.schedule-timeline {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  padding-left: 2rem;
}

.timeline-line {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    180deg,
    var(--color-sage-light) 0%,
    var(--color-terra) 50%,
    var(--color-gold) 100%
  );
}

.timeline-item {
  position: relative;
  padding: 1.5rem 0 1.5rem 2rem;
  opacity: 0;
  transform: translateX(-20px);
  animation: slideIn 0.5s var(--ease-smooth) forwards;
}

.section-visible .timeline-item {
  opacity: 1;
  transform: translateX(0);
}

@keyframes slideIn {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.timeline-dot {
  position: absolute;
  left: -2rem;
  top: 1.75rem;
  width: 10px;
  height: 10px;
  background: var(--color-terra);
  border-radius: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 0 4px var(--color-cream-dark);
}

.timeline-time {
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-terra);
  margin-bottom: 0.25rem;
}

.timeline-title {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-forest);
  margin-bottom: 0.5rem;
}

.timeline-desc {
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--color-forest);
  opacity: 0.8;
}

.schedule-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  max-width: 500px;
  margin: 3rem auto 0;
  padding: 1rem 1.5rem;
  background: white;
  border-radius: 1rem;
  text-align: center;
}

.note-icon {
  width: 20px;
  height: 20px;
  color: var(--color-sage);
  flex-shrink: 0;
}

.schedule-note p {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-forest);
  opacity: 0.7;
  line-height: 1.5;
}

/* ========================================
   INSTRUCTORS SECTION
   ======================================== */
.instructors-section {
  padding: 6rem 0;
  background: var(--color-cream);
}

.instructors-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 700px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .instructors-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.instructor-card {
  text-align: center;
  padding: 2rem 1rem;
  background: white;
  border-radius: 1.5rem;
  transition: all 0.4s var(--ease-smooth);
}

.instructor-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}

.instructor-avatar {
  width: 80px;
  height: 80px;
  margin: 0 auto 1rem;
  background: linear-gradient(135deg, var(--color-sage-light) 0%, var(--color-sage) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-initial {
  font-family: var(--font-display);
  font-size: 2rem;
  font-weight: 700;
  color: white;
}

.instructor-name {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-forest);
  margin-bottom: 0.25rem;
}

.instructor-role {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-terra);
  font-weight: 500;
}

/* ========================================
   VENUE SECTION
   ======================================== */
.venue-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.venue-section.section-visible {
  opacity: 1;
}

.venue-bg {
  position: absolute;
  inset: 0;
}

.venue-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.venue-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(26, 25, 21, 0.95) 0%,
    rgba(26, 25, 21, 0.7) 50%,
    rgba(26, 25, 21, 0.4) 100%
  );
}

@media (max-width: 768px) {
  .venue-overlay {
    background: linear-gradient(
      180deg,
      rgba(26, 25, 21, 0.3) 0%,
      rgba(26, 25, 21, 0.9) 50%,
      rgba(26, 25, 21, 0.95) 100%
    );
  }
}

.venue-content {
  position: relative;
  z-index: 10;
  padding: 6rem 1.5rem;
}

@media (min-width: 768px) {
  .venue-content {
    padding: 6rem 0;
  }
}

.venue-text {
  max-width: 500px;
}

.venue-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: var(--color-cream);
  margin-bottom: 1.5rem;
}

.venue-desc {
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--color-cream);
  opacity: 0.9;
  line-height: 1.8;
  margin-bottom: 1rem;
}

.venue-details {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.venue-detail {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.detail-icon {
  width: 24px;
  height: 24px;
  color: var(--color-gold);
  flex-shrink: 0;
}

.detail-label {
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  color: var(--color-sage);
  text-transform: uppercase;
  margin-bottom: 0.25rem;
}

.detail-value {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-cream);
}

.venue-map-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 2rem;
  padding: 1rem 1.5rem;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 100px;
  color: var(--color-cream);
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s var(--ease-smooth);
}

.venue-map-link:hover {
  background: rgba(255,255,255,0.2);
}

.venue-map-link svg {
  width: 18px;
  height: 18px;
}

/* ========================================
   FORM SECTION
   ======================================== */
.form-section {
  position: relative;
  padding: 6rem 0;
  overflow: hidden;
}

.form-section.section-visible {
  opacity: 1;
}

.form-bg {
  position: absolute;
  inset: 0;
}

.form-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    var(--color-cream) 0%,
    var(--color-cream-dark) 100%
  );
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
  margin-bottom: 3rem;
}

.form-intro {
  font-family: var(--font-body);
  font-size: 1rem;
  color: var(--color-forest);
  opacity: 0.8;
  line-height: 1.7;
  margin-top: 1.5rem;
}

/* Price box */
.price-box {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem;
  margin: 2rem 0;
  box-shadow: 0 10px 40px rgba(0,0,0,0.06);
  text-align: center;
}

.price-amount {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-terra);
  margin-bottom: 1rem;
}

.price-includes {
  text-align: left;
  max-width: 280px;
  margin: 0 auto;
}

.price-includes p {
  font-family: var(--font-body);
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-forest);
  margin-bottom: 0.75rem;
}

.price-includes ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.price-includes li {
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--color-forest);
  opacity: 0.85;
  padding: 0.4rem 0;
  padding-left: 1.5rem;
  position: relative;
}

.price-includes li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: var(--color-sage);
  font-weight: 600;
}

.retreat-form {
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

.form-row {
  margin-bottom: 1.5rem;
}

.form-row-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 480px) {
  .form-row-2 {
    grid-template-columns: 1fr;
  }
}

.form-label {
  display: block;
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-forest);
  margin-bottom: 0.5rem;
}

.required {
  color: var(--color-terra);
}

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

.form-textarea {
  resize: none;
  min-height: 120px;
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

/* Success state */
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

.success-icon svg {
  width: 40px;
  height: 40px;
  color: white;
}

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

/* ========================================
   FOOTER CTA
   ======================================== */
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

/* ========================================
   BEGINNER SECTION
   ======================================== */
.beginner-section {
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--color-sage-light) 0%, var(--color-sage) 100%);
}

.beginner-content {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}

.beginner-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 1.5rem;
  color: var(--color-forest);
}

.beginner-icon svg {
  width: 100%;
  height: 100%;
}

.beginner-title {
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 700;
  color: var(--color-forest);
  margin-bottom: 1.5rem;
}

.beginner-text {
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--color-forest);
  line-height: 1.8;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.beginner-link {
  color: var(--color-forest);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 0.3s;
}

.beginner-link:hover {
  opacity: 0.7;
}
</style>
