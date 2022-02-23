const { createPool} = require('mysql');
const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'callcenter'
  
})



pool.query('SELECT name FROM callcenter.customers where idCustomer in(select idCustomer from callcenter.calldetails where numberOfCalls>2)', (err,result, fields)=>{
    if(err){
        return console.log(err)
    }
    return console.log(result)
})