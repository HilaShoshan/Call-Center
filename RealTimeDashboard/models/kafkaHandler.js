const kafkaConnect = require("../utils/kafkaConnector")
const CallData = require("./CallData")


const controllers = require("../controllers/controllers");
const CallDataCollection = require("./CallDataCollection")


module.exports = setListenersOnKafka = () => {
    const consumerAPI = kafkaConnect.getConsumerAPI()
    consumerAPI.on("data", (m) => {
        console.log("got data from kafka")
        if (m.value.toString().includes("topic")){
            const nCallData = new CallData(m.value.toString())
            nCallData.updateRedis()
            CallDataCollection.addCallDataInstance(nCallData)
            controllers.newCallEnded(nCallData)
            controllers.numOfCallerChanged(CallDataCollection.getUpdatedNumberOfCallers())
            //
            /*
            const nNumOfCallers = new NumOfCallers(m.value.toString());
            nNumOfCallers.updateRedis();
            NumOfCallersCollection.addNumOfCallersInstance(nNumOfCallers);
            controllers.numOfCallerChanged(nNumOfCallers.getNumOfCallers());

            //
        }
        else{
            const nNumOfCallers = new NumOfCallers(m.value.toString());
            nNumOfCallers.updateRedis();
            NumOfCallersCollection.addNumOfCallersInstance(nNumOfCallers);
            controllers.numOfCallersChanged(nNumOfCallers.getNumOfCallers());
       */ }
    });
};