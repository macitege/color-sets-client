'use strict'

const onSignUpSuccess = (response) => {
  $('#signInSuccess').fadeIn()
  setTimeout(() => { $('.alert').fadeOut() }, 2000)
  $('#signUpForm').trigger('reset')
  $('#signUpModalClose').trigger('click')
}

const onSignUpFailure = (response) => {
  $('#signUpFailure').fadeIn()
  setTimeout(() => { $('.alert').fadeOut() }, 2000)
  $('#signUpForm').trigger('reset')
  // $('#signUpModalClose').trigger('click')
}

module.exports = {
  onSignUpSuccess,
  onSignUpFailure
}
