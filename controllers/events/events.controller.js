const Event = require("../../database/models/event");
const { getMissingRequiredFields } = require("../../utils/events");

const { EVENT } = require("../../constants/events");
const sendMail = require("../../services/email");
const sendConfirmationMail = require("../../services/email");

const createEvent = async (req, res) => {
  try {
    const { title, description, date, location, createdBy } = req.body;
    const missingFields = getMissingRequiredFields(EVENT, {
      title,
      description,
      date,
      location,
      createdBy,
    });
    if (missingFields.length > 0) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const event = new Event({
      title,
      description,
      date: new Date(date),
      location,
      createdBy,
    });
    event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

const updateEvent = async (req, res) => {
  try {
    const { title, description, date, location, createdBy } = req.body;
    const missingFields = getMissingRequiredFields("event", {
      title,
      description,
      date,
      location,
      createdBy,
    });
    if (missingFields.length > 0) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }

    event.title = title;
    event.description = description;
    event.date = date;
    event.location = location;
    event.createdBy = createdBy;
    await event.save();
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

const getEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

const registerAttendee = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ error: "Event not found" });
    }

    const { userId: attendeeId, userType } = req.body;
    if (!attendeeId || !userType) {
      return res.status(400).send({ error: "Missing required fields" });
    }

    if (userType !== "attendee") {
      return res.status(400).send({ error: "User is not an attendee" });
    }

    event.attendees.push(attendeeId);
    await event.save();

    sendConfirmationMail();
    res.send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  createEvent,
  updateEvent,
  getEvent,
  deleteEvent,
  registerAttendee,
};
