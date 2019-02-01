'use strict'

const store = require('../store')

// HISTORY HOLDS PREVIOUSLY GENERATED COLORS (MAX.30)
const history = []
// THE MOST RECENT COLOR SET GENERATED
const colorSetHEX = {
  'color1': null,
  'color2': null,
  'color3': null,
  'color4': null,
  'color5': null
}

const colorSetRGBA = {
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
    colorSetHEX['color' + i] = colorHEX.toUpperCase()
  }
  $('#first-color').css('background-color', colorSetHEX['color1'])
  $('#hexCode1').val(colorSetHEX['color1'])
  $('#second-color').css('background-color', colorSetHEX['color2'])
  $('#hexCode2').val(colorSetHEX['color2'])
  $('#third-color').css('background-color', colorSetHEX['color3'])
  $('#hexCode3').val(colorSetHEX['color3'])
  $('#fourth-color').css('background-color', colorSetHEX['color4'])
  $('#hexCode4').val(colorSetHEX['color4'])
  $('#fifth-color').css('background-color', colorSetHEX['color5'])
  $('#hexCode5').val(colorSetHEX['color5'])
  history.push(colorSetHEX)
  if (history.length > 30) {
    history.shift()
  }
  rgbaMaker()
}

function rgbaMaker () {
  const color1Parsed = []
  const color2Parsed = []
  const color3Parsed = []
  const color4Parsed = []
  const color5Parsed = []

  color1Parsed.push('0x' + colorSetHEX['color1'].toString().replace('#', '').slice(0, 2))
  color1Parsed.push('0x' + colorSetHEX['color1'].toString().replace('#', '').slice(2, 4))
  color1Parsed.push('0x' + colorSetHEX['color1'].toString().replace('#', '').slice(4, 6))
  color2Parsed.push('0x' + colorSetHEX['color2'].toString().replace('#', '').slice(0, 2))
  color2Parsed.push('0x' + colorSetHEX['color2'].toString().replace('#', '').slice(2, 4))
  color2Parsed.push('0x' + colorSetHEX['color2'].toString().replace('#', '').slice(4, 6))
  color3Parsed.push('0x' + colorSetHEX['color3'].toString().replace('#', '').slice(0, 2))
  color3Parsed.push('0x' + colorSetHEX['color3'].toString().replace('#', '').slice(2, 4))
  color3Parsed.push('0x' + colorSetHEX['color3'].toString().replace('#', '').slice(4, 6))
  color4Parsed.push('0x' + colorSetHEX['color4'].toString().replace('#', '').slice(0, 2))
  color4Parsed.push('0x' + colorSetHEX['color4'].toString().replace('#', '').slice(2, 4))
  color4Parsed.push('0x' + colorSetHEX['color4'].toString().replace('#', '').slice(4, 6))
  color5Parsed.push('0x' + colorSetHEX['color5'].toString().replace('#', '').slice(0, 2))
  color5Parsed.push('0x' + colorSetHEX['color5'].toString().replace('#', '').slice(2, 4))
  color5Parsed.push('0x' + colorSetHEX['color5'].toString().replace('#', '').slice(4, 6))

  colorSetRGBA['color1'] = 'rgba(' + parseInt(color1Parsed[0], 16) + ',' + parseInt(color1Parsed[1], 16) + ',' + parseInt(color1Parsed[2], 16) + ',1)'
  colorSetRGBA['color2'] = 'rgba(' + parseInt(color2Parsed[0], 16) + ',' + parseInt(color2Parsed[1], 16) + ',' + parseInt(color2Parsed[2], 16) + ',1)'
  colorSetRGBA['color3'] = 'rgba(' + parseInt(color3Parsed[0], 16) + ',' + parseInt(color3Parsed[1], 16) + ',' + parseInt(color3Parsed[2], 16) + ',1)'
  colorSetRGBA['color4'] = 'rgba(' + parseInt(color4Parsed[0], 16) + ',' + parseInt(color4Parsed[1], 16) + ',' + parseInt(color4Parsed[2], 16) + ',1)'
  colorSetRGBA['color5'] = 'rgba(' + parseInt(color5Parsed[0], 16) + ',' + parseInt(color5Parsed[1], 16) + ',' + parseInt(color5Parsed[2], 16) + ',1)'
}



function prepareForAPI () {
  const data = {}
  data.color = {}
  data.color.hex = `${colorSetHEX['color1']}-${colorSetHEX['color2']}-${colorSetHEX['color3']}-${colorSetHEX['color4']}-${colorSetHEX['color5']}`
  data.color.rgba = `${colorSetRGBA['color1']}-${colorSetRGBA['color2']}-${colorSetRGBA['color3']}-${colorSetRGBA['color4']}-${colorSetRGBA['color5']}`
  data.color.hsla = 'undefined'
  data.color['user_id'] = store.user.id
  return data
}

const addHandlers = () => {
  $('#hexCode1').on('change', () => {
    const newColor = $('#hexCode1').val()
    $('#first-color').css('background-color', newColor)
  })
  $('#hexCode2').on('change', () => {
    const newColor = $('#hexCode2').val()
    $('#second-color').css('background-color', newColor)
  })
  $('#hexCode3').on('change', () => {
    const newColor = $('#hexCode3').val()
    $('#third-color').css('background-color', newColor)
  })
  $('#hexCode4').on('change', () => {
    const newColor = $('#hexCode4').val()
    $('#fourth-color').css('background-color', newColor)
  })
  $('#hexCode5').on('change', () => {
    const newColor = $('#hexCode5').val()
    $('#fifth-color').css('background-color', newColor)
  })
}

module.exports = {
  makeColors,
  prepareForAPI,
  addHandlers
}
