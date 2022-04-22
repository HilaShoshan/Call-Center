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

    featuresDict(fields) {
        console.log("fields: ", fields)
        var dict = new Object()
        // var keys = Object.keys(fields)
        // keys.forEach((key, index) => {
        //     dict[key] = fields[key].name
        // })
        // console.log("dict:\n", dict)
        return dict
    }

    async trainModel(filename) {
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
                            var mymodel = new bigml.Model()
                            mymodel.get(modelInfo.resource,
                                true,
                                async function (error, resource) {
                                    if (!error && resource) {
                                        // var dict = await this.featuresDict(resource.object.model.fields)
                                        var fields = resource.object.model.fields
                                        var dict = new Object()
                                        var keys = Object.keys(fields)
                                        keys.forEach((key, index) => {
                                            dict[key] = fields[key].name
                                        })
                                        var answer = {}
                                        var importance = resource.object.model.importance
                                        importance.forEach(element => {
                                            var name = dict[element[0]]
                                            answer[name] = element[1]*100
                                        })
                                        try {
                                            await fsPromises.writeFile(path.join(__dirname, 'IDs', 'IMPORTANCE.json'), JSON.stringify(answer))
                                        } catch (err) {
                                            throw err
                                        }
                                    }
                                })
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
                    var myeval = new bigml.Evaluation()
                    myeval.get(evaluationInfo.resource,
                        true,
                        async function (error, resource) {
                            if (!error && resource) {
                                fs.readFile(path.join(__dirname, 'IDs', 'IMPORTANCE.json'), function(err, data) {
                                    const importance = JSON.parse(data)
                                    // console.log("importance: ", importance)
                                    res.json({
                                        'evaluation answer': 'OK',
                                        confusion_matrix: resource.object.result.model.confusion_matrix,  // for updating the confusion matrix in pages/index
                                        accuracy: resource.object.result.model.accuracy,
                                        average_f_measure: resource.object.result.model.average_f_measure,
                                        average_precision: resource.object.result.model.average_precision,
                                        average_recall: resource.object.result.model.average_recall,
                                        importance: importance 
                                    })
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
        console.log("modelID: ", modelID)
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
                        probabilities: predictionInfo.object.probabilities
                    })
                }
                else {
                    console.log(error)
                }
            }
        )
    }
}

module.exports = BigML