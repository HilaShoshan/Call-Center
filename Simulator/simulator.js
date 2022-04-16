const utils = require("./utils")
const ApiService = require('./api-service')
const HOST = 'http://localhost:3000'

// arrays
var periods = ["holidays", "summer vacations", "normal"]
var cities = ["Ariel", "Jerusalem", "Tel-Aviv", "Haifa", "Nahariya", "Petah-Tikva", "Ashdod", "Netanya", "Bnei-Brak", "Holon", "Beersheba"]
var topics = ["service", "complaint", "disconnect"]  // topics for an exists customer

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

    biasedTopic(age, gender, city, numOfCalls) {
        // teenagers are more likely to ask for service
        if (age < 21) {
            for (let i = 0; i < 12; i++) {
                topics.push("service")
            }
        }
        // older women who call probably call to complain
        if (age > 45 && gender == 1) {
            for (let i = 0; i < 10; i++) {
                topics.push("complaint")
            }
            if (city == "Nahariya" || city == "Holon") {
                for (let i = 0; i < 5; i++) {
                    topics.push("complaint")
                }
            }
        }
        // The more times a customer has called in the last month, 
        // the more likely they are to want to complaint, and more likely to disconnect
        for (let i = 0; i < numOfCalls; i++) {
            topics.push("complaint")
            topics.push("disconnect", "disconnect")
        }
        // console.log("biases topics: ", topics)
        return topics[utils.getRndInteger(0,topics.length-1)]
    }

    createCallJSON(customerId, period, callTime, numOfCalls, internet, cableTV, cellular, age, gender, city, topic) {
        var callObj = {}
        callObj.customerId = customerId
        callObj.period = period
        callObj.callTime = callTime
        callObj.numOfCalls = numOfCalls
        callObj.internet = internet
        callObj.cableTV = cableTV
        callObj.cellular = cellular
        callObj.age = age
        callObj.gender = gender
        callObj.city = city
        callObj.topic = topic
        return callObj
    }

    async getCallRecord(customerId, exists, customerData) {
        var customerrecord = undefined
        var callTime = new Date()
        var period = periods[utils.getRndInteger(0, periods.length - 1)]
        const {internet, cableTV, cellular} = this.getCallProduct()
        if (!exists) {  // this is a new customer (that wants to join)
            var dateOfBirth = this.getRndBirthday()
            var birthday = utils.dateConvert(dateOfBirth.toLocaleString().split(", ")[0])  // in a format we can enter to MySQL table
            var age = Math.floor(utils.getDifferenceInYears(dateOfBirth, callTime))  // age while calling
            var numOfCalls = 0  // number of calls during the last month
            var gender = utils.getRndInteger(0, 1)  // 0 = male, 1 = female
            var city = cities[utils.getRndInteger(0, cities.length - 1)]
            var topic = "join"
            var firstName = utils.randomNameGenerator()
            var lastName = utils.randomNameGenerator()
            // create a new customer record that the server will add to customerdata table
            customerrecord = "(" + customerId + ",'" + firstName + "','" + lastName + "','" + birthday + "','" + city + "'," + gender + "," + internet + "," + cableTV + "," + cellular + "," + numOfCalls + ")"
            await ApiService.post(HOST + '/addCustomer' , { record : customerrecord })
        }
        else {  // the customer already exists in our company
            var birthday = customerData.DateOfBirth  // for computing the age
            const splitted = birthday.split("-")
            var dateOfBirth = new Date(splitted[0], splitted[1], splitted[2].split("T")[0])
            var age = Math.floor(utils.getDifferenceInYears(dateOfBirth, callTime))  // age while calling
            var numOfCalls = customerData.NumCalls
            var gender = customerData.Gender
            var city = customerData.City
            var topic = this.biasedTopic(age, gender, city, numOfCalls)
            if (topic == "disconnect") {
                await ApiService.delete(HOST + '/' + customerId)  // delete the customer from the db
            }
        }
        // increase customer's num of calls in the customer db
        await ApiService.post(HOST + '/increaseNumOfCalls', { id: customerId })
        const callrecord = this.createCallJSON(customerId, period, callTime, numOfCalls, internet, cableTV, cellular, age, gender, city, topic)
        return callrecord
    }
}

module.exports = CallsSimulator
