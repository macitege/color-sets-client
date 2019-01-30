'use strict'

const store = require('../store')
const config = require('./../config')

const signUp = (data) => {
  console.log(data)
  return $.ajax({
    url: config.apiUrl + '/sign-up',
    method: 'POST',
    data: data
  })
}

const signIn = (data) => {
  return $.ajax({
    url: config.apiUrl + '/sign-in',
    method: 'POST',
    data: data
  })
}

const signOut = () => {
  return $.ajax({
    url: config.apiUrl + '/sign-out/' + store.user.id,
    method: 'DELETE'
  })
}

module.exports = {
  signUp,
  signIn,
  signOut
}
