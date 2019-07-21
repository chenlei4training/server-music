let accoutDB = require('./account')

//引入mongodb模块，获得客户端对象
var MongoClient = require('mongodb').MongoClient;
//连接字符串
var DB_CONN_STR = 'mongodb://localhost:27017/';


//使用客户端连接数据，并指定完成时的回调方法

async function connect() {
    try {
        let database = null
        let accountCol = null
        console.log('connecting to db')
        let connection = await MongoClient.connect(DB_CONN_STR, { useNewUrlParser: true });
        console.log('connected')
        database = connection.db('music')
        // accoutDB.db = database

        accountCol = database.collection('account')

        //assign accoutDB.col
        accoutDB.col = accountCol

        //test db find
        let cursor = accountCol.find().limit(1)
        let count = await cursor.count()
        cursor.toArray((err, result) => {
            if (err) throw err
            result.forEach((doc) => {
                console.log('doc', doc)
            })
        })
        return new Promise((resolve, reject) => {
            resolve(true)
        })
    } catch (err) {
        console.error(err.stack)
        return new Promise((resolve, reject) => {
            resolve(false)
        })
    }
}


module.exports = {
    connect
}







