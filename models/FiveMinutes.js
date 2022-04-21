module.exports = class FiveMinutes{

    constructor(hour){
        this.hour = hour
        this.callCount = 0
        this.allWaitingTimes = []
        this.avgWaitingTime = 0

    }
    getHour(){
        return this.hour;
    }
    getCount(){
        return this.callCount
    }
    getAvgWaitingTime() {
        return this.avgWaitingTime;
    }

    setCounter(counter) {
        this.callCount = counter;
    }
    calcNewAvg(callTime){
        this.allWaitingTimes.push(callTime)
        const sum = this.allWaitingTimes.reduce((accumulator, currentValue) => accumulator +currentValue , 0)
        this.avgWaitingTime = sum / this.callCount
        console.log("calcNewAvg",this.avgWaitingTime )
        return this.avgWaitingTime
    }

};