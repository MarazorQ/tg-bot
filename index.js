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
        await mongoose.connect(db, 
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