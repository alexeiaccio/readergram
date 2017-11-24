const fs = require("fs")
const path = require("path")

const file = fs.readFileSync(path.resolve(__dirname + "/assets/text.js"), {
  encoding: "utf-8"
})
const PAGE_LENGHT = 1000

const getPages = function(text) {
  let pages = []
  let wordArray = text.split(' ')
  let letterCount = text.split('').length
  let pageCount = Math.floor(letterCount/PAGE_LENGHT)
  
  for (let i = 0; i < pageCount; i++) {
    let part = wordArray.length/pageCount
    let page = wordArray
      .slice( i < 1 ? 0 : part*(i),
        part*(i + 1))
      .join(' ')
    pages.push(page)
  }
  return pages
}

const newPages = getPages(file)

console.log(newPages[2])
