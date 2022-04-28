const CallDataCollection = require("../models/CallDataCollection");
const socketHandler = require("../utils/socketHandler");
const AllDay = require("../models/AllDay");
const path = require('path');

let _collection 
module.exports = {
    init: () => {
        CallDataCollection.init()
        _collection=[]
        
        CallDataCollection.getCallsFromRedis().then(()=>{
            AllDay.init()
            AllDay.getDataFromCallDataCollection(CallDataCollection.getCollection())
           // setInterval(()=>{
                const avgWaitingTimeOfLast10Mins = _calcNew10MinAvg()
                const socketIo= socketHandler.getSocket()
                socketIo.emit("updateAvgOfLast10Mins", avgWaitingTimeOfLast10Mins)
            //},  6000)
            
            console.log("updating every min - set")
        }).catch((err) => {throw Error(err)})
    },
    restart: () => {
        CallDataCollection.init()
        CallDataCollection.getCallsFromRedis().then(() => {
            AllDay.init()
        }).catch((err) => {
            throw new Error(err)
        });
    },
    getDashboard: (req, res, next) => {
        const configObjForUi = _createConfigObjForUi()
        
        configObjForUi.numOfCallers=parseInt(CallDataCollection.getUpdatedNumberOfCallers());
        res.render("dashboard", configObjForUi)
        
        
        
    },
    numOfCallerChanged: (newNum) => {
        const socketIo = socketHandler.getSocket()
        socketIo.emit("updateNumOfWaitingCalls", newNum)
        console.log("socket event of new num of callers emitted to client")

    },
    newCallEnded: (nCallData)=>{
        const socketIo = socketHandler.getSocket()
        console.log("topic",nCallData["topic"])
        socketIo.emit("updateTopicTable",{
            topic: nCallData["topic"]
        });
        
        const relCallsOfAllDay = AllDay.recordCallInFiveMinSeg(nCallData)
        socketIo.emit("update5min",relCallsOfAllDay)

        const avgWaitingTimeOfLast10Mins = _calcNew10MinAvg()
        socketIo.emit("updateAvgOfLast10Mins", avgWaitingTimeOfLast10Mins)
        socketIo.emit("updateCallersByTopic", CallDataCollection.groupByTopic())

    },
    redirect: (req, res, next) => {
        res.redirect("dashboard")
        
    }
    
    /*,
    renderDashboard: (req, res) => {
        res.render(path.join(__dirname, '../views/dashboard.ejs'));
    }*/
};

const _createConfigObjForUi = ()=>{
    const topicCount = CallDataCollection.groupByTopic();

    const allDaySegment = AllDay.getCollection();
    
     
    return {
        avg10mins: _calcNew10MinAvg(),
        groupedByTopic: topicCount,
        allDaySegment: allDaySegment,
        date: _getCurrDateForDashboard(),
       
    };
};
const _calcNew10MinAvg =() =>{
    return CallDataCollection.getAvgTimeOfCallLast10Min().length == 0 ? 0 : CallDataCollection.getAvgTimeOfCallLast10Min()
};

const _getCurrDateForDashboard =() =>{
    const date = Date.now()
    const dateTimeFormat = new Intl.DateTimeFormat("en",{
        year: "numeric",
        month: "numeric",
        day: "2-digit"
    });
    const [{value: month}, ,{value: day}, ,{value:year}, , , ,] = dateTimeFormat.formatToParts(date)
    console.log("date==",`${day}/${month}/${year}`)
    return `${day}/${month}/${year}`
};
