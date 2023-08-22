const mongoose=require('mongoose')

const connectionstring=process.env.database

mongoose.connect(connectionstring,{
    

    useNewUrlParser: true,
    useUnifiedTopology: false,
    useUnifiedTopology: true
   
    
}).then(()=>{
    console.log('connected successfully');
}).catch(()=>{
    console.log('failed connection');
})