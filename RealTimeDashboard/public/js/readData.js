// wating calls in bar chart function
$(function () {
    $("#chart").dxChart({
        dataSource: numOfCallers,
        series: {
            argumentField: "title",
            valueField: "numOfCallers",
            name: "number of REAL TIME calls in the call center",
            type: "bar",
            color: "#ff7171",
            
            
        },
        size: {
            height: 200,
            width: 200
        }
       
    });
});



// wating time in past 10 minuts bar chart function
$(function () {
    $("#timeWaitingChart").dxChart({
        dataSource: avgWaiting,
        series: {
            argumentField: "title",
            valueField: "avg",
            name: "minutes",
            type: "bar",
            color: "#00bcd4"
        },
        size: {
            height: 200,
            width: 200
        }
    });
});



// distribution by topic bar chart function
$(function () {
    $("#topicChart").dxChart({
        dataSource: topicSource,
        palette: "soft",
        commonSeriesSettings: {
            type: "bar",
            valueField: "amount",
            argumentField: "topic",
            ignoreEmptyPoints: true
        },
        seriesTemplate: {
            nameField: "topic"
        },
        size: {
            height: 200,
            width: 500
        }
    });
});

// 5 minuts wating calls aregression line chart function
$(function () {
    $("#fiveMinAmountChart").dxChart({
        dataSource: numOfCalls,
        commonSeriesSettings: {
            type: "line",
            argumentField: "hour",
            ignoreEmptyPoints: true,
            color: "#cc65fe"
        },
        series: [
            { valueField: "calls", name: "number of calls" }
        ],
        size: {
            height: 200,
            width: 400
        }
    });
});

// 5 minuts wting time aregression line chart function
$(function () {
    $("#fiveMinWaitingChart").dxChart({
        dataSource: timeWaitingCalls,
        commonSeriesSettings: {
            type: "line",
            argumentField: "hour",
            ignoreEmptyPoints: true,
            color: "#20c997"
        },
        series: [
            { valueField: "avgTime", name: "avg waiting time in minutes" }
        ],
        size: {
            height: 200,
            width: 400
        }
    });
});