var bigml = require('bigml')


class BigML {
    constructor() {
        this.connection = new bigml.BigML()
        this.source = new bigml.Source()
    }

    async trainModel(filename) {
        let model = undefined
        console.log("filename: ", filename)
        this.source.create('../' + filename, function (error, sourceInfo) {
            if (error) {
                console.log("filename is not ok!")
                throw error
            }
            if (!error && sourceInfo) {
                console.log("src info: ", sourceInfo)

                // var dataset = new bigml.Dataset({"objective_field": "topic"})
                // dataset.create(sourceInfo)
                // model = new bigml.Model()
                // // define the topic column as the label
                // model.create(datasetInfo)
            }
        })
        // this.model = model
        // console.log(model)
    }

    async predict(features) {
        // predict using this.model
        // returns the prediction
        // var prediction = new bigml.Prediction()
        // var ans = prediction.create(modelInfo, features)
        // console.log(ans)
    }
}

module.exports = BigML