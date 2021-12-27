const express = require("express");
const db = require("../database/db");
const router = express.Router();

router.post("/create-room", (req, res) => {
  const createDoc = async () => {
    try {
      const chatRoom = new db({
        roomName: req.body.name,
      });

      const roomName = await db.insertMany([chatRoom]);
      console.log(roomName);
      res.redirect("/");
    } catch {
      (err) => console.log(err);
    }
  };
  createDoc();
});

//delete room
router.delete("/:id", async (req, res) => {
  await db.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
