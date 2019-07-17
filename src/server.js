const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./router/user')

const app = express()
app.use('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , token');
    next()
})

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


//根目录测试
app.get('/', function (req, res) {
    res.send("希望你知道我的服务入口名称")
})

//测试 req.params 和  req.query
app.get('/about/:id', function (req, res) {
    if (!req.body) return res.sendStatus(400)
    res.send('welcome id=' + req.params.id + ' user=' + req.query.user)
});


app.use('/user', userRouter);




app.listen(2019, () => console.log('Example app listening on port 2019!'))