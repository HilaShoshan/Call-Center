const ApiService = require('./api-service')
const CallsSimulator = require('./simulator')
const utils = require("./utils")
const callsSimulator = new CallsSimulator()
const HOST = 'http://localhost:3000'


async function sendCallRecord() {

    // get customer ID from simulator
    const customerId = callsSimulator.getCustomerID()
    // console.log("customerId: ", customerId)

    // ask the server to check if the ID is of an existing customer
    const res = await ApiService.get(HOST + '/' + customerId)

    /** res is a JSON in form:
     * 
     * If not exists: { exists: false }
     * ELSE (example): 
            {
                exists: true,
                customerData: {
                    CustomerID: 1111,
                    FirstName: 'Rony',
                    LastName: 'Cohen',
                    DateOfBirth: '2000-07-03T21:00:00.000Z',
                    City: 'Haifa',
                    Gender: 1,
                    Internet: 0,
                    CableTV: 1,
                    Cellular: 1
                }
            }
     */

    // send res details to the simulator and get a call record 
    var exists = false
    if (res.exists) {
        exists = true
    }
    var callRecord = await callsSimulator.getCallRecord(customerId, exists, res.customerData)

    // use apiService post (it will publish to Kafka)
    console.log("sending a call ...")
    await ApiService.post(HOST + '/sendCall', callRecord)
}

var delayInMilliseconds = 0

function wait(ms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('resolved');
      }, ms);
    });
  }


async function asyncCall() {
    for (let i = 0; i < 1000; i++) {
        sendCallRecord()  // will be executed after delayInMilliseconds
        delayInMilliseconds = utils.getRndInteger(1000, 30000)  // random delay between 1 second to 30 seconds
        await wait(delayInMilliseconds); 
    }
    // expected output: "resolved"
  }
  asyncCall();