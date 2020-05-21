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
$('#accountArea, #saveButton, #palettesButton, #palettesWrapper, #messageEdit').hide()
$('#signInFailureMessage, #changePwFailureMessage').hide()

$(() => {
  // EVENT HANDLERS
  colorGenerator.makeColors()
  colorGenerator.addHandlers()
  authEvents.addHandlers()
  colorEvents.addHandlers()

  // SIGN IN WARNING
  $('#info-toast').toast({autohide: false})
  // $('#info-toast').toast('show')
  $('#info-toast').on('hidden.bs.toast', function () {
    $('.info-img').animate({
      opacity: 0.8
    })
  })
  $('#infoButton').on('click', () => {
    $('#info-toast').toast('show')
    $('.info-img').animate({
      opacity: 0.2
    })
  })

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

  // TOOL TIPS
  $('[data-toggle="tooltip"]').tooltip({trigger: 'hover'})
  $('#safeSave').on('click', () => {
    $('#saveButton').tooltip('hide')
  })

  // MAKES SPACE BAR THE GENERATOR BUTTON
  let autoGenerateState = false
  let loop
  const autoGenerate = () => {
    loop = setInterval(() => colorGenerator.makeColors(), 1000)
  }

  $('body').on('keyup', (event) => {
    event.preventDefault()
    if (event.keyCode === 32) {
      colorGenerator.makeColors()
      $('#safeSave').trigger('click')
    } else if (event.keyCode === 76) {
      autoGenerateState ? clearInterval(loop) : autoGenerate()
      autoGenerateState = !autoGenerateState
    }
  })
  $('#icon-palette').on('click', (event) => {
    event.preventDefault()
    colorGenerator.makeColors()
  })
})
