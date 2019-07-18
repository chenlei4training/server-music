let express = require('express')
let router = express.Router()

//TODO 增加 json web token
router.post("/check", (req, res) => {
    const { user, password } = req.body
    res.json({user,password})
})
module.exports = router