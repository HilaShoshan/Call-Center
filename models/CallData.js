const redisHandler = require("../utils/redisHandler")

module.exports = class CallData {
    constructor(inputFromRedis){
        const inputFromRedisAsObj = JSON.parse(inputFromRedis)
        for (const prop in inputFromRedisAsObj){
            this[prop] = inputFromRedisAsObj[prop]
        }
        const total = Math.floor(Math.random() * (70 - 5 + 1)) + 5
        const waiting = Math.floor(Math.random() * (10 - 1 +1)) + 1 
        this.totalTime = total
        this.waitingTime = waiting
        
        const startTime = this.callTime
        
        const dateObj = new Date(startTime)
        const newDate = dateObj.setMinutes(dateObj.getMinutes()+total)
        const end = new Date(newDate).toISOString()
        
        
        this.endTime = end
        console.log("this",this)
    }
    updateRedis(){
        console.log("new CallData data sent to redis; ")
        redisHandler.sendData("callData", this)
      
    }
};