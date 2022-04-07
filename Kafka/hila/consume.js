// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const redis = require("redis");

let client = redis.createClient();
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

const topics = [topic];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});

consumer.on("error", function(err) {
  console.error(err);
});
consumer.on("ready", function(arg) {
  console.log(`Consumer ${arg.name} ready`);
  consumer.subscribe(topics);
  consumer.consume();
});

consumer.on("data", function(m) {
  //console.log(m.value.toString());
  //console.log("calling commit");
  consumer.commit(m);
  //console.log("The value is : " + m.value.toString());
  const s = m.value.toString();
  let content = JSON.parse(s);
  console.log("******** content is: ", content)
// console.log(content.id);
  // client.set(content.id+"", s, redis.print);
});
consumer.on("disconnected", function(arg) {
  process.exit();
});
consumer.on('event.error', function(err) {
  console.error(err);
  process.exit(1);
});
consumer.on('event.log', function(log) {
  //console.log(log);
});
consumer.connect();