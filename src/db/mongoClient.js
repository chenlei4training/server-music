let mongoClient = require('mongodb').MongoClient
//数据库连接字符创
const DB_CONN_STR = 'mongodb://localhost:27017'

//连接 和 测试一下mongdb数据库my_music里account的内容
async function connect() {
    console.log('开始连接数据库')

    try {
        let connection = await mongoClient.connect(DB_CONN_STR,{ useNewUrlParser: true })
        let database = connection.db('my_music')
        
        let accountCol =database.collection('none_empty')

        let count = await accountCol.countDocuments()

        console.log('count:',count)
        return new Promise((resovle,reject) => {
            if(count>0){
                console.log('数据库连接成功')
                resovle(true)
            }else{
                console.log('database can not connect')
                resovle(false)
            }
        })
      
    } catch (err) {
        console.error(err.stack)
        return new Promise((resovle) => {
            resovle(false)
        })
    }
}


module.exports = { connect }