const jwt=require('jsonwebtoken')
const logged=(req,res,next)=>{
    const token=req.headers['token']
    console.log(token);
   const jwtresponse= jwt.verify(token,"superkey")
   
   console.log(jwtresponse.loggedacno);
   req.debitacno=jwtresponse.loggedacno
    next()
}

module.exports={
    logged
}