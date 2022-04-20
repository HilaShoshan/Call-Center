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

    trainModel(filename) {
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
                            } catch (err) {
                                throw err
                            }
                        })
                    }
                })
            }
        })
    }

    buildConfusionMatrixObj(confusion_matrix) {
        console.log("hereeeeeeeeeeeeeeeeeeeee")
        // console.log("************ on build obj, confusion matrix is: ", confusion_matrix)
        // var obj = {
        //     c00 : confusion_matrix[0][0]
        // }
        // console.log("objjjjjjjjjjjjj: ", obj)
        // return obj
        return 1
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
                    var myeval = new bigml.Evaluation()
                    myeval.get(evaluationInfo.resource,
                        true,
                        async function (error, resource) {
                            if (!error && resource) {
                                res.json({
                                    'evaluation answer': 'OK',
                                    confusion_matrix: resource.object.result.model.confusion_matrix  // for updating the confusion matrix in pages/index
                                })
                            }
                        })
                }
                else {
                    console.log(error)
                    res.json({ 'evaluation answer': 'ERR' })
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
                        confidence: predictionInfo.object.prediction_path.confidence,
                        probabilities: predictionInfo.output.probabilities
                    })
                }
            }
        )
    }

    /* bigMLMap() {
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
    } */
}

module.exports = BigML