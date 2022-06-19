const kafkaConf = {
    "group.id": "cloudkarafka-example",
    "metadata.broker.list": "rocket-01.srvs.cloudkafka.com:9094,rocket-02.srvs.cloudkafka.com:9094,rocket-03.srvs.cloudkafka.com:9094".split(","),
    "socket.keepalive.enable": true,
    "security.protocol": "SASL_SSL",
    "sasl.mechanisms": "SCRAM-SHA-256",
    "sasl.username": "",
    "sasl.password": "",
    "debug": "generic,broker,security"
}
  
const prefix = ""
const topic = `${prefix}CallCenterAnalytics`

module.exports = Object.freeze({
    kafkaConf : kafkaConf,
    topic : topic
})
