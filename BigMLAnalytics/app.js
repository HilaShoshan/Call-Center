const express = require('express')
const app = express()

const KafkaModel = require('./models/kafka')
const controller = require('./controllers/calls')  // call back function dending to kafka

const PORT = 3001

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json())

async function init() {
  let kafka = new KafkaModel(controller.insertCall)
}

app.get('/train', controller.trainModel_cb)

app.post('/predict', controller.predict_cb)


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})

init()