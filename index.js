const TelegramBot = require("node-telegram-bot-api")
const express = require('express')
const bodyParser = require('body-parser')
//const getText = require('./functions')
const fs = require('fs')
const path = require('path')

const TEXT = fs.readFileSync(path.resolve(__dirname + '/assets/text.js'))

const getText = function(x) {
  return x.text
          .toString()
          .slice(0, 1000)
}

const PORT = process.env.PORT || 5000
const TOKEN = process.env.TELEGRAM_TOKEN
const url = process.env.APP_URL || 'https://fierce-plains-89529.herokuapp.com:443'

const bot = new TelegramBot(TOKEN)

bot.setWebHook(`${url}/bot${TOKEN}`)

express()
  .set('port', PORT)
  .use(bodyParser.json())
  .post(`/bot${TOKEN}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
  })
  .get('/', (req, res) => res.send('Hello World!'))
  .get('/token', (req, res) => res.send(TOKEN))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

bot.on("message", msg => {
  bot.sendMessage(msg.chat.id, 'I am alive on Heroku!')

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

  let text = "text";
  if (
    msg.text
      .toString()
      .toLowerCase()
      .includes(text)
  ) {
    bot.sendMessage(msg.chat.id, getText(TEXT))
  }
})
