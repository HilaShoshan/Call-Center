function initSocket() {
    //socket = io.connect('http://localhost:4000');
    //socket = require("socket.io");
    console.log("initSocket")
    socket = io.connect('http://localhost:4000')

    //to recive city names as written in the table + the topic of the call
    socket.on("updateTopicTable", topic => {
        // console.log("update city- topic table EVENT");
        //console.log("topic7777",topic.t);
        //alert(topic.topic)
        
       // var topic = topic.topic;
        var id = topic.topic
        console.log(id)
        document.getElementById(id).innerHTML++;
        //document.getElementById(c01).innerHTML++;
        document.getElementById("total").innerHTML++;
        
    });


    //to recive new number of waiting calls in system (for graph)
    socket.on("updateNumOfWaitingCalls", (newNum) => {
        //console.log("update RT num of callers EVENT");
        const objToPush = {
            title: "waiting calls",
            numOfCallers: newNum
        };
        numOfCallers[0] = objToPush;
        // refresh chart line, notice that in the $ you need to add the chart id like i did below
       $("#chart").dxChart("refresh");
    });

    //AVG call time of calls in the last 10 mins - to update every round min
    socket.on("updateAvgOfLast10Mins", new10MinsData => {
        // console.log("update 10 last mins AVG call length EVENT");
        const objToPush = {
            title: "waiting time",
            avg: new10MinsData
        };
        avgWaiting[0] = objToPush;
        $("#timeWaitingChart").dxChart("refresh");

    });

    

    //number of calls by topic graph
    socket.on("updateCallersByTopic", groupedByTopic => {
        // console.log("update callers by topic EVENT");
        for (let topic in groupedByTopic) {
            topicSource.push({
                topic: topic,
                amount: groupedByTopic[topic]

            });
        }
        $("#topicChart").dxChart("refresh");
    });

    //grpah of active calls pre 5 min segment + waiting time split by 5 min segments
    socket.on("update5min", relCallsOfAllDay => {
        //console.log("update5 min seg EVENT");
        //console.log("numOfCalls.length",numOfCalls.length)
        for (let index = 0; index < numOfCalls.length; index++) {
            if (numOfCalls[index].hour === relCallsOfAllDay[0].hour) {
                console.log("TRUE!!!");
               // alert("fiveMinAmount")
                let index2 = 0;
                while (index2 < relCallsOfAllDay.length) {
                    console.log(numOfCalls[index]);
                    numOfCalls[index].calls++;
                    index2++;
                    index++;
                }
            }
        }
        for(let i =0 ; i < numOfCalls.length; i++){
            if(numOfCalls[i].hour === relCallsOfAllDay[0].hour){
                var id = numOfCalls[i].hour
                document.getElementById(id+"-waiting").innerHTML++;
            }
        }
        $("#fiveMinAmountChart").dxChart("refresh");
    

    
        for (let index = 0; index < timeWaitingCalls.length; index++) {
           // alert("timeWaitingCalls.length")
            if (timeWaitingCalls[index].hour === relCallsOfAllDay[0].hour) {
                // console.log("TRUE!!!2");
                let index2 = 0;
                while (index2 < relCallsOfAllDay.length) {
                    // console.log(timeWatingCalls[index]);
                    // console.log(relCellsOfWholeDay[index2]);
                    // console.log("BEFOR AT HOUR: ", timeWatingCalls[index].hour, "we had", timeWatingCalls[index].avgTime, "time");
                    timeWaitingCalls[index].avgTime = relCallsOfAllDay[index2].avgWaitingTime;
                    // console.log("AFTER AT HOUR: ", timeWatingCalls[index].hour, "we have", timeWatingCalls[index].avgTime, "time");
                    index2++;
                    index++;
                }
            }
        }
        for(let i =0 ; i < timeWaitingCalls.length; i++){
            if(timeWaitingCalls[i].hour === relCallsOfAllDay[0].hour){
                var id = timeWaitingCalls[i].hour
                document.getElementById(id).innerHTML= timeWaitingCalls[i].avgTime;
            }
        }
        $("#fiveMinWaitingChart").dxChart("refresh");
    });


    socket.on("resetUI", () => {
        console.log("RESTARTING EVENT!");
        document.location.reload();
    });
    


}