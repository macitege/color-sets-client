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
  $('#info-toast').toast({
    autohide: false
  })
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
  $('[data-toggle="tooltip"]').tooltip({
    trigger: 'hover'
  })
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

  // COLOR CODE COPY TO CLIPBOARD
  $('.color-codes').on('click', function () {
    const hexCodes = this.childNodes[1].value
    const el = document.createElement('textarea')
    el.value = hexCodes
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    $('#message').text('Color copied to the clipboard!').attr('class', 'alert alert-success shadow-lg')
    $('#message').fadeIn()
    setTimeout(() => {
      $('#message').fadeOut()
    }, 2000)
  })

  // // UNDO & REDO BUTTON
  $('#undoButton').on('click', () => {
    for (let i = 1; i < colorGenerator.history.length; i++) {
      if (colorGenerator.history[i][0] === colorGenerator.colorSetHEX['color1'] &&
        colorGenerator.history[i][1] === colorGenerator.colorSetHEX['color2'] &&
        colorGenerator.history[i][2] === colorGenerator.colorSetHEX['color3'] &&
        colorGenerator.history[i][3] === colorGenerator.colorSetHEX['color4'] &&
        colorGenerator.history[i][4] === colorGenerator.colorSetHEX['color5']) {
        colorGenerator.colorSetHEX['color1'] = colorGenerator.history[i - 1][0]
        colorGenerator.colorSetHEX['color2'] = colorGenerator.history[i - 1][1]
        colorGenerator.colorSetHEX['color3'] = colorGenerator.history[i - 1][2]
        colorGenerator.colorSetHEX['color4'] = colorGenerator.history[i - 1][3]
        colorGenerator.colorSetHEX['color5'] = colorGenerator.history[i - 1][4]
        return colorGenerator.updateColors()
      }
    }
  })
  
  $('#redoButton').on('click', () => {
    for (let i = 0; i < colorGenerator.history.length - 1; i++) {
      if (colorGenerator.history[i][0] === colorGenerator.colorSetHEX['color1'] &&
        colorGenerator.history[i][1] === colorGenerator.colorSetHEX['color2'] &&
        colorGenerator.history[i][2] === colorGenerator.colorSetHEX['color3'] &&
        colorGenerator.history[i][3] === colorGenerator.colorSetHEX['color4'] &&
        colorGenerator.history[i][4] === colorGenerator.colorSetHEX['color5']) {
        colorGenerator.colorSetHEX['color1'] = colorGenerator.history[i + 1][0]
        colorGenerator.colorSetHEX['color2'] = colorGenerator.history[i + 1][1]
        colorGenerator.colorSetHEX['color3'] = colorGenerator.history[i + 1][2]
        colorGenerator.colorSetHEX['color4'] = colorGenerator.history[i + 1][3]
        colorGenerator.colorSetHEX['color5'] = colorGenerator.history[i + 1][4]
        return colorGenerator.updateColors()
      }
    }
  })
  
})
