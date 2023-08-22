const express=require('express')
const middleware=require('../middleware/routerspecific')

const router=express.Router()
const controller=require('../controller/controller')

 router.post('/employee/register',controller.register)
 router.post('/employee/login',controller.login)
 router.get(`/user/balance/:acno`,middleware.logged,controller.balance)
 router.post('/user/transfer',middleware.logged,controller.transfer)
router.get('/user/statement',middleware.logged,controller.statement)
router.delete('/user/delete',middleware.logged,controller.delete)
module.exports=router

