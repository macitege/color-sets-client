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

function updateColors() {
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
}

function makeColors() {
  for (let j = 0; j < history.length; j++) {
    if (history[j][0] === colorSetHEX['color1'] &&
      history[j][1] === colorSetHEX['color2'] &&
      history[j][2] === colorSetHEX['color3'] &&
      history[j][3] === colorSetHEX['color4'] &&
      history[j][4] === colorSetHEX['color5']) {
      if (j !== history.length - 1) {
        history.splice(j + 1)
      }
    }
  }
  for (let i = 1; i <= 5; i++) {
    // '#'+Math.floor(Math.random()*16777215).toString(16);
    let colorHEX = '#'
    while (colorHEX.length < 7) {
      colorHEX += (Math.random()).toString(16).substr(-6)
    }
    colorSetHEX['color' + i] = colorHEX.toUpperCase()
  }

  updateColors()

  history.push(Object.values(colorSetHEX))
  if (history.length > 30) {
    history.shift()
  }
  console.log(history)

  rgbaMaker()
  $('#saveButton').attr('disabled', false)
}

$('#undoButton').on('click', () => {
  for (let i = 1; i < history.length; i++) {
    if (history[i][0] === colorSetHEX['color1'] &&
      history[i][1] === colorSetHEX['color2'] &&
      history[i][2] === colorSetHEX['color3'] &&
      history[i][3] === colorSetHEX['color4'] &&
      history[i][4] === colorSetHEX['color5']) {
      colorSetHEX['color1'] = history[i - 1][0]
      colorSetHEX['color2'] = history[i - 1][1]
      colorSetHEX['color3'] = history[i - 1][2]
      colorSetHEX['color4'] = history[i - 1][3]
      colorSetHEX['color5'] = history[i - 1][4]
      return updateColors()
    }
  }

})

$('#redoButton').on('click', () => {
  for (let i = 0; i < history.length - 1; i++) {
    if (history[i][0] === colorSetHEX['color1'] &&
      history[i][1] === colorSetHEX['color2'] &&
      history[i][2] === colorSetHEX['color3'] &&
      history[i][3] === colorSetHEX['color4'] &&
      history[i][4] === colorSetHEX['color5']) {
      colorSetHEX['color1'] = history[i + 1][0]
      colorSetHEX['color2'] = history[i + 1][1]
      colorSetHEX['color3'] = history[i + 1][2]
      colorSetHEX['color4'] = history[i + 1][3]
      colorSetHEX['color5'] = history[i + 1][4]
      return updateColors()
    }
  }

})

