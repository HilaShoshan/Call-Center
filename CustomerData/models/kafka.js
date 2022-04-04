const kafka = require('../../Kafka/PublishToKafka/publish')

class Kafka {
    // constructor? 

    async sendCall(callRecord) {
        kafka.publish(callRecord)
        return true
    }
}

module.exports = Kafka