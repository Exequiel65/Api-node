require('dotenv').config();

const express = require('express');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 3001;
const { Mongo} = require('./database/config');
const db = new Mongo;

app.use(express.json());
app.use(express.urlencoded( {extended :false}));
app.use(morgan('dev'));

db.stateMongoConection();



// Require routes
const index = require('./routes/index');
const auth = require('./routes/auth');



//use Routes
app.use('/', index)
app.use('/auth', auth)




app.listen(PORT, ()=> {
    console.log(`Servidor corriendo en el puerto ${PORT} \nhttp://localhost:${PORT}`)
})








