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
                [{text: "Играть еще раз", callback_data: '/again'}],
            ]
        })
    },
    startMenu: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "Возможности чата", callback_data: '/help'},{text: "Начать игру", callback_data: '/game'}],
                [{text: "Как провести время?", callback_data: '/weekend'}],
            ]
        })
    }
}