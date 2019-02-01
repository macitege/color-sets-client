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
  const id = store.colorID

  api.deleteColor(id)
    .then(ui.onDeleteColorSuccess(id))
    .then(onGetColors)
    .catch(ui.onDeleteColorFailure)
}

const rgbaParser = (colorPalette, colorNum, controller) => {
  const rgbaStr = colorPalette['rgba']
  const num = colorNum - 1
  return rgbaStr.split('-')[num].replace('rgba(', '').replace(')', '').split(',')[controller]
}

const onEdit = () => {
  const id = store.colorID
  const allColors = store.colors
  let colorObj = null
  allColors.forEach((color) => {
    if (color.id === Number(id)) {
      colorObj = color
    }
  })

  const paletteToEdit = editorColors({color: [colorObj]})
  $('#editModal').html(paletteToEdit)

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

  // const victim = `#contentOf${id}`
  // const contentToEdit = $(victim).html()
  // $('#editModal').html(`
  //   <section class="color-section-edit">
  //   ${contentToEdit.toString()}
  //   </section>
  //   `)
}

const addHandlers = () => {
  $('#saveButton').on('click', onCreate)
  $('#generateButton').on('click', colorGenerator.makeColors)
  $('#palettesButton').on('click', onGetColors)
  $('#deletePaletteConfirm').on('click', onDelete)

  $('body').on('click', '#deletePalette', (event) => {
    store.colorID = event.target.dataset.id
  })
  $('body').on('click', '#editPalette', (event) => {
    store.colorID = event.target.dataset.id
    onEdit()
  })

  // MAKES SPACE BAR THE GENERATOR BUTTON
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
