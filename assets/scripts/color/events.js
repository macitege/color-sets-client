'use strict'

const colorGenerator = require('./generator')

const addHandlers = () => {
  $('body').on('keyup', (event) => {
    event.preventDefault()
    if (event.keyCode === 32) {
      colorGenerator.makeColors()
    }
  })
}

module.exports = {
  addHandlers
}
