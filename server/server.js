const http = require('http');
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
const io = require('socket.io')(server);

io.connections = {};  //To keep track of connected clients


io.on('connection', (socket) => {
  const connectionId = socket.id;
  console.log(`Client connected: ${connectionId}`);


  // Remove connection
  socket.on('disconnect', () => {
    console.log(`Client ${connectionId} disconnected`)
  });
});


app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/public'));
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const devicesRouter = require("./routes/devices");
const dataRouter = require("./routes/data");

// place this middleware before any other route definitions
// makes io available as req.io in all request handlers
app.use(function (req, res, next) {
  req.io = io;
  next();
});


app.use("/devices", devicesRouter);
app.use("/data", dataRouter);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