function rgbaMaker() {
  const color1Parsed = []
  const color2Parsed = []
  const color3Parsed = []
  const color4Parsed = []
  const color5Parsed = []
  // "#45-45-45" -> 45
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

function prepareForAPI() {
  const data = {}
  data.color = {}
  data.color.hex = `${colorSetHEX['color1']}-${colorSetHEX['color2']}-${colorSetHEX['color3']}-${colorSetHEX['color4']}-${colorSetHEX['color5']}`
  data.color.rgba = `${colorSetRGBA['color1']}-${colorSetRGBA['color2']}-${colorSetRGBA['color3']}-${colorSetRGBA['color4']}-${colorSetRGBA['color5']}`
  data.color.hsla = 'undefined'
  data.color['user_id'] = store.user.id
  return data
}

const liveEdit = () => {
  const r1 = Number($('#red1').val())
  const g1 = Number($('#green1').val())
  const b1 = Number($('#blue1').val())
  const r2 = Number($('#red2').val())
  const g2 = Number($('#green2').val())
  const b2 = Number($('#blue2').val())
  const r3 = Number($('#red3').val())
  const g3 = Number($('#green3').val())
  const b3 = Number($('#blue3').val())
  const r4 = Number($('#red4').val())
  const g4 = Number($('#green4').val())
  const b4 = Number($('#blue4').val())
  const r5 = Number($('#red5').val())
  const g5 = Number($('#green5').val())
  const b5 = Number($('#blue5').val())

  const r1HEX = r1.toString(16).length === 1 ? '0' + r1.toString(16) : r1.toString(16)
  const g1HEX = g1.toString(16).length === 1 ? '0' + g1.toString(16) : g1.toString(16)
  const b1HEX = b1.toString(16).length === 1 ? '0' + b1.toString(16) : b1.toString(16)
  const r2HEX = r2.toString(16).length === 1 ? '0' + r2.toString(16) : r2.toString(16)
  const g2HEX = g2.toString(16).length === 1 ? '0' + g2.toString(16) : g2.toString(16)
  const b2HEX = b2.toString(16).length === 1 ? '0' + b2.toString(16) : b2.toString(16)
  const r3HEX = r3.toString(16).length === 1 ? '0' + r3.toString(16) : r3.toString(16)
  const g3HEX = g3.toString(16).length === 1 ? '0' + g3.toString(16) : g3.toString(16)
  const b3HEX = b3.toString(16).length === 1 ? '0' + b3.toString(16) : b3.toString(16)
  const r4HEX = r4.toString(16).length === 1 ? '0' + r4.toString(16) : r4.toString(16)
  const g4HEX = g4.toString(16).length === 1 ? '0' + g4.toString(16) : g4.toString(16)
  const b4HEX = b4.toString(16).length === 1 ? '0' + b4.toString(16) : b4.toString(16)
  const r5HEX = r5.toString(16).length === 1 ? '0' + r5.toString(16) : r5.toString(16)
  const g5HEX = g5.toString(16).length === 1 ? '0' + g5.toString(16) : g5.toString(16)
  const b5HEX = b5.toString(16).length === 1 ? '0' + b5.toString(16) : b5.toString(16)

  colorSetHEX['color1'] = ('#' + r1HEX + g1HEX + b1HEX).toUpperCase()
  colorSetHEX['color2'] = ('#' + r2HEX + g2HEX + b2HEX).toUpperCase()
  colorSetHEX['color3'] = ('#' + r3HEX + g3HEX + b3HEX).toUpperCase()
  colorSetHEX['color4'] = ('#' + r4HEX + g4HEX + b4HEX).toUpperCase()
  colorSetHEX['color5'] = ('#' + r5HEX + g5HEX + b5HEX).toUpperCase()

  colorSetRGBA['color1'] = 'rgba(' + r1 + ',' + g1 + ',' + b1 + ',1)'
  colorSetRGBA['color2'] = 'rgba(' + r2 + ',' + g2 + ',' + b2 + ',1)'
  colorSetRGBA['color3'] = 'rgba(' + r3 + ',' + g3 + ',' + b3 + ',1)'
  colorSetRGBA['color4'] = 'rgba(' + r4 + ',' + g4 + ',' + b4 + ',1)'
  colorSetRGBA['color5'] = 'rgba(' + r5 + ',' + g5 + ',' + b5 + ',1)'

  $('#editColor1').css('background-color', colorSetRGBA['color1'])
  $('#editColor2').css('background-color', colorSetRGBA['color2'])
  $('#editColor3').css('background-color', colorSetRGBA['color3'])
  $('#editColor4').css('background-color', colorSetRGBA['color4'])
  $('#editColor5').css('background-color', colorSetRGBA['color5'])

  $('#editColor1Code').html(`<p>${colorSetRGBA['color1']}</p><p>${colorSetHEX['color1']}</p>`)
  $('#editColor2Code').html(`<p>${colorSetRGBA['color2']}</p><p>${colorSetHEX['color2']}</p>`)
  $('#editColor3Code').html(`<p>${colorSetRGBA['color3']}</p><p>${colorSetHEX['color3']}</p>`)
  $('#editColor4Code').html(`<p>${colorSetRGBA['color4']}</p><p>${colorSetHEX['color4']}</p>`)
  $('#editColor5Code').html(`<p>${colorSetRGBA['color5']}</p><p>${colorSetHEX['color5']}</p>`)
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

  $('input[type="range"]').each(function () {
    $(this).bind('mousedown', function () {
      $(this).bind('mousemove', function () {
        liveEdit()
      })
    }).bind('mouseup', function () {
      $(this).unbind('mousemove')
    })
  })
}

module.exports = {
  makeColors,
  prepareForAPI,
  addHandlers,
  colorSetHEX,
  colorSetRGBA,
  history
}
