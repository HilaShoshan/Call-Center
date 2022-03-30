// BEN HILA

const utils = require("./utils")

// arrays
periods = ["holidays", "summer vacations", "normal"]
cities = ["Jerusalem", "Tel-Aviv", "Haifa", "Nahariya", "Petah-Tikva", "Ashdod", "Netanya", "Bnei-Brak", "Holon", "Beersheba"]
topics = ["service", "complaint", "disconnect"]  // topics for an exists customer

class CallsSimulator {

    getCustomerID() {
        return utils.getRndInteger(100, 999)  // the customer that make the call
    }

    getCallProduct() {
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

    //TODO: fix me
    getCustomerCall(exists, customerData) {
        const {internet, cableTV, cellular} = this.getCallProduct()
        if (!exists) {  // this is a new customer (that wants to join)
            var date = getRndDate(true)
            var dateOfBirth = new Date(date[0], date[1], date[2])
            var birthday = dateConvert(dateOfBirth.toLocaleString().split(", ")[0])  // in a format we can enter to MySQL table
            var numOfCalls = 0
            var gender = getRndInteger(0, 1)  // 0 = male, 1 = female
            var city = cities[getRndInteger(0, cities.length - 1)]
            var topic = "join"
            var firstName = randomNameGenerator()
            var lastName = randomNameGenerator()
            // add the new customer to customerdata
            var customerrecord = "(" + customerID + ",'" + firstName + "','" + lastName + "','" + birthday + "','" + city + "'," + gender + "," + internet + "," + cableTV + "," + cellular + ")"
            console.log("customerrecord: " + customerrecord)
            doQuery("INSERT INTO customerdata \
                    (CustomerID, FirstName, LastName, DateOfBirth, City, Gender, Internet, CableTV, Cellular) \
                    VALUES " + customerrecord)
        }
        else {  // the customer already exists in our company
            var birthday = doQuery("SELECT DateOfBirth FROM customerdata WHERE CustomerID = " + customerID)
            birthday = birthday[0].DateOfBirth
            console.log("birthday: " + birthday)
            /*
            const splitted = birthday.split("-")
            var dateOfBirth = new Date(splitted[0], splitted[1], splitted[2])
            var numOfCalls = getRndInteger(0,20)  // check if there there are calls from the same month. if so, change the range
            var topic = topics[getRndInteger(0,topics.length-1)]
            var gender = doQuery("SELECT Gender FROM customerdata WHERE CustomerID = " + customerID)
        var city = doQuery("SELECT City FROM customerdata WHERE CustomerID = " + customerID) */
        }
        var period = periods[getRndInteger(0, periods.length - 1)]
        var callTime = getRndTime(dateOfBirth)
        var age = Math.floor(getDifferenceInYears(dateOfBirth, callTime))  // age while calling
    }
}

module.exports = CallsSimulator;
