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
    host: "mysql5045.site4now.net",
    user: "a83a40_center",
    password: "callcenter111",
    database: "db_a83a40_center" 
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

//create connection

const PORT = process.env.PORT || 3306
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))

// create customerdata table

/*
doQuery("DELETE FROM customerdata")

var customers = ["(1111, 'Rony', 'Cohen', '2000-7-04', 'Haifa', 1, 0, 1, 1)",
                 "(1112, 'Dan', 'Avraham', '1990-4-28', 'Tel-Aviv', 0, 1, 1, 1)",
                 "(1122, 'Harel', 'Shwarts', '1440-1-01', 'Nahariya', 0, 0, 0, 1)",
                 "(1222, 'Efrat', 'Saada', '1667-5-13', 'Jerusalem', 1, 1, 1, 1)",
                 "(2222, 'Simon', 'Levayev', '1992-12-12', 'Bnei-Brak', 0, 1, 1, 1)"]

for (let i = 0; i < customers.length; i++) {
    doQuery("INSERT INTO customerdata \
        (CustomerID, FirstName, LastName, DateOfBirth, City, Gender, Internet, CableTV, Cellular) \
        VALUES " + customers[i])
}

doQuery("SELECT * FROM customerdata")
*/

// create calldata table

///doQuery("DELETE FROM calldata")

//simulator

// for loop that generats calls

// doQuery("SELECT * FROM test_table")

