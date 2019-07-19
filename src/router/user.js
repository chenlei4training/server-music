let express = require('express')
let router = express.Router()

let jwt = require('jsonwebtoken');

let injectToken = require('../middleware/injectToken')

let jwtPayLoad={
    isVIP:true,
    //isAdmin:true
    userName:undefined,
}

let jwtOption={ //token 约定的配置
    expiresIn:"2 days"
}

const secretKey = require('../secretKey/key')

//TODO 增加 json web token
router.post("/check", (req, res) => {
    const { user, password } = req.body
    //res.json({user,password})

    if(user === 'superman' && password ==='123'){
        jwtPayLoad.userName = user
        let token = jwt.sign(jwtPayLoad,secretKey,jwtOption)
        res.json({code:1,token})

    }else{
        //status
        res.json({code:0,msg:"用户密码错误"})
    }
})

router.post('/isVIP',injectToken,(req,res)=>{
    const isVIP = req.user.isVIP
    res.json({code:1,isVIP})

})
module.exports = router