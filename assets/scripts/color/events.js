'use strict'

const colorGenerator = require('./generator')
const api = require('./api')
const ui = require('./ui')
const store = require('../store')
const editorColors = require('../templates/editor-colors.handlebars')

const onGetColors = (event) => {
  // event.preventDefault()
  api.getColors()
    .then(ui.onGetColorsSuccess)
    .catch(ui.onGetColorsFailure)
}

const onCreate = (event) => {
  if (store.user === undefined) {
    $('#message').html('Please <strong>sign in</strong> to save color palettes!').attr('class', 'alert alert-warning shadow-lg')
    $('#message').fadeIn()
    setTimeout(() => { $('#message').fadeOut() }, 2000)
  }
  event.preventDefault()
  const data = colorGenerator.prepareForAPI()
  api.createColor(data)
    .then(ui.onCreateColorSuccess)
    .then(onGetColors)
    .catch(ui.onCreateColorFailure)
}

const onDelete = (event) => {
  event.preventDefault()
  const id = store.colorIDForDelete

  api.deleteColor(id)
    .then(ui.onDeleteColorSuccess(id))
    .then(onGetColors)
    .catch(ui.onDeleteColorFailure)
}

// PARSES RGB VALUE OF THE COLOR OBJECT COMES FROM onEdit() FUNCTION
const rgbaParser = (colorPalette, colorNum, controller) => {
  const rgbaStr = colorPalette['rgba']
  const num = colorNum - 1
  return rgbaStr.split('-')[num].replace('rgba(', '').replace(')', '').split(',')[controller]
}

const onEdit = () => {
  const id = store.colorIDForEdit
  const allColors = store.colors
  let colorObj = null
  allColors.forEach((color) => {
    if (color.id === Number(id)) {
      colorObj = color
    }
  })

  // TRANSFERS THE COLOR PALETTE SELECTED
  // GETS IT FROM COLOR OBJECT IN STORE AND USES HANDLE BAR TO
  // SHOW IT ON EDITOR MODAL
  const paletteToEdit = editorColors({color: [colorObj]})
  $('#editModal').html(paletteToEdit)

  // ASSIGNS RANGE VALUES IN EDITOR TO BE THE COLOR PALETTES
  // RGB VALUES
  $('#red1').val(rgbaParser(colorObj, 1, 0))
  $('#green1').val(rgbaParser(colorObj, 1, 1))
  $('#blue1').val(rgbaParser(colorObj, 1, 2))
  $('#red2').val(rgbaParser(colorObj, 2, 0))
  $('#green2').val(rgbaParser(colorObj, 2, 1))
  $('#blue2').val(rgbaParser(colorObj, 2, 2))
  $('#red3').val(rgbaParser(colorObj, 3, 0))
  $('#green3').val(rgbaParser(colorObj, 3, 1))
  $('#blue3').val(rgbaParser(colorObj, 3, 2))
  $('#red4').val(rgbaParser(colorObj, 4, 0))
  $('#green4').val(rgbaParser(colorObj, 4, 1))
  $('#blue4').val(rgbaParser(colorObj, 4, 2))
  $('#red5').val(rgbaParser(colorObj, 5, 0))
  $('#green5').val(rgbaParser(colorObj, 5, 1))
  $('#blue5').val(rgbaParser(colorObj, 5, 2))

  $('#editColor1Code').html('<p class="rgbaCode">' + colorObj.rgba.split('-')[0] + '</p>' +
                            '<p class="hexCode">' + colorObj.hex.split('-')[0] + '</p>')
  $('#editColor2Code').html('<p class="rgbaCode">' + colorObj.rgba.split('-')[1] + '</p>' +
                            '<p class="hexCode">' + colorObj.hex.split('-')[1] + '</p>')
  $('#editColor3Code').html('<p class="rgbaCode">' + colorObj.rgba.split('-')[2] + '</p>' +
                            '<p class="hexCode">' + colorObj.hex.split('-')[2] + '</p>')
  $('#editColor4Code').html('<p class="rgbaCode">' + colorObj.rgba.split('-')[3] + '</p>' +
                            '<p class="hexCode">' + colorObj.hex.split('-')[3] + '</p>')
  $('#editColor5Code').html('<p class="rgbaCode">' + colorObj.rgba.split('-')[4] + '</p>' +
                            '<p class="hexCode">' + colorObj.hex.split('-')[4] + '</p>')
}

const onUpdate = (event) => {
  event.preventDefault()
  const data = colorGenerator.prepareForAPI()

  console.log(data)
  console.log(store)

  api.updatePalette(data)
    .then(ui.onUpdateSuccess)
    .then(onGetColors)
    .catch(ui.onUpdateFailure)
}

const addHandlers = () => {
  $('#saveButton').on('click', onCreate)
  $('#generateButton').on('click', colorGenerator.makeColors)
  $('#generateButton').on('click', () => { $('#safeSave').trigger('click') })
  $('#palettesButton').on('click', onGetColors)
  $('#deletePaletteConfirm').on('click', onDelete)
  $('#updatePalette').on('click', onUpdate)

  $('body').on('click', '#deletePalette', (event) => {
    store.colorIDForDelete = event.target.dataset.id
  })
  $('body').on('click', '#editPalette', (event) => {
    store.colorIDForEdit = event.target.dataset.id
    onEdit()
  })

  // MAKES SPACE BAR THE GENERATOR BUTTON
  $('body').on('keyup', (event) => {
    event.preventDefault()
    if (event.keyCode === 32) {
      colorGenerator.makeColors()
      $('#safeSave').trigger('click')
    }
  })
}

module.exports = {
  addHandlers
}
