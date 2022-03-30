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
    constructor(){
        db.connect(function (err) {
            if (err) {
                throw err;
            }
            console.log('Connected to the MySQL server.');
        })
    }

    async _doQuery(query) {
        return new Promise((resolve, reject) => {
            db.query(query, (err, result, field) => {
                if (err) {
                    return reject(err)
                }
                return resolve(result)
            })
        })
    }


    async getCustomer(id){
        const res = await this._doQuery("SELECT * FROM customerdata WHERE CustomerID = " + id);
        console.log(res[0]);
        // if not exists undefined else json object
        return res[0];
        
    }
}

module.exports = MySQL;