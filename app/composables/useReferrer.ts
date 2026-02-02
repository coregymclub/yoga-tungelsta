// Track where visitors came from (coregym.club vs direct)
export function useReferrer() {
  const route = useRoute()

  // Check if visitor came from main site
  const cameFromMainSite = computed(() => {
    // Check query param first (most reliable)
    if (route.query.from === 'main') return true

    // Check localStorage (persisted from previous visit)
    if (import.meta.client) {
      return localStorage.getItem('yoga_referrer') === 'main'
    }

    return false
  })

  // Store referrer on mount
  function trackReferrer() {
    if (!import.meta.client) return

    // If ?from=main, store it
    if (route.query.from === 'main') {
      localStorage.setItem('yoga_referrer', 'main')
      localStorage.setItem('yoga_referrer_time', Date.now().toString())
    }

    // Also check document.referrer as backup
    const referrer = document.referrer
    if (referrer.includes('coregym.club') && !referrer.includes('coregym.yoga')) {
      localStorage.setItem('yoga_referrer', 'main')
      localStorage.setItem('yoga_referrer_time', Date.now().toString())
    }

    // Clear old referrer data (older than 30 min)
    const referrerTime = localStorage.getItem('yoga_referrer_time')
    if (referrerTime) {
      const age = Date.now() - parseInt(referrerTime)
      if (age > 30 * 60 * 1000) {
        localStorage.removeItem('yoga_referrer')
        localStorage.removeItem('yoga_referrer_time')
      }
    }
  }

  // Get URL to go back to main site
  const mainSiteUrl = 'https://coregym.club'

  return {
    cameFromMainSite,
    trackReferrer,
    mainSiteUrl
  }
}
