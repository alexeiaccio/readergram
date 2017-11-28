const PAGE_LENGHT = 600

const getMaxPage = function(text) {
  let letterCount = text.split('').length
  return Math.floor(letterCount/PAGE_LENGHT)
}

const getPages = function(text) {
  let pages = []
  let wordArray = text.split(' ')
  let letterCount = text.split('').length
  let pageCount = getMaxPage(text)
  
  for (let i = 0; i <= pageCount; i++) {
    let part = wordArray.length/pageCount
    let page = wordArray
    .slice( i < 1 ? 0 : part*(i),
    part*(i + 1))
    .join(' ')
    pages.push(page)
  }
  return pages
}

const getText = function(text, page) {
  let pages = getPages(text)
  return pages[(page - 1)]
}

function getPagination( current, maxpage ) {
  let keysTop = []
  let keysBottom = []

  if (maxpage>3) 
    keysBottom.push({ text: `⏪ 1`, callback_data: '1' })
    keysBottom.push({ text: `· ${current} ·`, callback_data: current.toString() })
    keysBottom.push({ text: `${maxpage} ⏩`, callback_data: maxpage.toString() })

  if (current>1) 
    keysTop.push({ text: `◀`, callback_data: (current-1).toString() })  

  if (current<maxpage-1)
    keysTop.push({ text: `▶`, callback_data: (current+1).toString() })  

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [ keysTop, keysBottom ]
    })
  }
}

module.exports = {
  getText, 
  getPagination,
  getMaxPage
}