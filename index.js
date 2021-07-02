//libs
require('dotenv').config()
const TgBotAPI = require('node-telegram-bot-api')
const mongoose = require('mongoose')

//env
const tg_token = process.env.TG_TOKEN
const db = process.env.DB_HOST

//config
const command = require('./config/config.json')
const descriptions = require('./config/config.json')
const responses = require('./config/config.json')
const callback_data = require('./config/config.json')

// modules
const Common = require('./modules/Common.js')
const Game = require('./modules/Game.js')
const Weekend = require('./modules/Weekend.js')

global.chats = {}

const bot = new TgBotAPI(tg_token, {polling: true})

// main
const run = async () =>{
    try{
        await mongoose.connect(db, 
            {
                useUnifiedTopology: true, 
                useNewUrlParser: true
            })
    }catch(e){
        console.log('ERROR', e)
    }

    //set commands
    bot.setMyCommands([
        {command: command.commands.start, description: descriptions.commands_description.start},
        {command: command.commands.info, description: descriptions.commands_description.info},
        {command: command.commands.game, description: descriptions.commands_description.game},
        {command: command.commands.help, description: descriptions.commands_description.help},
        {command: command.commands.weekend, description: descriptions.commands_description.weekend}
    ])
    // start bot
    bot.on('message', async msg => {
        const user_text = msg.text
        const chat_id = msg.chat.id
        const user_first_name = msg.chat.first_name

        try{
            // send response to user 
            switch(user_text){
                case command.commands.start:
                    Common.startCommand(chat_id, user_first_name, bot)
                    break;
                case command.commands.info:
                    Game.getInfo(chat_id, bot)
                    break;
                case command.commands.game:
                    Game.startNewGame(chat_id, bot)
                    break;
                case command.commands.help:
                    Common.getHelp(chat_id, bot)
                    break;
                case command.commands.weekend:
                    Weekend.getWeekend(chat_id, bot)
                    break;
                default:
                    Common.getErrorMessage(chat_id, bot)
            }
        }catch(e){
            console.log("Eror",e)
            await bot.sendMessage(chat_id, responses.response.server_error)
        }
    })
    // hadnle form
    bot.on('callback_query', async msg => {
        const data = msg.data
        const chat_id = msg.message.chat.id
        const user_first_name = msg.message.chat.first_name

        switch(data){
            case String(global.chats[chat_id]):
                Game.getRightResult(chat_id, user_first_name, bot)
                break
            case callback_data.callback_data.again: 
                Game.startNewGame(chat_id, bot)
                break
            case callback_data.callback_data.help:
                Common.getHelp(chat_id, bot)
                break
            case callback_data.callback_data.game:
                Game.startNewGame(chat_id, bot)
                break
            case callback_data.callback_data.weekend:
                Weekend.getWeekend(chat_id, bot)
                break
            default:
                Game.getWrongResult(chat_id, bot)
        }
    })
}
//run app
run()