'use strict'

const store = require('../store')
const config = require('./../config')

const createColor = (data) => {
  return $.ajax({
    url: config.apiUrl + '/colors',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const getColors = () => {
  return $.ajax({
    url: config.apiUrl + '/colors',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  createColor,
  getColors
}
