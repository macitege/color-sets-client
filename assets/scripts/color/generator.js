'use strict'

const store = require('../store')

// HISTORY HOLDS PREVIOUSLY GENERATED COLORS (MAX.30)
const history = []
// THE MOST RECENT COLOR SET GENERATED
const colorSet = {
  'color1': null,
  'color2': null,
  'color3': null,
  'color4': null,
  'color5': null
}

function makeColors () {
  for (let i = 1; i <= 5; i++) {
    // '#'+Math.floor(Math.random()*16777215).toString(16);
    let colorHEX = '#'
    while (colorHEX.length < 7) {
      colorHEX += (Math.random()).toString(16).substr(-6).substr(-1)
    }
    colorSet['color' + i] = colorHEX
  }
  $('#first-color').css('background-color', colorSet['color1'])
  $('#second-color').css('background-color', colorSet['color2'])
  $('#third-color').css('background-color', colorSet['color3'])
  $('#fourth-color').css('background-color', colorSet['color4'])
  $('#fifth-color').css('background-color', colorSet['color5'])
  history.push(colorSet)
  if (history.length > 30) {
    history.shift()
  }
}

function prepareForAPI () {
  const data = {}
  data.color = {}
  data.color.hex = `${colorSet['color1']}-${colorSet['color2']}-${colorSet['color3']}-${colorSet['color4']}-${colorSet['color5']}`
  data.color.rgba = 'undefined'
  data.color.hsla = 'undefined'
  data.color['user_id'] = store.user.id
  return data
}

module.exports = {
  makeColors,
  prepareForAPI
}
