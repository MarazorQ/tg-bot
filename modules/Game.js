//model
const User = require('../db/models.js')

//config
const responses = require('../config/config.json')
const stickers = require('../config/config.json')
const CalculateHalper = require('../helpers/CalculateHalper.js')

//menu
const {gameOptions, againPlay} = require('../options/options')

class Game{
    async startNewGame(chat_id, bot){
        await bot.sendMessage(chat_id, responses.response.game_first)
        const randomNubmer = Math.floor(Math.random() * 10)
        global.chats[chat_id] = randomNubmer
        console.log(randomNubmer)
        await bot.sendSticker(chat_id, stickers.stickers.deamon.game)
        await bot.sendMessage(chat_id, responses.response.game_second, gameOptions)
    }
    async getInfo(chat_id, bot){
        const user = await User.find({chatId: chat_id})
        const wins = CalculateHalper.caclucationWins(user[0].right, user[0].wrong)
        await bot.sendSticker(chat_id, stickers.stickers.deamon.info)
        await bot.sendMessage(chat_id, `${responses.response.info_first} ${user[0].right} ${responses.response.info_count}, ${responses.response.info_second} ${user[0].wrong} ${responses.response.info_count}. ${responses.response.win_rate} ${wins}. ${wins >= 50? responses.response.win_rate_message_nice: responses.response.win_rate_message_bad}`)
    }
    
    async getRightResult(chat_id, user_first_name, bot){
        await User.findOne({chatId: chat_id}, (e, doc) =>{
            doc.right++
            doc.save()
        })
        await bot.sendSticker(chat_id, stickers.stickers.deamon.win)
        await bot.sendMessage(chat_id, `${responses.response.onSend.success_first} ${user_first_name}, ${responses.response.onSend.success_second} ${chats[chat_id]}`)
    }
    
    async getWrongResult(chat_id, bot){
        await User.findOne({chatId: chat_id}, (e, doc) =>{
            doc.wrong++
            doc.save()
        })
        await bot.sendSticker(chat_id, stickers.stickers.deamon.fail)
        await bot.sendMessage(chat_id, `${responses.response.onSend.fail_first} ${global.chats[chat_id]}, ${responses.response.onSend.fail_second}`, againPlay)
    }
}
module.exports = new Game()