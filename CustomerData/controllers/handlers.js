const createError = require('http-errors')
const path = require('path')

const MySQLModel = require('../models/mysql')
const KafkaModel = require('../models/kafka')

let db = new MySQLModel()
let kafka = new KafkaModel()


async function getId_cb(req, res, next) {
    /**
     * get the customer data by id
     */
    const customerData = await db.getCustomer(req.params.id)  // get data about this id

    let data = { exists: false }
    if (!!customerData) {
        data = {
            exists: true,
            customerData
        }
    }
    res.json(data)
}

async function addCustomer_cb(req, res, next) {
    /**
   * add a new customer record to the dataset
   */
    const answer = await db.addCustomer(req.body.record)
    if (answer) {
        res.json({ answer: "OK" })
    }
    else {
        res.json({ answer: "FAILED" })
    }
}

async function sendCall_cb(req, res, next) {
    /**
   * add a new customer record to the dataset
   */
    const answer = await kafka.sendCall(req.body)
    if (answer) {
        res.json({ answer: "OK" })
    }
    else {
        res.json({ answer: "FAILED" })
    }
}

async function deleteCustomer_cb(req, res, next) {
    /**
   * delete the customer with the given id from the dataset
   */
    const answer = await db.deleteCustomer(req.params.id)
    if (answer) {
        res.json({ answer: "OK" })
    }
    else {
        res.json({ answer: "FAILED" })
    }
}

module.exports = {
    getId_cb,
    addCustomer_cb,
    sendCall_cb,
    deleteCustomer_cb
}