//libs
require('dotenv').config()
const mongoose = require('mongoose')

//env
const db = process.env.DB_HOST

//bot
const startBot = require('./server.js')

// main
const run = async () =>{
    try{
        await mongoose.connect(db || "mongodb+srv://admin:admin@cluster0.wm39g.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", 
            {
                useUnifiedTopology: true, 
                useNewUrlParser: true
            })
    }catch(e){
        console.log('ERROR', e)
    }
    startBot()
}
//run app
run()