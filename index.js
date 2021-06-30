require('dotenv').config()

const TgBotAPI = require('node-telegram-bot-api')

const tg_token = process.env.tg_token
const stickers = require('./config/config.json')
const command = require('./config/config.json')
const descriptions = require('./config/config.json')
const responses = require('./config/config.json')

const chats = {}

// send form 
const gameOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "7", callback_data: 'dasdasd'},{text: "8", callback_data: 'dasdasd'},{text: "9", callback_data: 'dasdasd'}],
            [{text: "4", callback_data: 'dasdasd'},{text: "5", callback_data: 'dasdasd'},{text: "6", callback_data: 'dasdasd'}],
            [{text: "1", callback_data: 'dasdasd'},{text: "2", callback_data: 'dasdasd'},{text: "3", callback_data: 'dasdasd'}],
            [{text: "0", callback_data: 'dasdasd'}],
        ]
    })
}

const bot = new TgBotAPI(tg_token, {polling: true})

const run = () =>{
    //set commands
    bot.setMyCommands([
        {command: command.commands.start, description: descriptions.commands_description.start},
        {command: command.commands.help, description: descriptions.commands_description.help},
        {command: command.commands.game, description: descriptions.commands_description.game}
    ])
    // start bot
    bot.on('message', async msg => {
        const user_text = msg.text
        const chat_id = msg.chat.id
        const user_first_name = msg.chat.first_name
        // send response to user 
        switch(user_text){
            case command.commands.start:
                await bot.sendSticker(chat_id, stickers.stickers.deamon.welcome)
                await bot.sendMessage(chat_id, `${responses.response.start} ${user_first_name}!`)
                break;
            case command.commands.help:
                await bot.sendSticker(chat_id, stickers.stickers.deamon.help)
                await bot.sendMessage(chat_id, responses.response.help)
                break;
            case command.commands.game:
                await bot.sendMessage(chat_id, responses.response.game_first)
                const randomNubmer = Math.floor(Math.random() * 10)
                chats[chat_id] = randomNubmer
                await bot.sendSticker(chat_id, stickers.stickers.deamon.game)
                await bot.sendMessage(chat_id, responses.response.game_second, gameOptions)
                break;
            default:
                await bot.sendSticker(chat_id, stickers.stickers.deamon.error)
                await bot.sendMessage(chat_id, responses.response.error)
        }
        console.log(msg)
    })
}

//run app
run()