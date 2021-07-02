//model
const User = require('../db/models.js')

//config
const responses = require('../config/config.json')
const stickers = require('../config/config.json')

//menu
const {startMenu, opts} = require('../options/options')

class Common{
    async getHelp(chat_id, bot){
        await bot.sendSticker(chat_id, stickers.stickers.deamon.help)
        await bot.sendMessage(chat_id, responses.response.help)
    }
    async getErrorMessage(chat_id, bot){
        await bot.sendSticker(chat_id, stickers.stickers.deamon.error)
        await bot.sendMessage(chat_id, responses.response.error, opts)
    }
    async startCommand(chat_id, user_first_name, bot){
        const count = await User.findOne({chatId: chat_id})
        if (!count){
            await User.create({chatId: chat_id})
        }
        await bot.sendSticker(chat_id, stickers.stickers.deamon.welcome)
        await bot.sendMessage(chat_id, `${responses.response.start} ${user_first_name}!`, startMenu)
    }
}

module.exports = new Common()