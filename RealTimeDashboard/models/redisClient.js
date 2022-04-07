const redis = require('ioredis')
const conn = {
    port: 6379,
    host: "127.0.0.1",
    db: 0
};
const redisDb = new redis(conn);
redisDb.on('connect', function() {
    console.log('Connected to Redis!'); // Connected!
    //clearDB();

  });
redisDb.on("error", (error) => {
    console.error(error);
});

const storeData = messageJson => {
    const customerID = messageJson.customerId;
    console.log("message-",messageJson)
    redisDb.set(customerID, JSON.stringify(messageJson),(err, reply) => {
        if (err) reject(err)
        resolve(reply)
    })

};

const clearDB = () => {
    redisDb.flushall('ASYNC', (err, reply) => {
        if(err) console.log(err);
        else console.log(reply);
      });
  }

module.exports = {
    storeData: storeData
};