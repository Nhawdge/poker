const express = require("express");
const app = express();

let server = app.listen(process.env.PORT || 2000, () => {
  console.log("Listening on http://localhost:2000");
});
let io = require("socket.io")(server);

app.use(express.static("web/public"));
var middleware = require("socketio-wildcard")();
io.use(middleware);

let CONNECTIONS = {};
let SESSIONS = {};
io.sockets.on("connection", function (socket) {
  CONNECTIONS[socket.id] = socket;

  socket.on("start", (payload) => {
    console.log(payload);
    if (!SESSIONS[payload.session]) {
      SESSIONS[payload.session] = { members: [new User(payload, socket.id)] };
    } else {
      SESSIONS[payload.session].members.push(new User(payload, socket.id));
    }
    SESSIONS[payload.session].members.forEach((u) => {
      if (CONNECTIONS[u.socketId]) {
        CONNECTIONS[u.socketId].emit(
          "update",
          SESSIONS[payload.session].members
        );
      }
    });
  });

  socket.on("disconnect", function () {
    delete CONNECTIONS[socket];
  });
});

function User({ name, role }, socketId) {
  this.name = name;
  this.role = role;
  this.socketId = socketId;
}
