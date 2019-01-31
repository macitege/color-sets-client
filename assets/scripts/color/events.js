'use strict'

const colorGenerator = require('./generator')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onGetColors = (event) => {
  // event.preventDefault()
  api.getColors()
    .then(ui.onGetColorsSuccess)
    .catch(ui.onGetColorsFailure)
}

const onCreate = (event) => {
  if (store.user === undefined) {
    $('#message').html('Please <strong>sign in</strong> to save color palettes!').attr('class', 'alert alert-warning shadow-lg')
    $('#message').fadeIn()
    setTimeout(() => { $('#message').fadeOut() }, 2000)
  }
  event.preventDefault()
  const data = colorGenerator.prepareForAPI()
  api.createColor(data)
    .then(ui.onCreateColorSuccess)
    .then(onGetColors)
    .catch(ui.onCreateColorFailure)
}

const onDelete = (event) => {
  event.preventDefault()
  const id = event.target.dataset.id

  api.deleteColor(id)
    .then(ui.onDeleteColorSuccess(id))
    .then(onGetColors)
    .catch(ui.onDeleteColorFailure)
}

const addHandlers = () => {
  $('#saveButton').on('click', onCreate)
  $('#generateButton').on('click', colorGenerator.makeColors)
  $('#palettesButton').on('click', onGetColors)

  $('body').on('click', '#deletePalette', (event) => {
    onDelete(event)
  })

  // MAKES SPACE BAR THE GENERATOR BUTTON
  $('body').on('keyup', (event) => {
    event.preventDefault()
    if (event.keyCode === 32) {
      colorGenerator.makeColors()
    }
  })
}

module.exports = {
  addHandlers
}
