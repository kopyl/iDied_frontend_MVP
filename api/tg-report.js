const TelegramBot = require("node-telegram-bot-api")
const redis = require("redis")
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: false })

const client = redis.createClient({
    url: process.env.REDIS_URL,
})
client.on("error", function (error) {
    console.error(error)
})

const blackListIDs = [
    "104011162568084558955",
    "101060012680908858287",
    "109753745729280187999",
    "117045099548372110456",
]

const saveMessageIdToRedis = async (userId, messageId) => {
    await client.connect()
    await client.hSet("messages_idied_analytics", userId, messageId)
    await client.quit()
}

const getReplyMessageId = async (userId) => {
    if (!userId) return null
    await client.connect()
    const result = await client.hGet("messages_idied_analytics", userId.toString())
    await client.quit()
    return result
}

export default async function handler(request, response) {
    if (!request.body) {
        return response
            .status(400)
            .json({ success: false, apiVersion: "1.0.1" })
    }
    if (blackListIDs.includes(request.body.userId)) {
        return response.status(200).json({ success: true })
    }
    const message = JSON.stringify(request.body, null, 4)
    const replyMessageId = await getReplyMessageId(request.body.userId)
    bot.sendMessage(-1001758122517, message, {
        reply_to_message_id: replyMessageId,
    }).then(async (message) => {
        if (request.body.type === "new_user") {
            await saveMessageIdToRedis(request.body.userId, message.message_id)
        }
        response.status(200).json({ message: "Message sent" })
    })
}
