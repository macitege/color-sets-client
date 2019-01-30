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

const addHandlers = () => {
  $('#signUpForm').on('submit', onSignUp)
  $('#signInForm').on('submit', onSignIn)
  $('#signout').on('click', onSignOut)

  // CLEAR FORMS WHEN HIDDEN
  $('#signUpModal').on('hidden.bs.modal', () => {
    $('#signUpForm').trigger('reset')
  })
  // PREVENT DROPDOWN TO COLLAPSE RIGHT AFTER CLICKING SUBMIT
  $('#signInDropdown').click((e) => {
    e.stopPropagation()
  })
}

module.exports = {
  addHandlers
}
