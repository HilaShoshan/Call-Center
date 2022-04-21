const Kafka = require("node-rdkafka");

let _consumer
let topic
module.exports = {
    connectToKafka: () => {

        const conf = {
            "group.id": "cloudkarafka-example",
            "metadata.broker.list": "rocket-01.srvs.cloudkafka.com:9094,rocket-02.srvs.cloudkafka.com:9094,rocket-03.srvs.cloudkafka.com:9094".split(","),
            "socket.keepalive.enable": true,
            "security.protocol": "SASL_SSL",
            "sasl.mechanisms": "SCRAM-SHA-256",
            "sasl.username": "zaxe17g1",
            "sasl.password": "OFVYXGQFX3m71Vzh8ISp8W3aIGEAtCxB",
            "debug": "generic,broker,security"
        };
        const prefix = "zaxe17g1-";
        topic = `${prefix}CallCenterAnalytics`;

        _consumer = new Kafka.KafkaConsumer(conf)
        _setConsumerCallBack()

        return new Promise((result, reject) => {
            _consumer.connect({}, (err => {
                if(err) { reject(err)}
                else{
                    result()
                }
            }));
        });
    },
    getConsumerAPI: () => {
        if(_consumer){
            return _consumer
        }
        throw "consumer not connected yet!"


    }
};

const _setConsumerCallBack = () =>{
    _consumer.on("error", (err) => {
        throw new Error(err)
    });
    _consumer.on("ready", () => {
        _consumer.subscribe([topic])
        _consumer.consume()
        console.log("kafka is connected")

    })
    _consumer.on("offsetOutOfRange", (m) => {
        console.log("OFFSET ERROR");
    });
};