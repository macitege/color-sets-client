'use strict'

const displayColorsLog = require('../templates/display-colors.handlebars')
const store = require('../store')
const colorGenerator = require('./generator')

const onCreateColorSuccess = () => {
  $('#message').text('Saved in your color palettes!').attr('class', 'alert alert-success shadow-lg')
  $('#message').fadeIn()
  setTimeout(() => { $('#message').fadeOut() }, 2000)
  $('#saveButton').attr('disabled', true)
}

const onCreateColorFailure = () => {
  $('#message').text('OOPS! Something went wrong. Try again.').attr('class', 'alert alert-danger shadow-lg')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const onGetColorsSuccess = (response) => {
  if (response.colors.length === 0) {
    $('#colorsLogArea').html('<p> You haven\'t saved color palettes yet</p>')
  } else {
    store.colors = response.colors
    const colorsLog = displayColorsLog({colors: response.colors})
    $('#colorsLogArea').html(colorsLog)
  }
}

const onGetColorsFailure = () => {
  $('#message').text('OOPS! Something went wrong. Try again.').attr('class', 'alert alert-danger shadow-lg')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const onDeleteColorSuccess = (id) => {
  $('#' + id).remove()
  $('#deleteColorConfirm').modal('hide')
  $('#message').text('Deleted!').attr('class', 'alert alert-warning shadow-lg')
  $('#message').fadeIn()
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const onDeleteColorFailure = () => {
  $('#message').text('OOPS! Something went wrong. Try again.').attr('class', 'alert alert-danger shadow-lg')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const onUpdateSuccess = () => {
  $('#messageEdit').text('Changed!').attr('class', 'alert alert-success shadow-lg')
  $('#messageEdit').fadeIn()
  setTimeout(() => {
    $('#messageEdit').fadeOut()
    $('#editColor').modal('hide')
  }, 2000)

  const r1 = Number($('#first-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[0]).toString(16)
  const g1 = Number($('#first-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[1]).toString(16)
  const b1 = Number($('#first-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[2]).toString(16)

  const r2 = Number($('#second-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[0]).toString(16)
  const g2 = Number($('#second-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[1]).toString(16)
  const b2 = Number($('#second-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[2]).toString(16)

  const r3 = Number($('#third-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[0]).toString(16)
  const g3 = Number($('#third-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[1]).toString(16)
  const b3 = Number($('#third-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[2]).toString(16)

  const r4 = Number($('#fourth-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[0]).toString(16)
  const g4 = Number($('#fourth-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[1]).toString(16)
  const b4 = Number($('#fourth-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[2]).toString(16)

  const r5 = Number($('#fifth-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[0]).toString(16)
  const g5 = Number($('#fifth-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[1]).toString(16)
  const b5 = Number($('#fifth-color').css('background-color').replace('rgb(', '').replace(')', '').split(',')[2]).toString(16)

  colorGenerator.colorSetHEX['color1'] = '#' + r1 + g1 + b1
  colorGenerator.colorSetHEX['color2'] = '#' + r2 + g2 + b2
  colorGenerator.colorSetHEX['color3'] = '#' + r3 + g3 + b3
  colorGenerator.colorSetHEX['color4'] = '#' + r4 + g4 + b4
  colorGenerator.colorSetHEX['color5'] = '#' + r5 + g5 + b5

  colorGenerator.colorSetRGBA['color1'] = $('#first-color').css('background-color')
  colorGenerator.colorSetRGBA['color2'] = $('#second-color').css('background-color')
  colorGenerator.colorSetRGBA['color3'] = $('#third-color').css('background-color')
  colorGenerator.colorSetRGBA['color4'] = $('#fourth-color').css('background-color')
  colorGenerator.colorSetRGBA['color5'] = $('#fifth-color').css('background-color')
}

const onUpdateFailure = () => {
  $('#messageEdit').text('OOPS! Something went wrong. Try again.').attr('class', 'alert alert-danger shadow-lg')
  setTimeout(() => { $('#messageEdit').fadeOut() }, 2000)
}

module.exports = {
  onCreateColorSuccess,
  onCreateColorFailure,
  onGetColorsSuccess,
  onGetColorsFailure,
  onDeleteColorSuccess,
  onDeleteColorFailure,
  onUpdateSuccess,
  onUpdateFailure
}
