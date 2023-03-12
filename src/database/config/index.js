require('dotenv').config();
const mongoose = require('mongoose');
const connectionString = process.env.URI_DB || 'mongodb://localhost:27017/Ecommerce'

class Mongo{
    conectionMongo(){
        mongoose.connect(connectionString,{useNewUrlParser: true, useUnifiedTopology: true}) 
        
    }

    stateMongoConection (){
        this.conectionMongo()
        mongoose.connection.on('open', ()=>{
            console.log('Conectado a Mongo correctamente')
        })        
        mongoose.connection.on('error', (err)=>{
            console.log(err)
        })
        mongoose.connection.on('disconnected', async ()=>{
            this.conectionMongo();
        })
    }
}


module.exports = { Mongo }





