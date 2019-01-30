'use strict'

const store = require('../store')

const onSignUpSuccess = () => {
  $('#message').text('Sign up successful!')
  $('#message').fadeIn()
  setTimeout(() => { $('#message').fadeOut() }, 2000)
  $('#signUpForm').trigger('reset')
  $('#signUpModalClose').trigger('click')
}

const onSignUpFailure = () => {
  $('#signUpFailure').fadeIn()
  setTimeout(() => { $('.alert').fadeOut() }, 2000)
  $('#signUpForm').trigger('reset')
}

const onSignInSuccess = (response) => {
  store.user = response.user
  $('#message').text('Sign in successful!')
  $('#message').fadeIn()
  setTimeout(() => { $('.alert').fadeOut() }, 2000)
  $('#signInForm').trigger('reset')
  $('#signInDropdown').attr('class', 'dropdown-menu dropdown-menu-right')
  $('#authArea').hide()
  $('#accountArea').fadeIn()
}

const onSignInFailure = () => {
  $('#signInForm').trigger('reset')
  $('#signInFailureMessage').fadeIn()
  setTimeout(() => { $('#signInFailureMessage').fadeOut() }, 5000)
}

const onSignOutSuccess = () => {
  store.user = null
  $('#message').text('Successfully signed out!').attr('class', 'alert alert-warning')
  $('#message').fadeIn()
  setTimeout(() => { $('#message').fadeOut() }, 2000)
  $('#accountArea').hide()
  $('#authArea').fadeIn()
}

const onSignOutFailure = () => {

}


module.exports = {
  onSignUpSuccess,
  onSignUpFailure,
  onSignInSuccess,
  onSignInFailure,
  onSignOutSuccess,
  onSignOutFailure
}
