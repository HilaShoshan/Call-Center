const { Parser } = require('json2csv')
const bigml = require('bigml')
const fs = require('fs')

const { mongoDbClient } = require('../models/mongodb')
const { BigML } = require('../models/bigml')

var url = "mongodb+srv://callcenter:callcenter222@callcenter.f27zc.mongodb.net/callsDB?retryWrites=true&w=majority"
const mongoConf = {
    url: url,
    dbName: "callsDB"
}

async function insertCall(callRecord) {
    let db = new mongoDbClient()
    await db.connect(mongoConf)
    await db.insertDocument("calls", callRecord)
    await db.close()
}

async function getAllCalls() {
    let db = new mongoDbClient()
    await db.connect(mongoConf)
    let data = await db.findAll("calls")  // data is an array
    data.forEach(element => {
        element._id = element._id.toString()
    })
    // console.log(data)
    await db.close()
    return data
}

async function convertToCSV(data) {
    /**
     * gets an array of JSON objects, each represents a call
     * returns a CSV object
     */
    const json2csvParser = new Parser()
    const csv = json2csvParser.parse(data)
    return csv
}

async function trainModel_cb(req, res, next) {
    /**
     * train the data we have in mongodb to create a decision tree model
     */
    const data = await getAllCalls()
    const csv = await convertToCSV(data)
    // save the data as a csv file
    const filename = 'callsData.csv'
    fs.writeFile(filename, csv, function (err) {
        if (err) {
            res.json({ answer: "FAILED" })
        }
        console.log('callsData.csv saved successfully.')
        // train the model
        BigML.trainModel(filename)
    })
    // res.json({ answer: "OK" })
}

async function predict_cb(req, res, next) {
    /**
     * make a prediction using our current model (last trained)
     */
    const prediction = await BigML.predict(req.body.record)
    // res.json({ answer: "OK",
    //            prediction: prediction })
}

module.exports = {
    insertCall,
    trainModel_cb,
    predict_cb
}

trainModel_cb()