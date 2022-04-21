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
    }
    static recordCallInFiveMinSeg(callData){
        const startTime = callData["callTime"]
        
       
        const totalTime = callData["totalTime"]
        console.log("total--", totalTime)
        
        const endTime = callData["endTime"]

        const [hourStart, minStart] = startTime.split(":");
        const [hourEnd, minEnd] = endTime.split(":");
        const indexToStart = (hourStart * 12) + (Math.floor(minStart / 5));
        const indexToEnd = (hourEnd * 12) + (Math.floor(minEnd / 5));

        for (let runningIndex = indexToStart; runningIndex <= indexToEnd; runningIndex++) {
            _collection[runningIndex].setCounter(_collection[runningIndex].getCount() + 1);
            _collection[runningIndex].calcNewAvg(callData["totalTime"]);
        }

        return JSON.parse(JSON.stringify(_collection.slice(indexToStart, indexToEnd + 1)));
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