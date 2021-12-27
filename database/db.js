const express = require("express");
const mongoose = require("mongoose");

// roomName schema
const schema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = new mongoose.model("Room", schema);
