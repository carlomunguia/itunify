import superagent from 'superagent'

export default class iTunesService {
  static search (criteria) {
    return superagent
      .get('https://itunes.apple.com/search')
      .query(criteria)
      .then(response => JSON.parse(response.text))
  }
}
