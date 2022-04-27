const redis = require('ioredis')
let redisDb
module.exports = {
    connectRedis: (callBackFunc) => {
        const conn = {
            port: 6379,
            host: "127.0.0.1",
            db: 0
        };
        redisDb = redis.createClient(conn);
        redisDb.on("connect", ()=>{
            console.log("connect to redis")
            callBackFunc();
        });
        redisDb.on("error", (err) => {throw new Error(err);});

    },
    sendData: (whichList, dataToSend) => {
        const redisClient = _getRedisClient()
        redisClient.rpush(whichList, JSON.stringify(dataToSend), (err)=> {
            if (err){
                throw new Error(err)
            }
            else{
                console.log("send to Redis successfully")

            }
        });
    },
    getData: (whichList) =>{
        const redisClient = _getRedisClient()
        const collectionToReturn = []
        return new Promise((result, reject) => {
            redisClient.lrange(whichList, 0, -1, (err,reply) =>{
                if (err){
                    reject(err)
                }
                else{
                    result(_copyRedisOutputToCollection(reply,collectionToReturn))
                }
            });
        });
    } ,
    flushAll: () => {
        redisDb.flushall('ASYNC',(err, success) => {
            if(err){
                throw new Error(err)
            }
            success
        });
    }
};

const _copyRedisOutputToCollection =  (output, collection) => {
    output.forEach((elem) => {
        collection.push(elem)
    })
    console.log("copyRedis", collection)
    return collection
}

const _getRedisClient = () => {
    if(redisDb){
        return redisDb
    }
    else {
        throw new Error("REDIS CLIENT IS NOT CONNECTED YET!")
    }

};