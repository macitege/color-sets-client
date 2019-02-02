'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const api = require('./api')
const ui = require('./ui')

const onSignUp = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)

  api.signUp(data)
    .then(ui.onSignUpSuccess)
    // .then(onSignIn)
    .catch(ui.onSignUpFailure)
}

const onSignIn = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)

  api.signIn(data)
    .then(ui.onSignInSuccess)
    .catch(ui.onSignInFailure)
}

const onSignOut = () => {
  event.preventDefault()

  api.signOut()
    .then(ui.onSignOutSuccess)
    .catch(ui.onSignOutFailure)
}

const onChangePw = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)

  api.changePw(data)
    .then(ui.onChangePwSuccess)
    .catch(ui.onChangePwFailure)
}

const addHandlers = () => {
  $('#signUpForm').on('submit', onSignUp)
  $('#signInForm').on('submit', onSignIn)
  $('#signout').on('click', onSignOut)
  $('#changePwForm').on('submit', onChangePw)

  // CLEAR FORMS WHEN HIDDEN
  $('#signUpModal, #changePwModal').on('hidden.bs.modal', () => {
    $('#signUpForm, #changePwForm').trigger('reset')
    $('#changePwFailureMessage').hide()
  })
  // PREVENT DROPDOWN TO COLLAPSE RIGHT AFTER CLICKING SUBMIT
  $('#signInDropdown').click((e) => {
    e.stopPropagation()
  })
  // RESET SIGN-IN FORM IF DROPDOWN IS HIDDEN
  $('#signInButton').on('click', function () {
    $('#signInForm').trigger('reset')
  })
}

module.exports = {
  addHandlers
}
