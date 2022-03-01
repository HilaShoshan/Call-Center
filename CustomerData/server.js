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

function doQuery(query) {
    db.query(query, (err, result, field)=>{
        if(err) {
            return console.log(err)
        }
        return console.log(result)
    })
}

doQuery("DELETE FROM call_center.customerdata")

var customers = ["(1111, 'Rony', 'Cohen', '2000-7-04', 'Haifa', 1, 0, 1, 1)",
                 "(1112, 'Dan', 'Avraham', '1990-4-28', 'Tel-Aviv', 0, 1, 1, 1)",
                 "(1122, 'Harel', 'Shwarts', '1440-1-01', 'Nahariya', 0, 0, 0, 1)",
                 "(1222, 'Efrat', 'Saada', '1667-5-13', 'Jerusalem', 1, 1, 1, 1)",
                 "(2222, 'Simon', 'Levayev', '1992-12-12', 'Bnei-Brak', 0, 1, 1, 1)"]

for (let i = 0; i < customers.length; i++) {
    doQuery("INSERT INTO call_center.customerdata \
        (CustomerID, FirstName, LastName, DateOfBirth, City, Gender, Internet, CableTV, Cellular) \
        VALUES " + customers[i])
}

doQuery("SELECT * FROM call_center.customerdata")

//create connection
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
