const { mongoDbClient } = require('../models/mongodb')
//const BigMLModel = require('./models/bigml')

var url = "mongodb+srv://callcenter:callcenter222@callcenter.f27zc.mongodb.net/callsDB?retryWrites=true&w=majority"
const mongoConf = {
    url: url,
    dbName: "callsDB"
}

async function insertCall(callRecord) {
    let db = new mongoDbClient()
    await db.connect(mongoConf)
    await db.insertDocument("calls", callRecord)
    await db.close()
    //let bigml = new BigMLModel()
}

module.exports = {
    insertCall
}