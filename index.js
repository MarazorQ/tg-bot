require('dotenv').config()

const TgBotAPI = require('node-telegram-bot-api')

const tg_token = process.env.tg_token
const stickers = require('./config.json')

const bot = new TgBotAPI(tg_token, {polling: true})

//set commands
bot.setMyCommands([
    {command: '/start', description: 'Приветсвие'},
    {command: '/info', description: 'Информация'}
])

// start bot
bot.on('message', msg => {
    const user_text = msg.text
    const chat_id = msg.chat.id
    const user_first_name = msg.chat.first_name
    // send response to user 
    if (user_text === '/start'){
        bot.sendSticker(chat_id, stickers.stickers.deamon.welcome)
        bot.sendMessage(chat_id, `Добро пожаловать дорогой ${user_first_name}!`)
    }
    if (user_text === '/help'){
        bot.sendSticker(chat_id, stickers.stickers.deamon.help)
        bot.sendMessage(chat_id, 'Информация')
    }
    console.log(msg)
})
