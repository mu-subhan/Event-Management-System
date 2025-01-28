const express = require("express");
const router = express.Router();

// custome files
const prisma = require("../db/db.server");
const eventValidator = require("../validation/Validator/event");

// Create an event
router.post(
  "/create-event",
  eventValidator.createEventValidation,
  async (req, res) => {
    try {
      const event = await prisma.events.create({
        data: req.body,
      });
      res.status(201).json(event);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to create event", details: error.message });
    }
  }
);

// Read all events (findMany)
router.get("/events", async (req, res) => {
  try {
    const events = await prisma.events.findMany();
    res.status(200).json(events);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch events", details: error.message });
  }
});

// Read a single event by ID
router.get("/events/:id", async (req, res) => {
  try {
    const event = await prisma.events.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch event", details: error.message });
  }
});

// Update an event by ID
router.put(
  "/events/:id",
  eventValidator.createEventValidation,
  async (req, res) => {
    try {
      const event = await prisma.events.update({
        where: { id: parseInt(req.params.id) },
        data: req.body,
      });
      res.status(200).json(event);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to update event", details: error.message });
    }
  }
);

// Delete an event by ID
router.delete("/events/:id", async (req, res) => {
  try {
    await prisma.events.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to delete event", details: error.message });
  }
});

module.exports = router;
