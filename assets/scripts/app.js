'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const authEvents = require('./auth/events')
const colorGenerator = require('./color/generator')
const colorEvents = require('./color/events')

// HIDDEN BUTTONS
$('.alert').hide()
$('#accountArea, #saveButton, #palettesButton, #palettesWrapper').hide()
$('#signInFailureMessage, #changePwFailureMessage').hide()

$(() => {
  // EVENT HANDLERS
  colorGenerator.makeColors()
  colorGenerator.addHandlers()
  authEvents.addHandlers()
  colorEvents.addHandlers()

  // SIGN IN WARNING
  $('#message')
    .html('Please <a class="alert-link">sign in</a> to save you own color palettes!')
    .attr('class', 'alert alert-warning shadow-lg')

  // PALETTES SIDE BAR TOGGLE BUTTON
  $('#palettesButton').on('click', () => {
    if ($('#sidebar').css('width') === '0px') {
      $('#sidebar').css('width', '250px')
      $('#palettesWrapper').fadeIn(200)
    } else {
      $('#sidebar').css('width', '0px')
      $('#palettesWrapper').fadeOut(200)
    }
  })
  // CLOSE BUTTON IN THE SIDE BAR
  $('#palettesClose').on('click', () => {
    $('#sidebar').css('width', '0px')
  })

  // ENABLE TOOL TIPS
  $('body').on('mouseover', '.opt', () => {
    $('[data-toggle="edit"]', '[data-toggle="destroy"]').tooltip()
  })
})
