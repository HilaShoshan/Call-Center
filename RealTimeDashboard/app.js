const express = require("express");
const app = express();
const path = require("path");
const router = require("./routes/routes");
const kafkaHandler = require("./utils/kafkaConnector.js");
const controllers = require("./controllers/controllers.js");
const redisConnector = require("./utils/redisHandler.js");
const setFlushingOnRedis = require("./utils/redisRester.js");

const kafkaListenersSetter = require("./models/kafkaHandler");

const socketHandler = require("./utils/socketHandler");


app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

app.use("/", controllers.redirect);
kafkaHandler.connectToKafka()
    .then(() => {
        redisConnector.connectRedis(() => {
            
            const hour = 0;
            const min = 0;
            setFlushingOnRedis(hour, min);
            controllers.init();
            kafkaListenersSetter();
            const server = app.listen(4000);
            console.log("connected to server");
            socketHandler.init(server);
            console.log("socket-serve")
            socketHandler.configureConn();
            
        });
    })
    .catch(err => { throw err; });
