const mongoose = require('mongoose');
const mongoDbUrl = 'mongodb://localhost:27017/hotels';

mongoose.connect(mongoDbUrl, {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

//define event connection


 

db.on('connected', ()=>{
    console.log('Connected to mongodb');
    
});

db.on('error', (err)=>{
    console.log('error in  mongodb',err );
    
});

db.on('disconnected', ()=>{
    console.log('Disconnected to mongodb');
    
});


module.exports = db;
