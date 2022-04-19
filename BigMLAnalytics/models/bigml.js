var bigml = require('bigml')
require('dotenv').config()
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')


class BigML {
    constructor() {
        this.connection = new bigml.BigML()
        this.source = new bigml.Source()
    }

    trainModel(filename, res) {
        this.source.create('./' + filename, function (error, sourceInfo) {
            if (!error && sourceInfo) {
                var dataset = new bigml.Dataset()
                dataset.create(sourceInfo, function (error, datasetInfo) {
                    if (!error && datasetInfo) {
                        var model = new bigml.Model()
                        model.create(datasetInfo, async function (error, modelInfo) {
                            try {
                                await fsPromises.writeFile(path.join(__dirname, 'IDs', 'DATASETS_IDs.txt'), modelInfo.object.dataset)
                                await fsPromises.writeFile(path.join(__dirname, 'IDs', 'MODELS_IDs.txt'), modelInfo.resource)
                                res.json({ 'train answer': 'OK' })
                            } catch (err) {
                                res.json({ 'train answer': 'ERR' })
                                throw err
                            }
                        })
                    }
                })
            }
        })
    }

    async evaluateModel(res) {
        const modelID = await this.getModelID()
        const datasetID = await this.getDatasetID()
        var evaluation = new bigml.Evaluation()
        evaluation.create(modelID,
            datasetID,
            { name: "my evaluation" }, 
            true,
            function (error, evaluationInfo) {
                if (!error && evaluationInfo) {
                    console.log(evaluationInfo)
                    res.json({ 'evaluation answer': 'OK' })
                }
                else {
                    console.log(error)
                }
            })
    }

    getModelID() {
        return fs.promises.readFile(path.join(__dirname, 'IDs', 'MODELS_IDs.txt'), 'utf8')
    }

    getDatasetID() {
        return fs.promises.readFile(path.join(__dirname, 'IDs', 'DATASETS_IDs.txt'), 'utf8')
    }

    async predict(features, res) {
        console.log("predict features: ", features)
        var modelID = await this.getModelID()
        var prediction = new bigml.Prediction()
        prediction.create(modelID,
            features,
            { name: "my_prediction" },
            true,
            function (error, predictionInfo) {
                if (!error && predictionInfo) {
                    res.send({
                        answer: 'OK',
                        prediction: predictionInfo.object.output,
                        confidence: predictionInfo.object.prediction_path.confidence
                    })
                }
            }
        )
    }

    bigMLMap() {
        if (map === null || map === undefined) {
            map = new Map()
            return map
        }
        return map
    }

    bigMLTable() {
        if (table === null || table === undefined) {
            table =
            {
                'join': [0, 0, 0, 0],
                'service': [0, 0, 0, 0],
                'complaint': [0, 0, 0, 0],
                'disconnect': [0, 0, 0, 0]
            }
            return table
        }
        return table
    }
}

module.exports = BigML