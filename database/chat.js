const express = require("express");
const mongoose = require("mongoose");
const slugify = require("slugify");

// roomName schema
const chatSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now(), expires: 7200 },
  roomName: String,
  userName: String,
  userChat: String,
});

module.exports = new mongoose.model("chat", chatSchema);
