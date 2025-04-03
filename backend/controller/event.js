const express = require("express");
const router = express.Router();
// custome files
const updateEventStatus = require("../helper/updateEventStatus");
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
      const now = new Date();
      if (now > new Date(req.body.startTime)) {
        return res
          .status(400)
          .send({ success: false, message: "StartTDate Should b In Future" });
      }
      let status = "UPCOMING";
      if (
        now >= new Date(req.body.startTime) &&
        now < new Date(req.body.endTime)
      ) {
        status = "ONGOING";
      } else if (now >= new Date(req.body.endTime)) {
        status = "COMPLETED";
      }
      const event = await prisma.Event.create({
        data: {
          ...req.body,
          startTime: new Date(req.body.startTime),
          endTime: new Date(req.body.endTime),
          status,
          role: { create: [...req.body.role] },
        },
      });
      console.log("event is: ", event);
      await updateEventStatus(event);
      res.status(201).json({ success: true, event });
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
    console.log("req.query is: ", req.query);
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const limit = parseInt(req.query.limit) || 6; // Default limit to 6 events per page
    const skip = (page - 1) * limit; // Calculate the number of items to skip

    // Fetch events with pagination
    const events = await prisma.Event.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc", // Sort by newest events first
      },
    });

    // Get the total count of events
    const totalEvents = await prisma.Event.count();

    res.status(200).json({
      success: true,
      events,
      totalPages: Math.ceil(totalEvents / limit),
      currentPage: page,
    });
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
      const now = new Date();
      if (
        (req.body.startTime && now < new Date(req.body.startTime)) ||
        new Date(req.body.endTime) < new Date(req.body.startTime)
      ) {
        return res
          .status(400)
          .send({ success: false, message: "Invalid Time" });
      }

      let status = "UPCOMING";
      if (
        req.body.startTime &&
        req.body.endTime &&
        now >= new Date(req.body.startTime) &&
        now < new Date(req.body.endTime)
      ) {
        status = "ONGOING";
      } else if (req.body.endTime && now >= new Date(req.body.endTime)) {
        status = "COMPLETED";
      }

      const event = await prisma.Event.update({
        where: { id: req.params.id },
        data: { ...req.body, role: { create: [...req.body.role] } },
      });
      await updateEventStatus(event);
      res.status(200).json({ success: true, event });
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
