const TelegramBot = require("node-telegram-bot-api")
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: false })

export default function handler(request, response) {
    if (!request.body) {
        return response.status(400).json({ success: false })
    }
    if (request.body.userId === "101060012680908858287")
        return response.status(200).json({ success: true })
    const message = JSON.stringify(request.body, null, 4)
    bot.sendMessage(-1001758122517, message).then(() => {
        response.status(200).json({ message: "Message sent" })
    })
}
