var bigml = require('bigml')
require('dotenv').config()


class BigML {
    constructor() {
        this.connection = new bigml.BigML()
        this.source = new bigml.Source()
    }

    async trainModel(filename) {
        this.source.create('./' + 'iris.csv', function (error, sourceInfo) {
            if (!error && sourceInfo) {
                var dataset = new bigml.Dataset()
                dataset.create(sourceInfo, function (error, datasetInfo) {
                    if (!error && datasetInfo) {
                        var model = new bigml.Model()
                        model.create(datasetInfo, function (error, modelInfo) {
                            // this.model = modelInfo
                            console.log(modelInfo)
                            return modelInfo
                        })
                    }
                })
            }
        })
    }

    async predict(features) {
        // predict using this.model
        // returns the prediction
        var prediction = new bigml.Prediction()
        prediction.create(this.model, features)
    }
}

module.exports = BigML