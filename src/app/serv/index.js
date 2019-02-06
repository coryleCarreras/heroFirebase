var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var firebase = require("firebase");

var config = { apiKey: "AIzaSyBt4qiZEj7soWOFuU5FgHNFTf8JGGrGLzs", authDomain: "heroproj-f4228.firebaseapp.com",
                databaseURL: "https://heroproj-f4228.firebaseio.com", projectId:"heroproj-f4228", 
                storageBucket: "heroproj-f4228.appspot.com", messagingSenderId: "739594881383" };
firebase.initializeApp(config);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('chatMessage', function(msg){
        var m = new Date();
        var date = m.getFullYear()+':'+(+m.getMonth()+1)+':'+m.getDate()+'/'+m.getHours()+"/"+m.getMinutes()+"/"+m.getSeconds();
        if(firebase.database().ref('chats/'+date+'/').set({date: msg.date, user: msg.name, content: msg.content})){
            // console.log(date);
            // console.log(msg)
            io.emit('chatMessage', msg);
        }else{
            console.log("error")
        }
    });
    /*************** TODO : IMPLEMENT PRIVATE CHAT HERE AND IN APP ***************/
    // socket.on('privMessage', function(msg){
    //     var roomName = "room" + msg.idInitiator+';'+msg.idReceptioner
    //     socket.join(roomName);
    //     socket.idRoom = msg.idInitiator+';'+msg.idReceptioner
    //     io.to(roomName).emit(msg.content) // à peaufiner
    // });
});

http.listen(4201, function(){
  console.log('listening on *:4201');
});

