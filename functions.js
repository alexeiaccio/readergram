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
  let keys = []
  if (current>1) keys.push({ text: `« 1`, callback_data: '1' })
  if (current>2) keys.push({ text: `‹ ${current-1}`, callback_data: (current-1).toString() })
  keys.push({ text: `· ${current} ·`, callback_data: current.toString() })
  if (current<maxpage-1) keys.push({ text: `${current+1} ›`, callback_data: (current+1).toString() })
  if (current<maxpage) keys.push({ text: `${maxpage} »`, callback_data: maxpage.toString() })

  return {
    reply_markup: JSON.stringify({
      inline_keyboard: [ keys ]
    })
  }
}

module.exports = {
  getText, 
  getPagination,
  getMaxPage
}