const express = require('express')
const app = express()

//const MongoDBModel = require('./models/mongodb')
const KafkaModel = require('./models/kafka')
//const BigMLModel = require('./models/bigml')

//let db = new MongoDBModel()
let kafka = new KafkaModel()
//let bigml = new BigMLModel()

const PORT = 3001




app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})
