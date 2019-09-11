let express = require('express')
let router = express.Router()

let jwt = require('jsonwebtoken');

let injectToken = require('../middleware/injectToken')

let cols = require('../db/db').collections

let jwtPayLoad={
    isVIP:false,
    userName:undefined,
}

let jwtOption={ //token 约定的配置
    expiresIn:"2 days"
}

const secretKey = require('../secretKey/key')

router.post("/check", (req, res) => {
    const { user, password } = req.body
    let where = {loginName:user,password}

    cols.accountCol.find(where).toArray((err,result)=>{
        if (result && result.length === 1){
            res.json({code:1,token:result[0].token})
        }else{
            res.json({code:0,msg:'用户密码有误'})
        }
    })
    
})

router.post('/isVIP',injectToken,(req,res)=>{
    const isVIP = req.user.isVIP
    res.json({code:1,isVIP})

})

router.post('/register',(req,res) =>{ //注册
    const {user,password} = req.body
    jwtPayLoad.userName = user
    token = jwt.sign(jwtPayLoad,secretKey,jwtOption)

    const accountDoc = {
        loginName:user,
        password:password,
        isVIP:false,
        token
    }
    cols.accountCol.insertOne(accountDoc).then((result) =>{
        if(result.result.ok){
            res.json({code:1,token})
        }else{
            res.json({code:20,msg:'插入用户信息错误'})
        }
    }).catch((err)=>{
        if (err.code===11000){
            res.json({code:20,msg:"重复的用户名"})
        }else{
            console.error(err)
            res.json({code:20,msg:"未知错误，当插入account col"})
        }
    })

})
module.exports = router