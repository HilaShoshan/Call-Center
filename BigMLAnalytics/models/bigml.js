var bigml = require('bigml')
require('dotenv').config()
const fs = require('fs')
const fsPromises = require('fs').promises


class BigML {
    constructor() {
        this.connection = new bigml.BigML()
        this.source = new bigml.Source()
    }

    async trainModel(filename) {
        this.source.create('./' + filename, function (error, sourceInfo) {
            if (!error && sourceInfo) {
                var dataset = new bigml.Dataset()
                dataset.create(sourceInfo, function (error, datasetInfo) {
                    if (!error && datasetInfo) {
                        var model = new bigml.Model()
                        model.create(datasetInfo, function (error, modelInfo) {
                            try {
                                return fsPromises.writeFile('MODELS_IDs.txt', modelInfo.resource)
                            } catch (err) {
                                throw err
                            }
                        })
                    }
                })
            }
        })
    }

    getModelID() {
        return fs.promises.readFile("./MODELS_IDs.txt", "utf8")
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
                        answer: "OK",
                        prediction: predictionInfo.object.output,
                        confidence: predictionInfo.object.prediction_path.confidence
                    })
                }
            }
        )
    }
}

module.exports = BigML