const express = require('express')
const path = require('path')
const app = express()

const KafkaModel = require('./models/kafka')
const controller = require('./controllers/calls')  // call back functions

app.use(express.static(path.join(__dirname,'public')))
app.set('view engine','ejs')
app.engine('html', require('ejs').renderFile)

const PORT = 3001 

app.use(express.urlencoded({extended: true}))

app.use(express.json())

async function init() {
  let kafka = new KafkaModel(controller.insertCall)
}

app.get('/', function (req, res) {
  res.render('pages/index')
})

app.get('/train', controller.trainModel_cb)

app.post('/predict', controller.predict_cb) 

// app.post('/confusion_matrix', controller.UpdateMatrix_cb)


app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})

init()