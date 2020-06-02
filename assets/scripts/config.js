'use strict'

let apiUrl
const apiUrls = {
  production: 'https://color-sets-api.herokuapp.com',
  development: 'https://cors-anywhere.herokuapp.com/https://color-sets-api.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

module.exports = {
  apiUrl
}
