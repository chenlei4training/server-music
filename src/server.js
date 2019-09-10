const express = require('express')
const bodyParser = require('body-parser')
const userRouter = require('./router/user')

const mongoDB = require('./db/db')

mongoDB.connect().then((result) => {
    if (result) {
        console.log('success connected')
        startExpress()
    } else {
        console.log('failed to connected')
        console.log('and no express started')
    }
})

function startExpress() {

    const app = express()
    // app.use('*', (req, res, next) => {
    //     res.header('Access-Control-Allow-Origin', '*');
    //     res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , token');
    //     next()
    // })

    let allowCrossDomain = (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , token');
        next()
    }
    app.use(allowCrossDomain)

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

    //content type  application/json
    app.use(bodyParser.json())

    //跟目录路由， 也就是‘/’的处理方法,'/'的handler
    app.get("/", (request, response) => {
        response.send('这是我的测试服务器，你想看什么')
    })

    app.use('/user', require('./router/user'))



    //404
    app.use(function (req, res, next) {
        res.status(404).send("Sorry can't find that!")
    })

    //500 服务器端bug
    app.use(function (err, req, res, next) {
        console.error(err.stack)

        if (err.name === 'UnauthorizedError') {
            res.json({ code: 0, msg: 'token 有问题,可能是过期了' })
            return
        }

        res.status(500).send('Something broke!')
    })

    const portNum = 2019
    //``````111 `表示js es6的template模板
    app.listen(portNum, () => console.log(`Example app listening on port ${portNum}!`))

}