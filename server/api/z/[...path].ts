/**
 * Zoezi API Proxy
 *
 * Proxies all requests to z.coregym.club to avoid cross-site cookie issues.
 * This makes cookies first-party, solving Safari ITP problems.
 *
 * Usage: /api/z/api/memberapi/get/current → z.coregym.club/api/memberapi/get/current
 */

export default defineEventHandler(async (event) => {
  const path = event.context.params?.path || ''
  const query = getQuery(event)

  // Build target URL
  const queryString = new URLSearchParams(query as Record<string, string>).toString()
  const targetUrl = `https://z.coregym.club/${path}${queryString ? '?' + queryString : ''}`

  // Get request details
  const method = event.method
  const cookies = parseCookies(event)
  const sessionCookie = cookies.session

  // Build minimal headers - only what's needed
  const forwardHeaders: Record<string, string> = {
    'Accept': 'application/json',
  }

  // Add cookie if present
  if (sessionCookie) {
    forwardHeaders['Cookie'] = `session=${sessionCookie}`
  }

  // Read body for POST/PUT/PATCH
  let body: string | undefined
  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    body = await readBody(event)
    if (typeof body === 'object') {
      body = JSON.stringify(body)
    }
    forwardHeaders['Content-Type'] = 'application/json'
  }

  try {
    // Make request to Zoezi
    const response = await fetch(targetUrl, {
      method,
      headers: forwardHeaders,
      body,
    })

    // Forward Set-Cookie headers from response
    // Rewrite domain to .yogatungelsta.se so cookies work across subdomains
    const rewriteCookieDomain = (cookie: string): string => {
      // Remove any existing Domain attribute
      let rewritten = cookie.replace(/;\s*Domain=[^;]*/gi, '')
      // Add our domain (before the first ; or at the end)
      const firstSemicolon = rewritten.indexOf(';')
      if (firstSemicolon > 0) {
        rewritten = rewritten.slice(0, firstSemicolon) + '; Domain=.yogatungelsta.se' + rewritten.slice(firstSemicolon)
      } else {
        rewritten = rewritten + '; Domain=.yogatungelsta.se'
      }
      return rewritten
    }

    // Use raw header access for Cloudflare Workers compatibility
    const rawSetCookie = response.headers.get('set-cookie')
    if (rawSetCookie) {
      // Split multiple cookies if needed (they might be comma-separated)
      const cookies = rawSetCookie.split(/,(?=\s*\w+=)/)
      for (const cookie of cookies) {
        const rewritten = rewriteCookieDomain(cookie.trim())
        appendResponseHeader(event, 'Set-Cookie', rewritten)
      }
    }

    // Also try getSetCookie if available (Node.js 18+)
    if (typeof response.headers.getSetCookie === 'function') {
      const setCookies = response.headers.getSetCookie()
      for (const cookie of setCookies) {
        const rewritten = rewriteCookieDomain(cookie)
        appendResponseHeader(event, 'Set-Cookie', rewritten)
      }
    }

    // Set response status
    setResponseStatus(event, response.status)

    // Forward content-type
    const contentType = response.headers.get('Content-Type')
    if (contentType) {
      setResponseHeader(event, 'Content-Type', contentType)
    }

    // Return response body
    const responseContentType = contentType || ''
    if (responseContentType.includes('application/json')) {
      return await response.json()
    } else {
      return await response.text()
    }

  } catch (error: any) {
    console.error('[Zoezi Proxy] Error:', error.message)
    setResponseStatus(event, 502)
    return { error: 'Proxy error', message: error.message }
  }
})
