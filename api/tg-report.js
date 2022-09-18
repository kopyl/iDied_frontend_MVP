const TelegramBot = require("node-telegram-bot-api");
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: false });

export default function handler(request, response) {
    const message = JSON.stringify(request.body, null, 4);
    bot.sendMessage(63753908, message).then(() => {
        response.status(200).json({ message: "Message sent" });
    });
  }
