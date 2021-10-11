class Api {
  constructor(apiUrl, options = {}) {
    this.apiUrl = apiUrl
    this.options = options
  }

  resMiddleware(res) {
    if(res.ok) {
      return res.json()
    }

    throw new Error(res.message)
  }

  withTimeStamp(url) {
    const baseUrl = this.apiUrl + url
    const separator = url.includes('?')
      ? '&'
      : '?'

    return baseUrl + separator + `_=${Date.now()}`
  }

  get(url) {
    return fetch(this.withTimeStamp(url), {
      headers: {
        ...this.options
      }
    })
      .then(this.resMiddleware)
  }
}

export const JsonApi = new Api('https://s3-eu-west-1.amazonaws.com/game.wbsc.org/gamedata')
export const api = new Api('https://api.wbsc.org/api', { Accept: 'application/vnd.wbsc_tournaments.v1+json' })