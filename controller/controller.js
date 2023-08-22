const users=require('../models/userSchema')
const jwt=require('jsonwebtoken')

exports.register=async(req,res)=>{
   console.log(req.body);

   const{username,acno,password}=req.body
   if (!username || !acno || !password){
    res.status(403).json("all inputs required")
   }
  try{
    const response=await users.findOne({acno})
    
if(response){
  res.status(406).json("user already exist")
}
else{
  const newuser=new users({
    username,
    password,
    acno,
    balance:5000,
    transactions:[]
  })
  await newuser.save()
  res.status(200).json(newuser)
}
  }
  catch(error){
    res.status(401).json(error)
  }

}  
exports.login=async(req,res)=>{
  const {acno,password}=req.body
  try{
    const preuser=await users.findOne({acno,password})
    if(preuser){
     const token=jwt.sign({
      loggedacno:acno
     },"superkey")
      res.status(200).json({preuser,token})
      
    }
    else(
      res.status(404).json("invalid account or password")
    )
  }
  catch(error){
    res.status(401).json(error)
  }
}
exports.balance=async(req,res)=>{
let acno=req.params.acno
try{
const person=await users.findOne({acno})
res.status(200).json(person.balance)
}
catch(error){

  res.status(401).json(error)
}

}
exports.transfer=async(req,res)=>{
  const {creditacno,creditamount,password}=req.body
  let amt=Number(creditamount)
  const {debitacno}=req
  const debituser=await users.findOne({acno:debitacno})
 console.log(debituser);
 
 
 const credituser= await users.findOne({acno:creditacno})
 console.log(credituser);

 if(debituser && credituser){
  debitbalance=debituser.balance
  creditbalance=credituser.balance
  if(debitbalance>=amt){
    debitbalance-=amt
   console.log(debitbalance);
   debituser.balance=debitbalance
    debituser.transactions.push({
      type:"debit", debitamount:amt,from:debitacno,to:creditacno
    })
    await debituser.save().then(item => {
     
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    })
   console.log('kaka');
   console.log(debituser);
   creditbalance+=amt
   credituser.balance=creditbalance
   credituser.transactions.push({
    type:"credit", debitamount:creditamount,from:debitacno,to:creditacno
  })
  await credituser.save().then(item => {
   
  }) 
  .catch(err => {
    res.status(400).send("unable to save to database");
  })
   //console.log(creditbalance);
   console.log("success");
   res.status(200).json("fund transfered successfully")
   

  }
  else{
    res.status(406).json("insufficient balance")
  }
 
}  
else{
res.status(400).json("invalid credit or debit user")
} 
 
 

}

//statement

exports.statement=async(req,res)=>{
  const acno=req.debitacno
  console.log(acno);
  try{
    const person=await users.findOne({acno})
  console.log(person);
  res.status(200).json(person.transactions)
  }
  catch(error){
    res.status(401).json(error)
  }

}
exports.delete=async(req,res)=>{
  const acno=req.debitacno
  console.log(acno);
  try{
    const removeitem=await users.deleteOne({acno})
    res.status(200).json("Removed Successfully")
  }
  catch(error){
    res.status(401).json(error)
  }
}