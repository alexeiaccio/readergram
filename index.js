const TelegramBot = require("node-telegram-bot-api")
const token = require("./secret")
const TOKEN = process.env.TELEGRAM_TOKEN || token

const options = {
  /* webHook: {
    port: process.env.PORT    
  }, */
  polling: true
}

const url = process.env.APP_URL || 'https://fierce-plains-89529.herokuapp.com:443'

const bot = new TelegramBot(TOKEN, options)

//bot.setWebHook(`${url}/bot${TOKEN}`)

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
})

const express = require('express')
const PORT = process.env.PORT || 5000

express()
  .set('port', PORT)
  .get('/', (req, res) => res.send('Hello World!'))  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
