require('dotenv').config();
const express=require('express')
const cors=require('cors');
const router = require('./routes/router');
require('./db/connection');


require('./routes/router')
const server=express()

const PORT=3000||process.env.PORT
 
server.use(cors())
server.use(express.json())
server.use(router)

server.listen(PORT,()=>{
    console.log('bank server started at port 3000'); 
})

server.get('/',(req,res)=>{
    res.send("bank server started")

})
