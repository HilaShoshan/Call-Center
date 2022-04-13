const { Parser } = require('json2csv')
const bigml = require('bigml')
const fs = require('fs')
const fsPromises = require('fs').promises
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
        // console.log('callsData.csv saved successfully.')
        return fsPromises.writeFile(filename, csv)
    } catch (err) {
        console.error('Error occured while reading directory!', err)
        throw err
    }
}
// const connection = new bigml.BigML()
// const source = new bigml.Source()

async function trainModel_cb(req, res, next) {
    // console.log("user name:", process.env.BIGML_USERNAME);
    // source.create('./iris.csv', function (error, sourceInfo) {
    //     if (!error && sourceInfo) {
    //         var dataset = new bigml.Dataset()
    //         dataset.create(sourceInfo, function (error, datasetInfo) {
    //             if (!error && datasetInfo) {
    //                 var model = new bigml.Model();
    //                 model.create(datasetInfo, function (error, modelInfo) {
    //                     // return modelInfo
    //                     res.json({ model: modelInfo })
    //                 });
    //             }
    //         });
    //     } else {
    //         console.log("*******************************", error)
    //         res.status(400).json(error)
    //     }
    // });
    /**
     * train the data we have in mongodb to create a decision tree model
     */
    let BigML = new BigMLModel()
    const filename = 'callsData.csv'
    await createCSV(filename)
    let modelInfo = await BigML.trainModel(filename)  // train the model
    res.send({
        answer: "OK",
        model: modelInfo
    })
}

async function predict_cb(req, res, next) {
    /**
     * make a prediction using our current model (last trained)
     */
    let BigML = new BigMLModel()
    // const prediction = await BigML.predict(req.body.features)
    var features = {
        customerId: 338,
        period: "normal",
        callTime: "2022-04-10T17:17:29.161Z",
        callDuration: 53,
        numOfCalls: 0,
        internet: 0,
        cableTV: 0,
        cellular: 1,
        age: 95,
        gender: 0,
        city: "Netanya"
    }
    const prediction = await BigML.predict(features)
    console.log("pred answer: ", prediction)
    // res.json({ answer: "OK",
    //            prediction: prediction })
}

module.exports = {
    insertCall,
    trainModel_cb,
    predict_cb
}