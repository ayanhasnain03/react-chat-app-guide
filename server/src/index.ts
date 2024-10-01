import { createServer } from "http";
import express from "express";
import { Server } from "socket.io";

const PORT = 3000;
const app = express();

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Ensure this matches your React app's URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (client) => {
  console.log("client connected");
  client.on("message", (message) => {
    console.log(message);
    client.emit("message", message);
  });
  io.on("disconnect", () => {
    console.log("client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
