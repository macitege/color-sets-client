'use strict'

const config = require('./../config')

const signUp = (data) => {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: data
  })
}

module.exports = {
  signUp
}
