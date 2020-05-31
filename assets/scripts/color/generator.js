'use strict'

const store = require('../store')

// HISTORY HOLDS PREVIOUSLY GENERATED COLORS (MAX.30)
let history = []
let undoIndex
// THE MOST RECENT COLOR SET GENERATED

let colorSetHEX

const colorSetRGBA = {
  'color1': null,
  'color2': null,
  'color3': null,
  'color4': null,
  'color5': null
}

function updateColors (newSet) {
  colorSetHEX = newSet
  const ids = [
    '#first-color',
    '#second-color',
    '#third-color',
    '#fourth-color',
    '#fifth-color'
  ]
  ids.forEach((id, i) => {
    const color = newSet[`color${i + 1}`]
    $(id).css('background-color', color)
    $(`#hexCode${i + 1}`).val(color)
  })
  rgbaMaker()
}

function makeColors () {
  const newColorSetHEX = {
    color1: null,
    color2: null,
    color3: null,
    color4: null,
    color5: null
  }
  for (let i = 1; i <= 5; i++) {
    // '#'+Math.floor(Math.random()*16777215).toString(16);
    let colorHEX = '#'
    while (colorHEX.length < 7) {
      colorHEX += (Math.random()).toString(16).substr(-6)
    }
    newColorSetHEX['color' + i] = colorHEX.toUpperCase()
  }
  addToHistory(newColorSetHEX)
  updateColors(newColorSetHEX)
  $('#saveButton').attr('disabled', false)
}

function rgbaMaker () {
  const rgbaSet = {
    color1Parsed: [],
    color2Parsed: [],
    color3Parsed: [],
    color4Parsed: [],
    color5Parsed: []
  }

  for (let j = 1; j < 6; j++) {
    for (let i = 0; i < 7; i += 2) {
      const hexNum = '0x' + colorSetHEX[`color${j}`].toString().replace('#', '').slice(i, i + 2)
      const rgbaNum = parseInt(hexNum, 16)
      rgbaSet[`color${j}Parsed`].push(rgbaNum)
    }
  }

// Object.keys(rgbaSet).map(key => {
//   rgba[key]
// })

  // const L1 = (
  //   (Math.max(
  //     parseInt(rgbaSet.color1Parsed[0], 16),
  //     parseInt(rgbaSet.color1Parsed[1], 16),
  //     parseInt(rgbaSet.color1Parsed[2], 16)
  //   ) + Math.min(
  //     parseInt(rgbaSet.color1Parsed[0], 16),
  //     parseInt(rgbaSet.color1Parsed[1], 16),
  //     parseInt(rgbaSet.color1Parsed[2], 16)
  //   )) / 510) * 100

  // const L2 = ((Math.max(parseInt(color2Parsed[0], 16), parseInt(color2Parsed[1], 16), parseInt(color2Parsed[2], 16)) + Math.min(parseInt(color2Parsed[0], 16), parseInt(color2Parsed[1], 16), parseInt(color2Parsed[2], 16))) / 510) * 100
  // const L3 = ((Math.max(parseInt(color3Parsed[0], 16), parseInt(color3Parsed[1], 16), parseInt(color3Parsed[2], 16)) + Math.min(parseInt(color3Parsed[0], 16), parseInt(color3Parsed[1], 16), parseInt(color3Parsed[2], 16))) / 510) * 100
  // const L4 = ((Math.max(parseInt(color4Parsed[0], 16), parseInt(color4Parsed[1], 16), parseInt(color4Parsed[2], 16)) + Math.min(parseInt(color4Parsed[0], 16), parseInt(color4Parsed[1], 16), parseInt(color4Parsed[2], 16))) / 510) * 100
  // const L5 = ((Math.max(parseInt(color5Parsed[0], 16), parseInt(color5Parsed[1], 16), parseInt(color5Parsed[2], 16)) + Math.min(parseInt(color5Parsed[0], 16), parseInt(color5Parsed[1], 16), parseInt(color5Parsed[2], 16))) / 510) * 100
  // const R1 = Math.max(parseInt(color1Parsed[0], 16), parseInt(color1Parsed[1], 16), parseInt(color1Parsed[2], 16))
  // const R2 = Math.max(parseInt(color2Parsed[0], 16), parseInt(color2Parsed[1], 16), parseInt(color2Parsed[2], 16))
  // const R3 = Math.max(parseInt(color3Parsed[0], 16), parseInt(color3Parsed[1], 16), parseInt(color3Parsed[2], 16))
  // const R4 = Math.max(parseInt(color4Parsed[0], 16), parseInt(color4Parsed[1], 16), parseInt(color4Parsed[2], 16))
  // const R5 = Math.max(parseInt(color5Parsed[0], 16), parseInt(color5Parsed[1], 16), parseInt(color5Parsed[2], 16))
  // codeLightness(L1, L2, L3, L4, L5, R1, R2, R3, R4, R5)
}

function codeLightness (L1, L2, L3, L4, L5, R1, R2, R3, R4, R5) {
  if (L1 > 60 || R1 > 240) {
    $('#hexCode1').css('color', 'black')
  } else {
    $('#hexCode1').css('color', 'white')
  }
  if (L2 > 60 || R2 > 240) {
    $('#hexCode2').css('color', 'black')
  } else {
    $('#hexCode2').css('color', 'white')
  }
  if (L3 > 60 || R3 > 240) {
    $('#hexCode3').css('color', 'black')
  } else {
    $('#hexCode3').css('color', 'white')
  }
  if (L4 > 60 || R4 > 240) {
    $('#hexCode4').css('color', 'black')
  } else {
    $('#hexCode4').css('color', 'white')
  }
  if (L5 > 60 || R5 > 240) {
    $('#hexCode5').css('color', 'black')
  } else {
    $('#hexCode5').css('color', 'white')
  }
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

const undo = () => {
  undoIndex = undoIndex === undefined ? history.length - 1 : undoIndex
  if (undoIndex !== 0) undoIndex--
  const previousSet = history[undoIndex]
  updateColors(previousSet)
}

const redo = () => {
  if (undoIndex !== history.length - 1) undoIndex++
  const nextSet = history[undoIndex]
  updateColors(nextSet)
}

function addToHistory (newSet) {
  if (undoIndex !== undefined) {
    history = history.slice(0, undoIndex + 1)
    undoIndex = undefined
  }
  history.push(newSet)
  if (history.length > 30) {
    history.shift()
  }
}

module.exports = {
  rgbaMaker,
  updateColors,
  makeColors,
  prepareForAPI,
  addHandlers,
  colorSetHEX,
  colorSetRGBA,
  undo,
  redo
}
