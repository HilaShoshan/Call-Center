const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
const { YEAR } = require('mysql/lib/protocol/constants/types')
const { consumers } = require('stream')
 
 
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
    console.log("QUERY: ", query)
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

// doQuery("SELECT * FROM customerdata")

// simulator of calls

function getRndInteger(min, max) {
    /**
     * get a random number between min and max (both included)
     */
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function getRndDate(birth, yearOfBirth) {
    /** 
     * get a random date 
     * if birth is true, we should return a date of birth of a customer in the company
     * we suppose that customers' age is between 14-120
     * else, its a date of some call
     * we suppose that the company exists since 2002
     */
    if (birth) {
        var year = getRndInteger(1900,2008)
    }
    else {  // call time
        var year = getRndInteger(Math.max(2002,yearOfBirth+14),2022)
    }
    var today = new Date()
    if (year == 2022) 
        var max_month = today.getMonth()+1  // for not exceeding today's date
    else 
        var max_month = 12
    var month = getRndInteger(1,max_month)
    if (year == 2022 && month == max_month) 
        var max_day = today.getDay() 
    else {
        var max_day = 31
    }
    if (month == 2) {
        var day = getRndInteger(1,Math.min(28,max_day))
    }
    else if (month == 4 || month == 6 || month == 9 || month == 11) { // 30 days
        var day = getRndInteger(1,Math.min(30,max_day))
    }
    else {  // 31 days
        var day = getRndInteger(1,Math.min(31,max_day))
    }
    return [year, month-1, day]
}

// get a random call-time
// suppose that the working hours are 8:00-18:00
function getRndTime(dateOfBirth) {
    var hour = getRndInteger(8,17)
    var minute = getRndInteger(0,59)
    var second = getRndInteger(0,59)
    var date = getRndDate(false, dateOfBirth.getFullYear())
    return new Date(date[0], date[1], date[2], hour, minute, second)
}

function getDifferenceInYears(date1, date2) {
    const diffInMs = Math.abs(date2 - date1);
    return diffInMs / (1000 * 60 * 60 * 24 * 365);
}

function myConvert(datetime_str) {
    const splitted = datetime_str.split(", ")  // split the date and the time 
    const datesplitted = splitted[0].split(".")
    var yyyy = datesplitted[2]
    var mm = datesplitted[1]
    var dd = datesplitted[0]
    if (mm.length == 1) {
        mm = "0" + mm
    }
    if (dd.length == 1) {
        dd = "0" + dd
    }
    var date = yyyy + mm + dd
    var ampm = "AM"
    var hh = splitted[1].slice(0,splitted[1].length-6)  // the hour only (hh)
    if (parseInt(hh) > 12) {
        var int_hour = parseInt(hh) - 12
        hh = int_hour.toString()
        ampm = "PM"
    }
    if (hh.length == 1) {
        hh = "0" + hh
    }
    var ms = splitted[1].slice(splitted[1].length-6)  // the rest of the string, which is :mm:ss
    return date + " " + hh + ms + " " + ampm
}

const periods = ["holidays", "summer vacations", "normal"]
const cities = ["Jerusalem", "Tel-Aviv", "Haifa", "Nahariya", "Petah-Tikva", "Ashdod", "Netanya", "Bnei-Brak", "Holon", "Beersheba"]
const topics = ["join", "service", "complaint", "disconnect"]

for (let i = 0; i < 2; i++) {
    var customerID = getRndInteger(1000,9999)
    // if does not exist:
        var date = getRndDate(true)
        var dateOfBirth = new Date(date[0], date[1], date[2])
        var numOfCalls = 0
        var gender = getRndInteger(0,1)  // 0 = male, 1 = female
        var city = cities[getRndInteger(0,cities.length-1)]
        // add it to customerdata !
        var topic = "join"
    //
    var period = periods[getRndInteger(0,periods.length-1)]
    var callTime = getRndTime(dateOfBirth)
    var age = Math.floor(getDifferenceInYears(dateOfBirth, callTime))  // age while calling
    var internet = getRndInteger(0,1)
    var cableTV = getRndInteger(0,1)
    if (internet == 0 && cableTV == 0) 
        var cellular = 1
    else 
        var cellular = getRndInteger(0,1)

    var record = "(" + i + "," + customerID + ",'" + period + "','" + myConvert(callTime.toLocaleString()) + "'," + numOfCalls + "," + internet + "," + cableTV + "," + cellular + ",'" + topic + "'," + age + "," + gender + ",'" + city + "'" + ")"
    // console.log(record)
    
    // doQuery("INSERT INTO calldata (callID, customerID, period, callTime, numOfCalls, internet, cableTV, cellular, topic, age, gender, city) VALUES " + record)
}

// doQuery("SELECT * FROM test_table")

