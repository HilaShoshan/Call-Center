const path = require('path');
const http = require('http');

const express = require('express');
const redis = require('./models/redisClient');
const kafkaConsumer = require('./models/kafkaConsumer');
//const dashboardController = require('./controllers/dashboardController');

const app = express();
const server = http.createServer(app);
//const { Server } = require('socket.io');
//const io = new Server(server);
const PORT = 3002;

//app.set('view engine', 'ejs');
//app.set('views', 'views');

//app.use(express.static(path.join(__dirname, 'public')));

//app.get('/dashboard', dashboardController.renderDashboard);
/*
io.on('connection', socket => {

    console.log('client connected');
    
    socket.on('disconnect', () => {
      console.log('client disconnected');
    });
*/
    // reciving data in json format
kafkaConsumer.fetchData((err, reply) => {
  if(err) console.log(err);
  redis.storeData(reply)
})
/*
    socket.on('AllSectionStats', () => {
      dashboardController.AllSectionStats(socket, redis);
    });

    socket.on('SectionStat', sectionNum => {
      dashboardController.SectionStats(socket, sectionNum, redis);
    });

    socket.on('TrafficInfo', () => {
      dashboardController.TrafficInfo(socket, redis);
    });
    
  });
*/
server.listen(PORT, err => 
  {
    if (err) console.log('Error in server setup')
    console.log('Server listening on Port');
  })