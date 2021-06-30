require('dotenv').config()

const TgBotAPI = require('node-telegram-bot-api')

const tg_token = process.env.tg_token

const bot = new TgBotAPI(tg_token, {polling: true})

bot.on('message', msg => {
    const user_text = msg.text
    const chat_id = msg.chat.id
    console.log(`user message ${user_text}, chat id ${chat_id}`)
})