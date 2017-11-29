const TelegramBot = require("node-telegram-bot-api")
const express = require('express')
const bodyParser = require('body-parser')
/* const fs = require('fs')
const path = require('path') */

const {
  getText, 
  getPagination,
  getMaxPage
  } = require('./functions')

/* const file = fs.readFileSync(path.resolve(__dirname + "/assets/text.js"), {
  encoding: "utf-8"
}) */

const PORT = process.env.PORT || 5000
const TOKEN = process.env.TELEGRAM_TOKEN
const url = process.env.APP_URL || 'https://fierce-plains-89529.herokuapp.com:443'
const isLocal = process.env.PATH.toString().toLowerCase().includes('local')

let options = {}

if(isLocal) {
  options = { polling: true }
} else {
  options = null
}

const bot = new TelegramBot(TOKEN, options)

if(!isLocal) {
  bot.setWebHook(`${url}/bot${TOKEN}`) 
  express()  
    .use(bodyParser.json())
    .post(`/bot${TOKEN}`, (req, res) => {
      bot.processUpdate(req.body);
      res.sendStatus(200);
    })
}

express()
  .set('port', PORT)
  .get('/', (req, res) => res.send('Hello World!'))
  .get('/token', (req, res) => res.send(TOKEN))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

bot.on("message", msg => {
  //bot.sendMessage(msg.chat.id, 'I am alive on Heroku!')

  let Hi = "hi";
  if (
    msg.text
      .toString()
      .toLowerCase()
      .indexOf(Hi) === 0
  ) {
    bot.sendMessage(msg.chat.id, "Hello dear user")
  }

  let bye = "bye";
  if (
    msg.text
      .toString()
      .toLowerCase()
      .includes(bye)
  ) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye")
  }
})

/* let textPages = getMaxPage(file)

bot.onText(/\/book/, function(msg) {
  bot.sendMessage(msg.chat.id, getText(file, 1), getPagination(1, textPages))
}) */

const longTexts = [];

const opts = {
  parse_mode: 'markdown',
  disable_web_page_preview: true
}

bot.on("message", msg => {
  let longread = "@longread" 
  let text = msg.text.toString() 
  let textPages = getMaxPage(text)
  let extOpts = Object.assign({}, getPagination(1, textPages), opts)

  let longText = text.replace("@longread", "") 

  longTexts.push(
    Object.assign({}, { 
      chat_id: msg.chat.id, 
      message_id: msg.message_id,
      text: longText
    }) 
  )

  if (
    text
      .toLowerCase()
      .includes(longread)
  ) {
    textPages>1 ? bot.sendMessage(msg.chat.id, getText(longText, 1), extOpts) : bot.sendMessage(msg.chat.id, longText, opts)
  }
})

bot.on('callback_query', message => {
  let msg = message.message
  let chat_id = msg.chat.id
  let message_id = msg.message_id

  let index = longTexts.findIndex((chat_id,
    message_id) => (chat_id === chat_id && message_id === message_id))

  console.log(index, longTexts.length)

  let text = longTexts[index].text

  let editOptions = Object.assign({}, getPagination(parseInt(message.data), getMaxPage(text)), { chat_id: msg.chat.id, message_id: msg.message_id}, opts)

  bot.editMessageText(getText(text, message.data), editOptions)
})

/* bot.on('callback_query', function (message) {
  let msg = message.message;
  let editOptions = Object.assign({}, getPagination(parseInt(message.data), textPages), { chat_id: msg.chat.id, message_id: msg.message_id});
  bot.editMessageText(getText(file, message.data), editOptions)
}) */

console.log(longTexts)