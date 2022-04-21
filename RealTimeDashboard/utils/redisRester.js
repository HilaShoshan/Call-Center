const schedule = require("node-schedule");
const redisHelper = require("./redisHandler");
const socketHandler = require("../utils/socketHandler");
const controllers = require("../controllers/controllers");

module.exports = setFlushingOnRedis = (hourToFlush, minToFlush) => {
    const rule = new schedule.RecurrenceRule()
    rule.hour = hourToFlush
    rule.min = minToFlush
    
    schedule.scheduleJob(rule , () => {
        redisHelper.flushAll((success) => {
            console.log("redis flushed =>", success)
            controllers.restart()
            socketHandler.getSocket().emit("resetUI")
        });
    });
    console.log(`flushing is set -> every day, @ : ${hourToFlush}:${minToFlush}`)
};