const CalculateHalper = require('../helpers/CalculateHalper.js')
const weekends = require('../options/weekend.js')

class Weekend{
    async getWeekend (chat_id, bot){
        const random_weekend = CalculateHalper.randomIntegerNumber(0, weekends.length - 1)
        await bot.sendMessage(chat_id, weekends[random_weekend].occupation)
        await bot.sendPhoto(chat_id, weekends[random_weekend].sticker)
    }
}

module.exports = new Weekend()