'use strict'

const colorGenerator = require('./generator')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

const onCreate = (event) => {
  if (store.user === undefined) {
    $('#message').html('Please <strong>sign in</strong> to save color palettes!').attr('class', 'alert alert-warning shadow-lg')
    $('#message').fadeIn()
    setTimeout(() => { $('#message').fadeOut() }, 2000)
  }
  event.preventDefault()
  const data = colorGenerator.prepareForAPI()
  console.log(data)
  api.createColor(data)
    .then(ui.onCreateColorSuccess)
    .catch(ui.onCreateColorFailure)
}

const addHandlers = () => {
  $('#saveButton').on('click', onCreate)
  $('#generateButton').on('click', colorGenerator.makeColors)

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
