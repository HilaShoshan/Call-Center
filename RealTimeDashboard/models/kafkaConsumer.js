const Kafka = require("node-rdkafka");

const kafkaConf = {
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
const topic = `${prefix}CallCenterAnalytics`; 

const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
}); 
const fetchData = callback => {
    consumer.connect();

    consumer.on("ready",() =>{
        console.log('Consumer ready');
        consumer.subscribe([topic]);
        consumer.consume();
    }).on("data", m => {
        console.log("to redis",m.value.toString());
        //var messageToRedis = m.value.toString()
        var messageToRedis = JSON.parse(m.value);
        callback(null,messageToRedis)
    }).on('event.error', err => {
      console.log(err);
      callback(err);
    });


}

module.exports = {
    fetchData: fetchData,
  };