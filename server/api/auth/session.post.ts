/**
 * Session Sync Endpoint
 *
 * POST /api/auth/session
 * Body: { session: string }
 *
 * AUTHENTICATION FLOW (BankID & Google):
 * ======================================
 * 1. User initiates login on yogatungelsta.se
 * 2. Redirect to z.coregym.club/auth (BankID) or use Google OAuth
 * 3. After successful auth, Zoezi creates a session and returns session_id
 * 4. Redirect back to yogatungelsta.se/callback?zs=SESSION_TOKEN
 * 5. Callback page calls this endpoint with the session token
 * 6. This endpoint validates the token against Zoezi and sets a cookie
 * 7. Cookie is set on .yogatungelsta.se domain
 *
 * WHY THIS IS NEEDED (Safari ITP):
 * ================================
 * Safari's Intelligent Tracking Prevention blocks third-party cookies.
 * When z.coregym.club sets a cookie, Safari may block yogatungelsta.se
 * from reading it. By having the callback page explicitly pass the token
 * and having our server set the cookie, we bypass ITP restrictions.
 */

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const sessionToken = body?.session

  if (!sessionToken) {
    setResponseStatus(event, 400)
    return { error: 'Missing session token' }
  }

  try {
    // Validate the session by calling Zoezi's API with the token
    const response = await fetch('https://z.coregym.club/api/memberapi/get/current', {
      headers: {
        'Cookie': `session=${sessionToken}`
      }
    })

    if (!response.ok) {
      setResponseStatus(event, 401)
      return { error: 'Invalid session' }
    }

    const userData = await response.json()

    if (!userData || !userData.id) {
      setResponseStatus(event, 401)
      return { error: 'Invalid session' }
    }

    // Clear any existing session cookies first
    deleteCookie(event, 'session', { path: '/' })
    deleteCookie(event, 'session', { path: '/', domain: '.yogatungelsta.se' })

    // Session is valid! Set the cookie on .yogatungelsta.se domain
    // NOTE: Not using httpOnly because Cloudflare Pages has issues with it
    setCookie(event, 'session', sessionToken, {
      domain: '.yogatungelsta.se',
      path: '/',
      secure: true,
      httpOnly: false,
      sameSite: 'lax',
      // Set expiry to 1 year
      maxAge: 60 * 60 * 24 * 365
    })

    return {
      success: true,
      user: {
        id: userData.id,
        firstname: userData.firstname,
        lastname: userData.lastname
      }
    }

  } catch (error: any) {
    console.error('[Session Sync] Error:', error.message)
    setResponseStatus(event, 500)
    return { error: 'Session validation failed' }
  }
})
