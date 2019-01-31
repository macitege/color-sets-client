'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events')
const colorGenerator = require('./color/generator')
const colorEvents = require('./color/events')

$('.alert').hide()
$('#accountArea, #saveButton, #palettesButton, #palettesWrapper').hide()
$('#signInFailureMessage, #changePwFailureMessage').hide()
$(() => {
  colorGenerator.makeColors()
  colorGenerator.addHandlers()
  authEvents.addHandlers()
  colorEvents.addHandlers()

  $('#message')
    .html('Please <a class="alert-link">sign in</a> to save you own color palettes!')
    .attr('class', 'alert alert-warning shadow-lg')

  $('#palettesButton').on('click', () => {
    if ($('#sidebar').css('width') === '0px') {
      $('#sidebar').css('width', '250px')
      $('#palettesWrapper').fadeIn(200)
    } else {
      $('#sidebar').css('width', '0px')
      $('#palettesWrapper').fadeOut(200)
    }
  })

  $('#palettesClose').on('click', () => {
    $('#sidebar').css('width', '0px')
  })
})
