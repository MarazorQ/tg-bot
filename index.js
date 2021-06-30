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
            [{text: "7", callback_data: '7'},{text: "8", callback_data: '8'},{text: "9", callback_data: '9'}],
            [{text: "4", callback_data: '4'},{text: "5", callback_data: '5'},{text: "6", callback_data: '6'}],
            [{text: "1", callback_data: '1'},{text: "2", callback_data: '2'},{text: "3", callback_data: '3'}],
            [{text: "0", callback_data: '0'}],
        ]
    })
}

const againPlay = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: "Играть еще раз", callback_data: '/again'}],
        ]
    })
}

const startNewGame = async (chat_id) =>{
    await bot.sendMessage(chat_id, responses.response.game_first)
    const randomNubmer = Math.floor(Math.random() * 10)
    chats[chat_id] = randomNubmer
    console.log(randomNubmer)
    await bot.sendSticker(chat_id, stickers.stickers.deamon.game)
    await bot.sendMessage(chat_id, responses.response.game_second, gameOptions)
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
                startNewGame(chat_id)
                break;
            default:
                await bot.sendSticker(chat_id, stickers.stickers.deamon.error)
                await bot.sendMessage(chat_id, responses.response.error)
        }
        // console.log(msg)
    })
    // hadnle form
    bot.on('callback_query', async msg => {
        const data = msg.data
        const chat_id = msg.message.chat.id

        console.log(msg.message.chat.first_name)
        if (data == chats[chat_id]){
            await bot.sendSticker(chat_id, stickers.stickers.deamon.win)
            return bot.sendMessage(chat_id, `Хорошая работа ${msg.message.chat.first_name}, ты отгадал цифру ${chats[chat_id]}`)
        }else if(data === '/again'){
            startNewGame(chat_id)
        }else{
            await bot.sendSticker(chat_id, stickers.stickers.deamon.fail)
            return bot.sendMessage(chat_id,`К сожалению ты не угадал цифру ${chats[chat_id]}, попробуй еще раз`, againPlay)
        }
        
    })
}

//run app
run()