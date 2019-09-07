let mongoClient = require('mongodb').MongoClient
//数据库连接字符创
const DB_CONN_STR = 'mongodb://localhost:27017'

//连接 和 测试一下mongdb数据库my_music里account的内容
async function connect() {
    console.log('开始连接数据库')

    try {
        let connection = await mongoClient.connect(DB_CONN_STR)
        let database = connection.db('my_music')
        let accountCol = database.collection('account')

        //测试一下 account里有没document
        let cursor = accountCol.find({}).limit(1)

        let array = await cursor.toArray()

        if(array.length>0){
            console.log('doc',array[0])
            return new Promise((resovle,reject) => {
                console.log('数据库连接成功')
                resovle(true)
            })
        }else{
            return new Promise((resovle) => {
                resovle(false)
            })
        }
      
    } catch (err) {
        console.err(err.stack)
        return new Promise((resovle) => {
            resovle(false)
        })
    }
}

module.exports = { connect }