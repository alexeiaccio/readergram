import TOKEN from "./secret";

const TelegramBot = require("node-telegram-bot-api")

const options = {
  webHook: {
    port: process.env.PORT    
  }
}

const url = process.env.APP_URL || 'https://fierce-plains-89529.herokuapp.com:443'

const bot = new TelegramBot(TOKEN, options)

bot.setWebHook(`${url}/bot${TOKEN}`)

bot.on("message", msg => {
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
