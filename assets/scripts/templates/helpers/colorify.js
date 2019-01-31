'use strict'

const colorify = (colorObj, num) => {
  return colorObj.hex.split('-')[num]
}

module.exports = colorify
