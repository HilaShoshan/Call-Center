
const redisHandler = require("../utils/redisHandler")
const CallData = require("./CallData")

let _collection 

module.exports = class CallDataCollection{
    static init() {
        _collection = []
    }
    static copyRedisOutputToCollection(output){
        output.forEach((elem) => {
            const callData = new CallData(elem)
            _collection.push(callData)
        });
    }
    static getCallsFromRedis(){
        return new Promise((result, reject) => {
            redisHandler.getData().then((collectionRetrieved,err) => {
                if(err){
                    reject(err)
                }
                const tmpCollection = JSON.parse(JSON.stringify(collectionRetrieved))
                tmpCollection.forEach(elem => _collection.push(new CallData(elem)))
                result(_collection)
            });
        });
    }
    static addCallDataInstance(callData){
        _collection.push(callData)
    }
    static getAvgTimeOfCallLast10Min(){
        try {
            return(
                _collection.filter(callData => this.isLessThan10Mins(callData))
                .map(callData => callData["waitingTime"])
                .reduce((accumulator, currentValue) => accumulator +currentValue)/_collection.length);
        }
        catch(e){
            if (e.message === "Reduce of empty array with no initial value"){
                return [];

            }
            else throw new Error(e)
        }
    }
    static isLessThan10Mins(callDataElem){
        const date = Date.now()
        const dateTimeFormat = new Intl.DateTimeFormat("en", {hour: "numeric", minute:"numeric", hour12:false});
        let [{value: hour} , ,{value: minute}] = dateTimeFormat.formatToParts(date)
        hour = parseInt(hour)
        minute = parseInt(minute)
        const [,time] =callDataElem["callTime"].split("T")
        const [callHour, callMinute] = time.split(":")
        return ((hour - callHour === 0) && (minute - callMinute <= 10))
    }
    static getUpdatedNumberOfCallers() {
        // return _isEmpty() ? 0 : _collection.slice(-1)[0].getNumOfCallers();
        console.log("collec=",_collection)
        const tmp = _collection.filter(callData => this.finishWaiting(callData))
        //return _isEmpty() ? 0 : _collection.length
        console.log("tmp.length", tmp.length)
        return tmp.length
 
     }
 
     static finishWaiting(elem){
         const date = Date.now()
         const dateTimeFormat = new Intl.DateTimeFormat("en", {hour: "numeric", minute:"numeric", hour12:false});
         let [{value: hour} , ,{value: minute}] = dateTimeFormat.formatToParts(date)
         hour = parseInt(hour)
         minute = parseInt(minute)
         const dataObj = new Date(elem["callTime"])
         const newDate = dataObj.setMinutes(dataObj.getMinutes()+elem["waitingTime"])
         const wait = new Date(newDate).toISOString()
         const [,time] = wait.split("T")
         const [,minOfWait] = time.split(":")
        // console.log("finishh",elem["endTime"])
         //const [dateOfCall, time] = elem["endTime"].split("T")
         //const [callHour, callMinute] = time.split(":")
         //console.log("trueOrFalse",( callHour - hour ) )
         return  (minute- minOfWait < 0)
     }
    static getCollection(){
        return _collection
    }
    static groupByTopic(){
        console.log("groupbytopic",_groupBy("topic"))
        return _groupBy("topic")
    }
    
    
};
const _groupBy = (val) => {
    return _isEmpty() ? [] : _collection.map(elem => elem[val]).reduce((running, val) =>
    (running[val] ? running[val] = running[val] + 1 : running[val] = 1, running), {});
    
};
const _isEmpty = () => {
    return _collection.length === 0 ? true : false;
};
