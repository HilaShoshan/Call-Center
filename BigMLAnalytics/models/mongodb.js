var mongoClient = require("mongodb").MongoClient
var ObjectId = require("mongodb").ObjectId

function isObject(obj) {
  return Object.keys(obj).length > 0 && obj.constructor === Object
}

class mongoDbClient {
  async connect(conn) {
    try {
      this.connection = await mongoClient.connect(conn.url, { useNewUrlParser: true })
      this.db = this.connection.db(conn.dbName)
      console.log("MongoClient Connection successfull.")
    }
    catch (ex) {
      console.error("Error caught,", ex)
    }
  }

  async insertDocument(coll, doc) {
    try {
      if (!isObject(doc)) {
        throw Error("mongoClient.insertDocument: document is not an object")
      }
      console.log("inserting", doc)
      return await this.db.collection(coll).insertOne(doc)
    }
    catch (e) {
      logger.error("MongoClient.InsertDocument: Error caught,", e)
      return Promise.reject(e)
    }
  }

  async close() {
    try {
      await this.connection.close()
      console.log("MongoClient closed successfull.")
    }
    catch (ex) {
      console.error("MongoClient closed failed.")
      console.error("Error caught,", ex)
    }
  }

  async findAll(coll) {
    try {
      return await this.db.collection(coll).find({}).toArray()
    }
    catch(e) {
      console.error("Error caught,", ex)
    }
  }
}

module.exports = {
  mongoDbClient,
  ObjectId
}