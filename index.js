require('dotenv').config()

const TgBotAPI = require('node-telegram-bot-api')

const tg_token = process.env.tg_token

const bot = new TgBotAPI(tg_token, {polling: true})

// start bot
bot.on('message', msg => {
    const user_text = msg.text
    const chat_id = msg.chat.id
    const user_first_name = msg.chat.first_name
    // send response to user 
    if (user_text === '/start'){
        bot.sendMessage(chat_id, `Добро пожаловать дорогой ${user_first_name}!`)
    }
    console.log(msg)
})