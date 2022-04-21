const FiveMinutes = require("./FiveMinutes");

let _collection;

module.exports = class AllDay {

    static init(){
        _collection = []

        let hour = "00"
        let minute = "00"
        for(let five = 0 ; five < 288; five++){
            _collection.push(new FiveMinutes(`${hour}:${minute}`))
            if(parseInt(minute) < 5){
                minute = "0" + (parseInt(minute)+5)
            }
            else if (parseInt(minute) < 55) {
                minute = "" + (parseInt(minute) + 5);
            }
            else {
                minute = "00";
                if (parseInt(hour) < 9) {
                    hour = "0" + (parseInt(hour) + 1);
                }
                else
                    hour = "" + (parseInt(hour) + 1);
            }
        }
        //console.log("five-collec", _collection)
    }
    static recordCallInFiveMinSeg(callData){
        const [,startTime] = callData["callTime"].split("T")
    
        
        const [,endTime] = callData["endTime"].split("T")

        const [hourStart, minStart] = startTime.split(":");
       
        const indexToStart = (hourStart * 12) + (Math.floor(minStart / 5));
        
       
        
        
        _collection[indexToStart].setCounter(_collection[indexToStart].getCount() +1)
        _collection[indexToStart].calcNewAvg(callData["waitingTime"])

        return JSON.parse(JSON.stringify(_collection.slice(indexToStart, indexToStart + 1)));
    }

    static getDataFromCallDataCollection(callDataCollection) {
        for (const callData of callDataCollection) {
            AllDay.recordCallInFiveMinSeg(callData);
        }
    }
    static getCollection() {
        return _collection;
    }
};