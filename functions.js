const fs = require('fs')
const path = require('path')

const resource = fs.readFileSync(path.resolve(__dirname + '/assets/text.js'))

const getText = function(resource) {
  return 'text'
  console.log(resource)
}

module.exports = getText()