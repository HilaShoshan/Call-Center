const { Parser } = require('json2csv')
const bigml = require('bigml')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')
require('dotenv').config()

const { mongoDbClient } = require('../models/mongodb')
const BigMLModel = require('../models/bigml')
// require view

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
        delete element.customerId  // there is no need for learning
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

async function createCSV(filename) {
    const data = await getAllCalls()
    const csv = await convertToCSV(data)
    // save the data as a csv file
    try {
        console.log('callsData.csv saved successfully.')
        return fsPromises.writeFile(path.join(__dirname, '..', filename), csv)
    } catch (err) {
        console.error('Error occured while reading directory!', err)
        throw err
    }
}

async function trainModel_cb(req, res, next) {
    /**
     * train the data we have in mongodb to create a decision tree model
     */
    let BigML = new BigMLModel()
    const filename = 'callsData.csv'
    await createCSV(filename)
    await BigML.trainModel(filename)  // train the model
    await BigML.evaluateModel(res)
}

async function predict_cb(req, res, next) {
    /**
     * make a prediction using our current model (last trained)
     */
    let BigML = new BigMLModel()
    const features = req.body.features
    await BigML.predict(features, res)
}


module.exports = {
    insertCall,
    trainModel_cb,
    predict_cb
}