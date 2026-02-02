/**
 * Auth composable for Yoga i Tungelsta
 * Simplified version focused on punch cards and basic user info
 */

export interface PunchCard {
  id: number
  cardtype_id: number
  cardtype_name: string
  validFromDate: string
  validToDate: string
  usesLeft?: number
  totalUses?: number
}

export interface User {
  id: number
  firstname: string
  lastname: string
  email: string
  phone?: string
  imagekey?: string
  imageurl?: string
  punchCards?: PunchCard[]
  hasValidCard?: boolean
}

export const useAuth = () => {
  const user = useState<User | null>('auth-user', () => null)
  const isLoading = useState('auth-loading', () => true)
  const punchCards = useState<PunchCard[]>('auth-punchcards', () => [])

  // Use local proxy for API calls to avoid cross-site cookie issues (Safari ITP)
  const apiBase = '/api/z'

  const isLoggedIn = computed(() => !!user.value)

  // Total punches left across all valid punch cards
  const totalPunchesLeft = computed(() => {
    return punchCards.value.reduce((sum, card) => sum + (card.usesLeft || 0), 0)
  })

  const checkAuth = async (): Promise<boolean> => {
    isLoading.value = true
    console.log('[useAuth] Checking auth...')

    try {
      // Check Zoezi session - get current member (via local proxy)
      const response = await fetch(`${apiBase}/api/memberapi/get/current`, {
        credentials: 'include'
      })

      if (response.ok) {
        const data = await response.json()
        if (data && data.id) {
          // Fetch punch cards (klippkort)
          let cards: PunchCard[] = []
          try {
            const cardsRes = await fetch(`${apiBase}/api/memberapi/trainingcard/get/valid`, {
              credentials: 'include'
            })
            if (cardsRes.ok) {
              const cardsData = await cardsRes.json()
              // Filter for yoga-related punch cards (klippkort)
              // Klippkort typically have limited uses
              cards = (cardsData || [])
                .filter((card: any) => card.paid)
                .map((card: any) => ({
                  id: card.id,
                  cardtype_id: card.cardtype_id,
                  cardtype_name: card.cardtype_name,
                  validFromDate: card.validFromDate,
                  validToDate: card.validToDate,
                  usesLeft: card.usesLeft,
                  totalUses: card.totalUses
                }))
            }
          } catch (cardErr) {
            console.error('[useAuth] Failed to fetch punch cards:', cardErr)
          }

          punchCards.value = cards

          user.value = {
            id: data.id,
            firstname: data.firstname,
            lastname: data.lastname,
            email: data.mail || data.email,
            phone: data.phone,
            imagekey: data.imagekey,
            imageurl: data.imageurl,
            punchCards: cards,
            hasValidCard: cards.length > 0
          }

          isLoading.value = false
          return true
        }
      }
    } catch (err) {
      console.error('[useAuth] Auth check failed:', err)
    }

    user.value = null
    punchCards.value = []
    isLoading.value = false
    return false
  }

  const logout = async () => {
    try {
      await fetch(`${apiBase}/api/memberapi/logout`, {
        method: 'POST',
        credentials: 'include'
      })
    } catch (err) {
      console.error('[useAuth] Logout failed:', err)
    }

    user.value = null
    punchCards.value = []
    navigateTo('/')
  }

  const redirectToLogin = () => {
    const config = useRuntimeConfig()
    // Detect if we're in PWA standalone mode
    const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                  (window.navigator as any).standalone === true
    // Redirect to BankID login on Zoezi
    // After login, Zoezi redirects back to our callback page
    const callbackUrl = encodeURIComponent(`${window.location.origin}/callback${isPWA ? '?from=pwa' : ''}`)
    window.location.href = `${config.public.zoeziUrl}/auth?callback=${callbackUrl}`
  }

  /**
   * Google Login Flow:
   * 1. Google OAuth iframe posts id_token via postMessage
   * 2. We call Zoezi's Google login endpoint with the token
   * 3. Zoezi validates and returns user data + session_id
   * 4. We sync the session to ensure cookie is set correctly
   */
  const loginWithGoogle = async (idToken: string): Promise<boolean> => {
    isLoading.value = true

    try {
      const response = await fetch(
        `${apiBase}/api/memberapi/google/login?token=${encodeURIComponent(idToken)}`,
        {
          method: 'POST',
          credentials: 'include'
        }
      )

      if (response.ok) {
        const data = await response.json()

        if (data && data.id) {
          // Sync session to ensure cookie is set correctly (Safari ITP fix)
          if (data.session_id) {
            try {
              await fetch('/api/auth/session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ session: data.session_id }),
                credentials: 'include'
              })
            } catch (syncErr) {
              console.error('[useAuth] Session sync failed:', syncErr)
            }
          }

          // Re-check auth to get full user data including punch cards
          await checkAuth()
          isLoading.value = false
          return true
        }
      }
    } catch (err) {
      console.error('[useAuth] Google login failed:', err)
    }

    isLoading.value = false
    return false
  }

  // Listen for Google auth iframe messages
  const setupGoogleAuthListener = (callback: (success: boolean) => void) => {
    const handler = async (event: MessageEvent) => {
      if (event.data && event.data.id_token) {
        window.removeEventListener('message', handler)
        const success = await loginWithGoogle(event.data.id_token)
        callback(success)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }

  const getInitials = (first?: string, last?: string): string => {
    return ((first?.[0] || '') + (last?.[0] || '')).toUpperCase() || '?'
  }

  // Refresh punch cards
  const refreshPunchCards = async () => {
    if (!user.value) return

    try {
      const cardsRes = await fetch(`${apiBase}/api/memberapi/trainingcard/get/valid`, {
        credentials: 'include'
      })
      if (cardsRes.ok) {
        const cardsData = await cardsRes.json()
        const cards = (cardsData || [])
          .filter((card: any) => card.paid)
          .map((card: any) => ({
            id: card.id,
            cardtype_id: card.cardtype_id,
            cardtype_name: card.cardtype_name,
            validFromDate: card.validFromDate,
            validToDate: card.validToDate,
            usesLeft: card.usesLeft,
            totalUses: card.totalUses
          }))

        punchCards.value = cards
        if (user.value) {
          user.value = { ...user.value, punchCards: cards, hasValidCard: cards.length > 0 }
        }
      }
    } catch (err) {
      console.error('[useAuth] Failed to refresh punch cards:', err)
    }
  }

  return {
    user: readonly(user),
    isLoading: readonly(isLoading),
    punchCards: readonly(punchCards),
    totalPunchesLeft,
    isLoggedIn,
    checkAuth,
    logout,
    redirectToLogin,
    loginWithGoogle,
    setupGoogleAuthListener,
    getInitials,
    refreshPunchCards,
  }
}
