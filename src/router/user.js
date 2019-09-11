let express = require('express')
let router = express.Router()

let jwt = require('jsonwebtoken');

let injectToken = require('../middleware/injectToken')

let cols = require('../db/db').collections

let jwtPayLoad = {
    isVIP: false,
    //isAdmin:true
    userName: undefined,
}

let jwtOption = { //token 约定的配置
    expiresIn: "2 days"
}

const secretKey = require('../secretKey/key')

//TODO 增加 json web token
router.post("/check", (req, res) => {
    const { user, password } = req.body
    //res.json({user,password})
    let where = { loginName: user, password }

    cols.accountCol.find(where).toArray((err, result) => {
        if (result && result.length > 0) {
            //有数据库返回的结果，说明用户密码正确
            res.json({ code: 1, token:result[0].token })
        } else {
            //status
            res.json({ code: 0, msg: "用户密码错误" })
        }
    })
})

router.post('/register', (req, res) => {
    const {user,password} = req.body
    jwtPayLoad.userName = user
    
    token = jwt.sign(jwtPayLoad, secretKey, jwtOption)
    const accoutDoc = {
        loginName: user,
        password: password,
        isVIP: false,
        token
    }
    cols.accountCol.insertOne(accoutDoc)
        .then((result) => {
            if (result.result.ok) {
                res.json({ code: 1, token})
            } else {
                res.json({ code: 20, msg: '数据库错误,无法插入新用户' })
            }
        })
    .catch((err)=>{
        if(err.code ===11000){
            res.json({ code: 20, msg: '用户名重复' })
        }else{
            console.error('db insert account error',err)
        }
    })

})

router.post('/register1', (req, res) => {
    const { user, password } = req.body
    let where = { loginName: user }

    accoutDB.col.find(where).toArray((err, resulst) => {
        if (resulst.length > 0) {
            res.json({ code: 0, msg: '该用户名已经被使用了，请换一个用户名' })
        } else {
            jwtPayLoad.userName = user
            let token = jwt.sign(jwtPayLoad, secretKey, jwtOption)

            const accoutDoc = {
                loginName: user,
                password: password,
                isVIP: jwtPayLoad.isVIP,
                token,
            }
            accoutDB.col.insert(accoutDoc).then((result) => {
                if (result.insertedCount === 1) {
                    res.json({ code: 1, token })
                } else {
                    res.json({ code: 20, msg: '数据库错误,无法插入新用户' })
                }
            })
        }
    })
})


router.post('/isVIP', injectToken, (req, res) => {
    const isVIP = req.user.isVIP
    res.json({ code: 1, isVIP })


})
module.exports = router