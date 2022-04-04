const ApiService = require('./api-service')
const CallsSimulator = require('./simulator')
const callsSimulator = new CallsSimulator()
const HOST = 'http://localhost:3000'


async function sendCallRecord() {

    // TODO: Do all the code below in a for loop

    // get customer ID from simulator
    const customerId = callsSimulator.getCustomerID() 
    // console.log("customerId: ", customerId)

    // ask the server to check if the ID is of an existing customer
    const res = await ApiService.get(HOST + '/' + customerId)

    /** res is a JSON in form:
     * 
     * If not exists: { exists: false }
     * ELSE: {
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
    callRecord = callsSimulator.getCallRecord(customerId, exists, res.customerData)

    // use apiService post (it will publish to Kafka)

}

sendCallRecord()