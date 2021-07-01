require('dotenv').config()

const TgBotAPI = require('node-telegram-bot-api')
const mongoose = require('mongoose')

const tg_token = process.env.TG_TOKEN
const db = process.env.DB_HOST
const User = require('./db/models.js')
const stickers = require('./config/config.json')
const command = require('./config/config.json')
const descriptions = require('./config/config.json')
const responses = require('./config/config.json')
const callback_data = require('./config/config.json')

const {gameOptions, againPlay} = require('./options/options')

const chats = {}

const startNewGame = async (chat_id) =>{
    await bot.sendMessage(chat_id, responses.response.game_first)
    const randomNubmer = Math.floor(Math.random() * 10)
    chats[chat_id] = randomNubmer
    console.log(randomNubmer)
    await bot.sendSticker(chat_id, stickers.stickers.deamon.game)
    await bot.sendMessage(chat_id, responses.response.game_second, gameOptions)
}

const bot = new TgBotAPI(tg_token, {polling: true})
const user = null

const run = async () =>{
    try{
        await mongoose.connect(db, 
            {
                useUnifiedTopology: true, 
                useNewUrlParser: true
            })
        .then(() => console.log('MongoDB success connection'))
        .catch(err => console.log(err))
    }catch(e){
        console.log('ERROR', e)
    }

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

        try{
            // send response to user 
            switch(user_text){
                case command.commands.start:
                    await User.create({chatId: chat_id})
                    await bot.sendSticker(chat_id, stickers.stickers.deamon.welcome)
                    await bot.sendMessage(chat_id, `${responses.response.start} ${user_first_name}!`)
                    break;
                case command.commands.help:
                    const user = await User.find({chatId: chat_id})
                    await bot.sendSticker(chat_id, stickers.stickers.deamon.help)
                    await bot.sendMessage(chat_id, `${responses.response.help_first} ${user[0].right} ${responses.response.help_count}, ${responses.response.help_second}  ${user[0].wrong} ${responses.response.help_count}`)
                    break;
                case command.commands.game:
                    startNewGame(chat_id)
                    break;
                default:
                    await bot.sendSticker(chat_id, stickers.stickers.deamon.error)
                    await bot.sendMessage(chat_id, responses.response.error)
            }
        }catch(e){
            console.log("Eror",e)
            await bot.sendMessage(chat_id, 'произошла ошибка')
        }
    })
    // hadnle form
    bot.on('callback_query', async msg => {
        const data = msg.data
        const chat_id = msg.message.chat.id
        const user_first_name = msg.message.chat.first_name

        switch(data){
            case String(chats[chat_id]):
                await User.findOne({chatId: chat_id}, (e, doc) =>{
                    doc.right++
                    doc.save()
                })
                await bot.sendSticker(chat_id, stickers.stickers.deamon.win)
                await bot.sendMessage(chat_id, `${responses.response.onSend.success_first} ${user_first_name}, ${responses.response.onSend.success_second} ${chats[chat_id]}`)
                break
            case callback_data.callback_data.again: 
                startNewGame(chat_id)
                break
            default:
                await User.findOne({chatId: chat_id}, (e, doc) =>{
                    doc.wrong++
                    doc.save()
                })
                await bot.sendSticker(chat_id, stickers.stickers.deamon.fail)
                await bot.sendMessage(chat_id, `${responses.response.onSend.fail_first} ${chats[chat_id]}, ${responses.response.onSend.fail_second}`, againPlay)
        }
    })
}
//run app
run()