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

function updateColors(newSet) {
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
    $(id).css('background-color', color.hex)
    $(`#hexCode${i + 1}`).val(color.hex)
    $(`#colorName${i + 1}`).text(color.name)
  })
  rgbaMaker()
}

const rnd = (min, max) => {
  return Math.floor((Math.random() * ((max - min) + 1)) + min)
}

function complementary() {
  const colorsHSL = {
    color1: {
      h: rnd(0, 360),
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color2: {
      h: null,
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color3: {},
    color4: {},
    color5: {}
  }
  colorsHSL.color2.h = Math.abs((colorsHSL.color1.h + 180) - 360)
  for (let i = 3; i < 6; i++) {
    const j = Math.ceil((Math.random() * 2))
    let maxH = colorsHSL[`color${j}`].h + 2
    if (maxH > 360) {
      maxH = 360
    }
    let maxS = colorsHSL[`color${j}`].s + 30
    if (maxS > 100) {
      maxS = 100
    }
    let maxL = colorsHSL[`color${j}`].l + 70
    if (maxL > 100) {
      maxL = 100
    }
    let minH = colorsHSL[`color${j}`].h - 2
    if (minH < 0) {
      minH = 0
    }
    let minS = colorsHSL[`color${j}`].s - 30
    if (minS < 0) {
      minS = 0
    }
    let minL = colorsHSL[`color${j}`].l - 70
    if (minL < 0) {
      minL = 0
    }
    const H = rnd(minH, maxH)
    const S = rnd(minS, maxS)
    const L = rnd(minL, maxL)

    colorsHSL[`color${i}`].h = H
    colorsHSL[`color${i}`].s = S
    colorsHSL[`color${i}`].l = L
  }
  return hslToHex(colorsHSL)
}

function analagous() {
  const colorsHSL = {
    color1: {
      h: rnd(0, 360),
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color2: {
      h: null,
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color3: {
      h: null,
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color4: {
      h: null,
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color5: {}
  }
  colorsHSL.color2.h = Math.abs((colorsHSL.color1.h + 30) - 360)
  colorsHSL.color3.h = Math.abs((colorsHSL.color1.h + 60) - 360)
  colorsHSL.color4.h = Math.abs((colorsHSL.color1.h + 90) - 360)
  for (let i = 5; i < 6; i++) {
    const j = Math.ceil((Math.random() * 4))
    let maxH = colorsHSL[`color${j}`].h + 2
    if (maxH > 360) {
      maxH = 360
    }
    let maxS = colorsHSL[`color${j}`].s + 30
    if (maxS > 100) {
      maxS = 100
    }
    let maxL = colorsHSL[`color${j}`].l + 70
    if (maxL > 100) {
      maxL = 100
    }
    let minH = colorsHSL[`color${j}`].h - 2
    if (minH < 0) {
      minH = 0
    }
    let minS = colorsHSL[`color${j}`].s - 30
    if (minS < 0) {
      minS = 0
    }
    let minL = colorsHSL[`color${j}`].l - 70
    if (minL < 0) {
      minL = 0
    }
    const H = rnd(minH, maxH)
    const S = rnd(minS, maxS)
    const L = rnd(minL, maxL)
    colorsHSL[`color${i}`].h = H
    colorsHSL[`color${i}`].s = S
    colorsHSL[`color${i}`].l = L
  }
  return hslToHex(colorsHSL)
}

function tetradic() {
  const colorsHSL = {
    color1: {
      h: rnd(0, 360),
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color2: {
      h: null,
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color3: {
      h: null,
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color4: {
      h: null,
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color5: {}
  }
  colorsHSL.color2.h = Math.abs((colorsHSL.color1.h + 90) - 360)
  colorsHSL.color3.h = Math.abs((colorsHSL.color1.h + 180) - 360)
  colorsHSL.color4.h = Math.abs((colorsHSL.color1.h + 270) - 360)
  for (let i = 5; i < 6; i++) {
    const j = Math.ceil((Math.random() * 4))
    let maxH = colorsHSL[`color${j}`].h + 2
    if (maxH > 360) {
      maxH = 360
    }
    let maxS = colorsHSL[`color${j}`].s + 30
    if (maxS > 100) {
      maxS = 100
    }
    let maxL = colorsHSL[`color${j}`].l + 70
    if (maxL > 100) {
      maxL = 100
    }
    let minH = colorsHSL[`color${j}`].h - 2
    if (minH < 0) {
      minH = 0
    }
    let minS = colorsHSL[`color${j}`].s - 30
    if (minS < 0) {
      minS = 0
    }
    let minL = colorsHSL[`color${j}`].l - 70
    if (minL < 0) {
      minL = 0
    }
    const H = rnd(minH, maxH)
    const S = rnd(minS, maxS)
    const L = rnd(minL, maxL)
    colorsHSL[`color${i}`].h = H
    colorsHSL[`color${i}`].s = S
    colorsHSL[`color${i}`].l = L
  }
  return hslToHex(colorsHSL)
}

function triadic() {
  const colorsHSL = {
    color1: {
      h: rnd(0, 360),
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color2: {
      h: null,
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color3: {
      h: null,
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color4: {},
    color5: {}
  }
  colorsHSL.color2.h = Math.abs((colorsHSL.color1.h + 120) - 360)
  colorsHSL.color3.h = Math.abs((colorsHSL.color1.h + 240) - 360)
  for (let i = 4; i < 6; i++) {
    const j = Math.ceil((Math.random() * 3))
    let maxH = colorsHSL[`color${j}`].h + 2
    if (maxH > 360) {
      maxH = 360
    }
    let maxS = colorsHSL[`color${j}`].s + 30
    if (maxS > 100) {
      maxS = 100
    }
    let maxL = colorsHSL[`color${j}`].l + 70
    if (maxL > 100) {
      maxL = 100
    }
    let minH = colorsHSL[`color${j}`].h - 2
    if (minH < 0) {
      minH = 0
    }
    let minS = colorsHSL[`color${j}`].s - 30
    if (minS < 0) {
      minS = 0
    }
    let minL = colorsHSL[`color${j}`].l - 70
    if (minL < 0) {
      minL = 0
    }
    const H = rnd(minH, maxH)
    const S = rnd(minS, maxS)
    const L = rnd(minL, maxL)
    colorsHSL[`color${i}`].h = H
    colorsHSL[`color${i}`].s = S
    colorsHSL[`color${i}`].l = L
  }
  return hslToHex(colorsHSL)
}

function splitComplementary() {
  const colorsHSL = {
    color1: {
      h: rnd(0, 360),
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color2: {
      h: null,
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color3: {
      h: null,
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color4: {},
    color5: {}
  }
  colorsHSL.color2.h = Math.abs((colorsHSL.color1.h + 150) - 360)
  colorsHSL.color3.h = Math.abs((colorsHSL.color1.h + 210) - 360)
  for (let i = 4; i < 6; i++) {
    const j = Math.ceil((Math.random() * 3))
    let maxH = colorsHSL[`color${j}`].h + 2
    if (maxH > 360) {
      maxH = 360
    }
    let maxS = colorsHSL[`color${j}`].s + 30
    if (maxS > 100) {
      maxS = 100
    }
    let maxL = colorsHSL[`color${j}`].l + 70
    if (maxL > 100) {
      maxL = 100
    }
    let minH = colorsHSL[`color${j}`].h - 2
    if (minH < 0) {
      minH = 0
    }
    let minS = colorsHSL[`color${j}`].s - 30
    if (minS < 0) {
      minS = 0
    }
    let minL = colorsHSL[`color${j}`].l - 70
    if (minL < 0) {
      minL = 0
    }
    const H = rnd(minH, maxH)
    const S = rnd(minS, maxS)
    const L = rnd(minL, maxL)
    colorsHSL[`color${i}`].h = H
    colorsHSL[`color${i}`].s = S
    colorsHSL[`color${i}`].l = L
  }
  return hslToHex(colorsHSL)
}

function monochromatic() {
  const colorsHSL = {
    color1: {
      h: rnd(0, 360),
      s: rnd(0, 100),
      l: rnd(0, 100)
    },
    color2: {},
    color3: {},
    color4: {},
    color5: {}
  }
  for (let i = 2; i < 6; i++) {
    let maxH = colorsHSL.color1.h + 2
    if (maxH > 360) {
      maxH = 360
    }
    let maxS = colorsHSL.color1.s + 40
    if (maxS > 100) {
      maxS = 100
    }
    let maxL = colorsHSL.color1.l + 90
    if (maxL > 100) {
      maxL = 100
    }
    let minH = colorsHSL.color1.h - 2
    if (minH < 0) {
      minH = 0
    }
    let minS = colorsHSL.color1.s - 40
    if (minS < 0) {
      minS = 0
    }
    let minL = colorsHSL.color1.l - 90
    if (minL < 0) {
      minL = 0
    }
    const H = rnd(minH, maxH)
    const S = rnd(minS, maxS)
    const L = rnd(minL, maxL)

    colorsHSL[`color${i}`].h = H
    colorsHSL[`color${i}`].s = S
    colorsHSL[`color${i}`].l = L
  }
  return hslToHex(colorsHSL)
}

function hslToHex(colorsHSL) {
  const colorSet = {
    color1: null,
    color2: null,
    color3: null,
    color4: null,
    color5: null
  }

  for (let i = 1; i < 6; i++) {
    const h = colorsHSL[`color${i}`].h
    const s = colorsHSL[`color${i}`].s / 100
    const l = colorsHSL[`color${i}`].l / 100

    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - c / 2
    let r = 0
    let g = 0
    let b = 0

    if (h >= 0 && h < 60) {
      r = c
      g = x
      b = 0
    } else if (h >= 60 && h < 120) {
      r = x
      g = c
      b = 0
    } else if (h >= 120 && h < 180) {
      r = 0
      g = c
      b = x
    } else if (h >= 180 && h < 240) {
      r = 0
      g = x
      b = c
    } else if (h >= 240 && h < 300) {
      r = x
      g = 0
      b = c
    } else if (h >= 300 && h < 360) {
      r = c
      g = 0
      b = x
    }
    r = Math.round((r + m) * 255).toString(16)
    g = Math.round((g + m) * 255).toString(16)
    b = Math.round((b + m) * 255).toString(16)
    if (r.length === 1) {
      r = '0' + r
    }
    if (g.length === 1) {
      g = '0' + g
    }
    if (b.length === 1) {
      b = '0' + b
    }
    colorSet[`color${i}`] = ('#' + r + g + b).toUpperCase()
  }
  return colorSet
}

function colorHarmony() {
  return monochromatic()
}

function makeColors() {
  const newColorSetHEX = colorHarmony()

  const newSetWithNames = colorNameAPI(newColorSetHEX)
  addToHistory(newSetWithNames)
  $('#saveButton').attr('disabled', false)
}

function rgbaMaker() {
  const rgbaSet = {
    color1Parsed: [],
    color2Parsed: [],
    color3Parsed: [],
    color4Parsed: [],
    color5Parsed: []
  }

  for (let j = 1; j < 6; j++) {
    const color = colorSetHEX[`color${j}`]
    for (let i = 0; i < 5; i += 2) {
      const hexNum = '0x' + color.hex.toString().replace('#', '').slice(i, i + 2)
      const rgbaNum = parseInt(hexNum, 16)
      rgbaSet[`color${j}Parsed`].push(rgbaNum)
    }
  }
  hexCodeConf(rgbaSet)
}

function hexCodeConf(rgbaSet) {
  const lSet = []
  const rSet = []
  for (let i = 1; i < 6; i++) {
    const rgbMax = Math.max(
      rgbaSet[`color${i}Parsed`][0],
      rgbaSet[`color${i}Parsed`][1],
      rgbaSet[`color${i}Parsed`][2]
    )
    const rgbMin = Math.min(
      rgbaSet[`color${i}Parsed`][0],
      rgbaSet[`color${i}Parsed`][1],
      rgbaSet[`color${i}Parsed`][2]
    )
    const R = rgbMax
    const L = ((rgbMax + rgbMin) / 510) * 100
    lSet.push(L)
    rSet.push(R)
  }
  codeLightness(lSet, rSet)
}

function codeLightness(lSet, rSet) {
  for (let i = 0; i < 5; i++) {
    if (lSet[i] > 60 || rSet[i] > 240) {
      $(`#hexCode${i + 1}`).css('color', 'black')
      $(`#colorName${i + 1}`).css('color', 'black')
    } else {
      $(`#hexCode${i + 1}`).css('color', 'white')
      $(`#colorName${i + 1}`).css('color', 'white')
    }
  }
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

function colorNameAPI(newSet) {
  const newSetWithNames = {
    color1: {
      hex: newSet.color1
    },
    color2: {
      hex: newSet.color2
    },
    color3: {
      hex: newSet.color3
    },
    color4: {
      hex: newSet.color4
    },
    color5: {
      hex: newSet.color5
    }
  }
  const apiCalls = []
  for (let i = 0; i < 5; i++) {
    const setColors = Object.values(newSet)
    const hex = (setColors[i]).replace('#', '')
    apiCalls[i] = fetch('https://www.thecolorapi.com/id?hex=' + hex).then(r => r.json())
  }
  Promise.all(apiCalls).then(colors => {
    colors.forEach((color, i) => {
      newSetWithNames[`color${i + 1}`].name = color.name.value
    })
    updateColors(newSetWithNames)
  })
  return newSetWithNames
}

const liveEdit = () => {
  for (let i = 1; i < 6; i++) {
    const rVal = Number($(`#red${i}`).val())
    const gVal = Number($(`#green${i}`).val())
    const bVal = Number($(`#blue${i}`).val())
    const rHex = rVal.toString(16).length === 1 ?
      '0' + rVal.toString(16) :
      rVal.toString(16)
    const gHex = gVal.toString(16).length === 1 ?
      '0' + gVal.toString(16) :
      gVal.toString(16)
    const bHex = bVal.toString(16).length === 1 ?
      '0' + bVal.toString(16) :
      bVal.toString(16)
    colorSetHEX[`color${i}`] = ('#' + rHex + gHex + bHex).toUpperCase()
    colorSetRGBA[`color${i}`] = 'rgba(' + rVal + ',' + gVal + ',' + bVal + ',1)'
    $(`#editColor${i}`).css('background-color', colorSetRGBA[`color${i}`])
    const editedRGBA = colorSetRGBA[`color${i}`]
    const editedHEX = colorSetHEX[`color${i}`]
    $(`#editColor${i}Code`).html(`<p>${editedRGBA}</p><p>${editedHEX}</p>`)
  }
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
  undoIndex = undoIndex === undefined ? history.length - 1 : undoIndex
  if (undoIndex !== history.length - 1) undoIndex++
  const nextSet = history[undoIndex]
  updateColors(nextSet)
}

function addToHistory(newSet) {
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
