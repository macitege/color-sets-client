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

const deleteColor = (id) => {
  return $.ajax({
    url: config.apiUrl + '/colors/' + id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updatePalette = (data) => {
  return $.ajax({
    url: config.apiUrl + '/colors/' + store.colorIDForEdit,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

module.exports = {
  createColor,
  getColors,
  deleteColor,
  updatePalette
}
