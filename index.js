import TOKEN from "./secret";
const TelegramBot = require("node-telegram-bot-api");

const bot = new TelegramBot(TOKEN, { polling: true });

bot.on("message", msg => {
  let Hi = "hi";
  if (
    msg.text
      .toString()
      .toLowerCase()
      .indexOf(Hi) === 0
  ) {
    bot.sendMessage(msg.chat.id, "Hello dear user");
  }

  let bye = "bye";
  if (
    msg.text
      .toString()
      .toLowerCase()
      .includes(bye)
  ) {
    bot.sendMessage(msg.chat.id, "Hope to see you around again , Bye");
  }
});
