const express = require("express");
const mongoose = require("mongoose");
const slugify = require("slugify");

// chat schema
const chatSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now(), expires: 7200 }, //msg disappear after 2 hrs
  roomName: String,
  userName: String,
  userChat: String,
});

module.exports = new mongoose.model("chat", chatSchema);
