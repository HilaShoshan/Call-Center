// BEN HILA

const utils = require("./utils")
const ApiService = require('./api-service')
const HOST = 'http://localhost:3000'

// arrays
periods = ["holidays", "summer vacations", "normal"]
cities = ["Jerusalem", "Tel-Aviv", "Haifa", "Nahariya", "Petah-Tikva", "Ashdod", "Netanya", "Bnei-Brak", "Holon", "Beersheba"]
topics = ["service", "complaint", "disconnect"]  // topics for an exists customer

class CallsSimulator {

    getCustomerID() {
        /**
         * Returns a 3-digits ID of the customer that make the call
         */
        return utils.getRndInteger(100, 999) 
    }

    getCallProduct() {
        /**
         * Returns a list of 0s and 1s that represents 
         * what product/s is/are being discussed in the conversation
         */
        var internet = utils.getRndInteger(0, 1)
        var cableTV = utils.getRndInteger(0, 1)
        if (internet == 0 && cableTV == 0) {
            var cellular = 1
        }
        else {
            var cellular = utils.getRndInteger(0, 1)
        }
        return {internet, cableTV, cellular}
    }

    getRndBirthday() {
        /** 
         * returns a random date of birth of a customer in the company
         * we suppose that customers' age is 14+
         */
        var year = utils.getRndInteger(1900, 2009)
        var month = utils.getRndInteger(1, 12)
        if (month == 2) {
            var day = utils.getRndInteger(1, 28)
        }
        else if (month == 4 || month == 6 || month == 9 || month == 11) { // 30 days
            var day = utils.getRndInteger(1, 30)
        }
        else {  // 31 days
            var day = utils.getRndInteger(1, 31)
        }
        return new Date(year, month-1, day)
    }

    createCallJSON(customerId, period, callTime, callDuration, numOfCalls, internet, cableTV, cellular, topic, age, gender, city) {
        var callObj = new Object()
        callObj.customerId = customerId
        callObj.period = period
        callObj.callTime = callTime
        callObj.callDuration = callDuration
        callObj.numOfCalls = numOfCalls
        callObj.internet = internet
        callObj.cableTV = cableTV
        callObj.cellular = cellular
        callObj.topic = topic
        callObj.age = age
        callObj.gender = gender
        callObj.city = city
        return JSON.stringify(callObj)
    }

    // TODO: add a built-in bias
    async getCallRecord(customerId, exists, customerData) {
        var customerrecord = undefined
        const {internet, cableTV, cellular} = this.getCallProduct()
        if (!exists) {  // this is a new customer (that wants to join)
            var dateOfBirth = this.getRndBirthday()
            var birthday = utils.dateConvert(dateOfBirth.toLocaleString().split(", ")[0])  // in a format we can enter to MySQL table
            var numOfCalls = 0  // number of calls during the last month
            var gender = utils.getRndInteger(0, 1)  // 0 = male, 1 = female
            var city = cities[utils.getRndInteger(0, cities.length - 1)]
            var topic = "join"
            var firstName = utils.randomNameGenerator()
            var lastName = utils.randomNameGenerator()
            // create a new customer record that the server will add to customerdata table
            customerrecord = "(" + customerId + ",'" + firstName + "','" + lastName + "','" + birthday + "','" + city + "'," + gender + "," + internet + "," + cableTV + "," + cellular + "," + numOfCalls + ")"
            await ApiService.post(HOST + '/add' , { record : customerrecord })
        }
        else {  // the customer already exists in our company
            var birthday = customerData.DateOfBirth  // for computing the age
            const splitted = birthday.split("-")
            var dateOfBirth = new Date(splitted[0], splitted[1], splitted[2].split("T")[0])
            var numOfCalls = customerData.NumCalls
            var gender = customerData.gender
            var city = customerData.city
            var topic = topics[utils.getRndInteger(0,topics.length-1)]
            if (topic == "disconnect") {
                await ApiService.delete(HOST + '/' + customerId)  // delete the customer from the db
            }
        }
        var period = periods[utils.getRndInteger(0, periods.length - 1)]
        var callTime = new Date()
        var age = Math.floor(utils.getDifferenceInYears(dateOfBirth, callTime))  // age while calling
        var callDuration = utils.getRndInteger(1,70)  // random call duration in minutes
        const callrecord = this.createCallJSON(customerId, period, callTime, callDuration, numOfCalls, internet, cableTV, cellular, topic, age, gender, city)
        return callrecord 
    }
}

module.exports = CallsSimulator;
