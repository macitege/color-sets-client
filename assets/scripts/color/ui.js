'use strict'

const displayColorsLog = require('../templates/display-colors.handlebars')
const store = require('../store')

const onCreateColorSuccess = () => {
  $('#message').text('Saved in your color palettes!').attr('class', 'alert alert-success shadow-lg')
  $('#message').fadeIn()
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const onCreateColorFailure = () => {
  $('#message').text('OOPS! Something went wrong. Try again.').attr('class', 'alert alert-danger shadow-lg')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const onGetColorsSuccess = (response) => {
  console.log(response)
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
  $('#message').text('Deleted!').attr('class', 'alert alert-success shadow-lg')
  $('#message').fadeIn()
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const onDeleteColorFailure = () => {
  $('#message').text('OOPS! Something went wrong. Try again.').attr('class', 'alert alert-danger shadow-lg')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

// onUpdateSuccess
// onUpdateFailure

module.exports = {
  onCreateColorSuccess,
  onCreateColorFailure,
  onGetColorsSuccess,
  onGetColorsFailure,
  onDeleteColorSuccess,
  onDeleteColorFailure
}
