const express = require('express')
const app = express()

const KafkaModel = require('./models/kafka')
const controller = require('./controllers/calls')  // call back function dending to kafka

app.use(express.static('public'))
app.set('view engine','ejs')

const PORT = 3001

app.use(express.urlencoded({extended: true}))

app.use(express.json())

async function init() {
  let kafka = new KafkaModel(controller.insertCall)
}

app.get('/', (req, res) => {
  var production = {product: "icecream", quantity: 90}
  res.render('pages/show', production)
}) 

app.get('/train', controller.trainModel_cb)

app.get('/predict', controller.predict_cb)  // change to post!


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})

init()