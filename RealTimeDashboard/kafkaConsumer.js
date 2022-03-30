const kafka = require('node-rdkafka');

var consumer = new kafka.KafkaConsumer({
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "rocket-01.srvs.cloudkafka.com:9094,rocket-02.srvs.cloudkafka.com:9094,rocket-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "zaxe17g1",
  "sasl.password": "OFVYXGQFX3m71Vzh8ISp8W3aIGEAtCxB",
  "debug": "generic,broker,security"
}, {});

const fetchData = callback =>{
    consumer.connect();
    console.log("kafkaConsumer connected!");

    consumer.on('ready', () =>{
        console.log('consumer ready..')
        consumer.subscribe(['CallCenterAnalytics']);
        consumer.consume();
    }).on('data', data =>{
        var msg = JSON.parse(data);
        callback(null, msg);
    }).on('event.error', err =>{
        console.log(err);
        callback(err)
    });
}
module.exports = {
    fetchData: fetchData,
};