// Node server which will handle socketio connections


const io = require("socket.io")(8080,{
    cors: {
        origin: ["http://127.0.0.1:5500"],
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
})
const users ={}
io.on('connection', (socket) =>{
    socket.on('new-user-joined',names=>{
        // console.log("new user", names)
        users[socket.id]=names;
        socket.broadcast.emit('connected',names)
    });
    
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message, names: users[socket.id]})
    });
    socket.on('disconnect',()=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    });
})
