const callback_data = require('../config/config.json')
const menu_text = require('../config/config.json')

// send form
module.exports = {
    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "7", callback_data: '7'},{text: "8", callback_data: '8'},{text: "9", callback_data: '9'}],
                [{text: "4", callback_data: '4'},{text: "5", callback_data: '5'},{text: "6", callback_data: '6'}],
                [{text: "1", callback_data: '1'},{text: "2", callback_data: '2'},{text: "3", callback_data: '3'}],
                [{text: "0", callback_data: '0'}],
            ]
        })
    },
    againPlay: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: menu_text.menu_text.again_menu, callback_data: callback_data.callback_data.again}],
            ]
        })
    },
    startMenu: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: menu_text.menu_text.start_menu.help, callback_data: callback_data.callback_data.help},
                {text: menu_text.menu_text.start_menu.start_new_game, callback_data: callback_data.callback_data.game}],
                [{text: menu_text.menu_text.start_menu.weekend, callback_data: callback_data.callback_data.weekend}],
            ]
        })
    },
    opts: {
        reply_markup: JSON.stringify({
          keyboard: [
            [{text: 'Location', request_location: true}],
            [{text: 'Contact', request_contact: true}],
          ],
          resize_keyboard: true,
          one_time_keyboard: true,
        }),
      }
}