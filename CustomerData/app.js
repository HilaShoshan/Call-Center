const express = require('express')
const Handlers = require('./controllers/handlers')
const app = express()

const PORT = 3000

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.json())

app.get('/:id', Handlers.getId_cb)

app.post('/increaseNumOfCalls', Handlers.increaseCalls_cb)

app.post('/addCustomer', Handlers.addCustomer_cb)

app.post('/sendCall', Handlers.sendCall_cb)

app.delete('/:id', Handlers.deleteCustomer_cb)

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`)
})