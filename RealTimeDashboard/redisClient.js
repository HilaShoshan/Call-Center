const redis = require('redis');
const client = redis.createClient(6379,'127.0.0.1');



client.on("error", (error) =>{
    console.error(error);
});

const storeData = messageJson =>{
    return new Promise((resolve, reject) =>{
        const callId =messageJson.callID;
        
        Notification(callId).then(()=>{
            client.hset(111,[callId , JSON.stringify(messageJson)], (err, reply) =>{
                if (err) reject(err);
                resolve(reply);
            });
        }).catch(err =>{
            reject(err);
        })
    });
};

module.exports = {
    storeData: storeData,
};