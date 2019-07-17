let express = require('express')
let router = express.Router()


router.post("/check", (req, res) => {
    const { user, password } = req.body
    res.json(req.body)
})
module.exports = router