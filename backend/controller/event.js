const express = require("express");
const router = express.Router();

// custome files
const prisma = require("../db/db.server");
const eventValidator = require("../validation/Validator/event");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// Create an event
router.post(
  "/create-event",
  isAuthenticated,
  isAdmin("Admin"),
  eventValidator.createEventValidation,
  async (req, res) => {
    try {
      const event = await prisma.Event.create({
        data: { ...req.body, role: { create: [...req.body.role] } },
      });
      res.status(201).json(event);
    } catch (error) {
      console.log("error is: ", error);
      res
        .status(500)
        .json({ error: "Failed to create event", details: error.message });
    }
  }
);

// Read all events (findMany)
router.get("/events", async (req, res) => {
  try {
    const events = await prisma.Event.findMany();
    res.status(200).json({ success: true, events });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch events", details: error.message });
  }
});

// Read a single event by ID
router.get("/events/:id", async (req, res) => {
  try {
    const event = await prisma.Event.findUnique({
      where: { id: req.params.id },
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
      const event = await prisma.Event.update({
        where: { id: req.params.id },
        data: { ...req.body, role: { create: [...req.body.role] } },
      });
      res.status(200).json(event);
    } catch (error) {
      console.log("error is: ", error);
      res
        .status(500)
        .json({ error: "Failed to update event", details: error.message });
    }
  }
);

// Delete an event by ID
router.delete(
  "/events/:id",
  isAuthenticated,
  isAdmin("Admin"),
  async (req, res) => {
    try {
      await prisma.Event.delete({
        where: { id: req.params.id },
      });

      res
        .status(200)
        .json({ success: true, message: "Event Deleted Successfully!" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to delete event", details: error.message });
    }
  }
);

module.exports = router;
