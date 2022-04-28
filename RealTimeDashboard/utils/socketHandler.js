module.exports = {
    init: (server) => {
        _socketIo = require("socket.io")(server)
        //const { Server } = require("socket.io");
        //_socketIo= new Server (server)
        console.log("socket is connected")
        return _socketIo
    },
    configureConn: () => {
        console.log("confff")
        _socketIo.on("connection", (socket)=>{
            console.log("client of socket connected")
            
        });
    },
    getSocket: () => {
        if(_socketIo){
            return _socketIo
        }
        else{
            throw new error("socketIO yet to be connected")

        }
    }
};