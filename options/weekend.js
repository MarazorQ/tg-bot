const responses = require('../config/config.json')
const stickers = require('../config/config.json')

const weekends = [
    {occupation: responses.response.weekend.cinema, sticker: stickers.stickers.weekend.cinema},
    {occupation: responses.response.weekend.park, sticker: stickers.stickers.weekend.park},
    {occupation: responses.response.weekend.aquapark, sticker: stickers.stickers.weekend.aquapark},
    {occupation: responses.response.weekend.beach, sticker: stickers.stickers.weekend.beach},
    {occupation: responses.response.weekend.home, sticker: stickers.stickers.weekend.home},
    {occupation: responses.response.weekend.amusement_park, sticker: stickers.stickers.weekend.amusement_park},
    {occupation: responses.response.weekend.shopping_center, sticker: stickers.stickers.weekend.shopping_center},
    {occupation: responses.response.weekend.bicycle, sticker: stickers.stickers.weekend.bicycle},
    {occupation: responses.response.weekend.restaurant, sticker: stickers.stickers.weekend.restaurant},
    {occupation: responses.response.weekend.skates, sticker: stickers.stickers.weekend.skates},
    {occupation: responses.response.weekend.hike, sticker: stickers.stickers.weekend.hike},
    {occupation: responses.response.weekend.fishing, sticker: stickers.stickers.weekend.fishing},
    {occupation: responses.response.weekend.hookah, sticker: stickers.stickers.weekend.hookah},
    {occupation: responses.response.weekend.bar, sticker: stickers.stickers.weekend.bar}
]
module.exports = weekends