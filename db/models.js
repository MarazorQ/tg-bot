const mongoose = require('mongoose')

const User = new mongoose.Schema({
    chatId: {type: String, unique: true},
    right: {type: Number, default: 0},
    wrong: {type: Number, default: 0}
})

module.exports = mongoose.model('User', User)