const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const db = require("./database/db");
const app = express();
const port = 3000;

//view engine
app.set("view engine", "ejs");

//body-parser
app.use(express.urlencoded({ extented: false }));

//method override
app.use(methodOverride("_method"));

//connecting to db
mongoose
  .connect("mongodb://localhost:27017/rooms")
  .then(() => console.log("Connection successful..."))
  .catch((err) => console.log(err));

//socket connection
const io = require("socket.io")(4200, { cors: { origin: "*" } });
const users = {};

//new user joined
io.on("connection", (socket) => {
  socket.on("new-user-joined", (room, name) => {
    socket.join(room);
    users[socket.id] = name;
    socket.to(room).emit("user-joined", name);
  });

  //user send message
  socket.on("send", (room, message) => {
    socket.to(room).emit("recieve", {
      message: message,
      name: users[socket.id],
    });
  });

  //user disconnected
  socket.on("disconnect", (room) => {
    socket.to(room).emit("left", users[socket.id]);
    delete users[socket.id];
  });
});

//routes
app.use("/", require("./routes/router"));

//home route
app.get("/", async (req, res) => {
  const roomName = await db.find();
  res.render("index", { roomName });
});

//chat route
app.get("/chat/:slug", async (req, res) => {
  const blogs = await db.findOne({ slug: req.params.slug });
  res.render("chat", { blogs });
});

app.listen(port, () =>
  console.log(`App listening at: http://localhost:${port}`)
);
