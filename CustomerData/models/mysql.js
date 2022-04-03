// BEN HILA

const mysql = require('mysql');

// Database connection
const db = mysql.createConnection({
    host: "mysql5045.site4now.net",
    user: "a83a40_center",
    password: "callcenter111",
    database: "db_a83a40_center"
})

class MySQL {
    constructor() {
        db.connect(function (err) {
            if (err) {
                throw err;
            }
            console.log('Connected to the MySQL server.');
        })
    }

    async doQuery(query) {
        return new Promise((resolve, reject) => {
            db.query(query, (err, result, field) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })
        })
    }

    async getCustomer(id) {
        const res = await this.doQuery("SELECT * FROM customerdata WHERE CustomerID = " + id)
        console.log(res[0])
        // if not exists undefined, else json object
        return res[0]
    }

    async addCustomer(customerRecord) {
        console.log("mysql/addCustomer")
        console.log("record: ", customerRecord)
        const res = await this.doQuery("INSERT INTO customerdata \
        (CustomerID, FirstName, LastName, DateOfBirth, City, Gender, Internet, CableTV, Cellular, NumCalls) \
        VALUES " + customerRecord)
        console.log("res: ", res)
        return true
    }

    async deleteCustomer(id) {
        const res = await this.doQuery("DELETE FROM customerdata \
        WHERE CustomerID = " + id)
        console.log("res: ", res)
        return true
    }
}

module.exports = MySQL;