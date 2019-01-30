'use strict'

const onCreateColorSuccess = () => {
  $('#message').text('Saved in your color palettes!').attr('class', 'alert alert-success shadow-lg')
  $('#message').fadeIn()
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

const onCreateColorFailure = () => {
  $('#message').text('OOPS! Something went wrong. Try again.').attr('class', 'alert alert-danger shadow-lg')
  setTimeout(() => { $('#message').fadeOut() }, 2000)
}

module.exports = {
  onCreateColorSuccess,
  onCreateColorFailure
}
