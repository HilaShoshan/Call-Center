const express = require('express')
const app = express()

const KafkaModel = require('./models/kafka')
const { insertCall } = require('./controllers/calls')

const PORT = 3001

async function init() {
  let kafka = new KafkaModel(insertCall)
}

// app.listen(PORT, () => {
//   console.log(`Server is running at port ${PORT}`)
// })

init()