var uuid = require('uuid')
const rdkafka = require("node-rdkafka")

const kafkaInfo = require('../../Kafka/kafkaInfo')


class Kafka {
    constructor() {
        console.log("this is: ", this)
        this.producer = new rdkafka.Producer(kafkaInfo.kafkaConf)
        this.producer.on("ready", function (arg) {
            console.log(`producer ${arg.name} ready.`)
        })
        this.producer.connect()
    }

    genMessage(m) {
        return new Buffer.alloc(m.length, m)
    } 

    publish(msg) {
        const m = JSON.stringify(msg)
        this.producer.produce(kafkaInfo.topic, -1, this.genMessage(m), uuid.v4())
    }

    async sendCall(callRecord) {
        this.publish(callRecord)
        return true
    }
}

module.exports = Kafka