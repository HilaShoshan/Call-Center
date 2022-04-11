var bigml = require('bigml')


class BigML {
    constructor() {
        var username = 'callcenter'
        var api_key = '45cb7c35dad548a34cc472bf4005e665d05ed046'
        this.connection = new bigml.BigML(username, api_key)
        this.source = new bigml.Source(this.connection)
    }

    async trainModel() {
        // init this.model
    }

    async predict(callRecord) {
        // predict using this.model
        // returns the prediction
    }
}

module.exports = { 
    BigML
}