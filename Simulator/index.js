// BEN HILA


const ApiService = require('./api-service');
const CallsSimulator = require('./simulator');
const callsSimulator = new CallsSimulator();
const HOST = 'http://localhost:3000';

async function letGO(){

// get id from simulator
const customerId = callsSimulator.getCustomerID();


// use id to request server
const res = await ApiService.get(HOST + '/' + customerId); 

console.log(res);

/**
 * {
 * exists: boolean
 * customerData?: Customer
 * }
 */

// use data in simulator hatif function (grill)
   

// use apiService post 

}


letGO();