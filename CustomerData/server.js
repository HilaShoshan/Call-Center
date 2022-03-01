const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
 
 
//use express static folder
app.use(express.static("./public"))
 
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))
 
// Database connection
const db = mysql.createConnection({
    host: "localhost",
    user: "newuser",
    password: "111",
    database: "call_center"
})
 
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})

db.query("SELECT * FROM call_center.customerData", (err, result, field)=>{
    if(err) {
        return console.log(err)
    }
    return console.log(result)
})

//create connection
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
