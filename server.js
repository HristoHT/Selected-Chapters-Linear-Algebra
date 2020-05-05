const express = require('express');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
require('dotenv').config();

//For auth
const cors = require("cors");
//
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // extended = true is depricated
// app.use(cors({ origin: `http://localhost:3000` })); // Accept cross-origin requests from the frontend app
// app.use(function (req, res, next) {
//     req.io = io;
//     next();
// });

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

let messagesList = [];

io.on('connection', socket => {
    socket.emit('send-messages', messagesList);

    socket.on('new-message', (message) => {
        messagesList.push(message);
        io.emit('send-messages', messagesList);
    })
});


http.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))
