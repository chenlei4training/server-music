//String for connection mongo db
const CON_STR="mongodb://localhost:27017"
const mongoClient = require('mongodb').MongoClient
async function connect(){
    let connection = await mongoClient.connect(CON_STR, {useNewUrlParser: true,useUnifiedTopology:true })
    let db = connection.db('my_music')
    let collection = db.collection('none_empty')

    let count = await collection.countDocuments()
    console.log('count',count)

    if(count>0){
        return new Promise((resolve,reject)=>{
            resolve(true)
        })
    }else{
        return new Promise((resolve,reject)=>{
            resolve(false)
        })
    }
}

module.exports={connect}