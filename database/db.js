const express = require("express");
const mongoose = require("mongoose");
const slugify = require("slugify");

// roomName schema
const schema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
  },
  slug: String,
});

schema.pre("validate", function (next) {
  if (this.roomName) {
    this.slug = slugify(this.roomName).toLowerCase();
  }
  next();
});

module.exports = new mongoose.model("Room", schema);
