const express = require("express");

const router = express.Router();

const {
  createEvent,
  updateEvent,
  getEvent,
  deleteEvent,
  registerAttendee,
} = require("../controllers/events/events.controller");

router.post("/", createEvent);
router.put("/:id", updateEvent);
router.get("/:id", getEvent);
router.delete("/:id", deleteEvent);
router.post("/:id/register", registerAttendee);

module.exports = router;
