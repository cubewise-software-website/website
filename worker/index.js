export default {
  async fetch(request, env) {
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 })
    }

    const secret = request.headers.get('X-Webhook-Secret')
    if (secret !== env.CF_WORKER_SECRET) {
      return new Response('Unauthorized', { status: 401 })
    }

    const response = await fetch(
      `https://api.github.com/repos/${env.GITHUB_REPO}/dispatches`,
      {
        method: 'POST',
        headers: {
          Authorization: `token ${env.GITHUB_PAT}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'User-Agent': 'Cubewise-Webhook-Bridge',
        },
        body: JSON.stringify({ event_type: 'confluence-publish' }),
      }
    )

    if (!response.ok) {
      const text = await response.text()
      return new Response(`GitHub API error: ${text}`, { status: 502 })
    }

    return new Response('OK', { status: 200 })
  },
}
