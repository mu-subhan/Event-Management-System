const express = require("express");
const router = express.Router();
// custome files
const { scheduleStatusUpdate } = require("../helper/updateEventStatus");
const prisma = require("../db/db.server");
const eventValidator = require("../validation/Validator/event");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const sendMail = require("../utils/sendMail");

// Create an event
router.post(
  "/create-event",
  isAuthenticated,
  isAdmin("Admin"),
  eventValidator.createEventValidation,
  async (req, res) => {
    try {
      console.log("req.body: ", req.body);
      const now = new Date();
      if (now > new Date(req.body.startTime)) {
        return res
          .status(400)
          .send({ success: false, message: "StartTDate Should b In Future" });
      }
      const startTime = new Date(req.body.startTime);
      const endTime = new Date(req.body.endTime);
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
          startTime,
          endTime,
          status,
          role: { create: [...req.body.role] },
        },
      });
      console.log("event is: ", event);
      // Schedule status update to ONGOING
      if (status === "UPCOMING") {
        scheduleStatusUpdate(event.id, req.body.startTime, "ONGOING");
        scheduleStatusUpdate(event.id, req.body.endTime, "COMPLETED", true);
      }

      if (status === "ONGOING") {
        scheduleStatusUpdate(event.id, req.body.endTime, "COMPLETED", true);
      }
      // await updateEventStatus(event);
      return res.status(201).json({ success: true, event });
    } catch (error) {
      console.log("error is: ", error);
      return res
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

router.get("/status-counts", async (req, res) => {
  try {
    const now = new Date();

    // Count for UPCOMING events
    const upcomingCount = await prisma.Event.count({
      where: {
        startTime: { gt: now },
      },
    });

    // Count for ONGOING events
    const ongoingCount = await prisma.Event.count({
      where: {
        startTime: { lte: now },
        endTime: { gte: now },
      },
    });

    // Count for PAST events
    const pastCount = await prisma.Event.count({
      where: {
        endTime: { lt: now },
      },
    });

    // Count for PENDING events based on status field in DB
    const pendingCount = await prisma.event.count({
      where: {
        status: "PENDING",
      },
    });

    const result = [
      { status: "UPCOMING", count: upcomingCount },
      { status: "ONGOING", count: ongoingCount },
      { status: "COMPLETED", count: pastCount },
      { status: "PENDING", count: pendingCount },
    ];

    res.status(200).json({ success: true, eventsCount: result });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch status counts",
      details: error.message,
    });
  }
});

// Read a single event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await prisma.Event.findUnique({
      where: { id: req.params.id },
      include: {
        role: {
          include: {
            volunteers: true, // assuming volunteers is the field name in the relation
          },
        },
      },
    });
    console.log("event Found is: ", event);
    if (!event) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }
    res.status(200).json({ success: true, event });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch event",
      details: error.message,
    });
  }
});

// Update an event by ID
router.put("/:id", eventValidator.updateEventValidation, async (req, res) => {
  try {
    const now = new Date();
    if (
      (req.body.startTime && now < new Date(req.body.startTime)) ||
      new Date(req.body.endTime) < new Date(req.body.startTime)
    ) {
      return res.status(400).send({ success: false, message: "Invalid Time" });
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

    // const event = await prisma.Event.update({
    //   where: { id: req.params.id },
    //   data: { ...req.body, role: { create: [...req.body.role] } },
    // });
    const { role: roleUpdates, ...eventData } = req.body;

    const event = await prisma.Event.update({
      where: { id: req.params.id },
      data: {
        ...eventData,
        // Update each role individually
        role: {
          update: roleUpdates.map((r) => ({
            where: { id: r.id }, // must include id of existing role
            data: {
              role_name: r.role_name,
              skills: r.skills,
              description: r.description,
            },
          })),
        },
      },
    });

    // await updateEventStatus(event);
    res.status(200).json({ success: true, event });
  } catch (error) {
    console.log("error is: ", error);
    res
      .status(500)
      .json({ error: "Failed to update event", details: error.message });
  }
});

// Delete an event by ID
router.delete(
  "/events/:id",
  isAuthenticated,
  isAdmin("Admin"),
  async (req, res) => {
    try {
      const event = await prisma.Event.delete({
        where: { id: req.params.id },
      });

      res
        .status(200)
        .json({ success: true, message: "Event Deleted Successfully!", event });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to delete event", details: error.message });
    }
  }
);
router.post("/request-join", isAuthenticated, async (req, res) => {
  try {
    console.log("Request to join event received:", req.body);
    const { eventId, userId } = req.body;
    if (!eventId || !userId) {
      return res.status(400).json({ error: "Event ID and User ID required" });
    }

    // Fetch event details
    const event = await prisma.Event.findUnique({
      where: { id: eventId },
    });
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Fetch user details
    const user = await prisma.User.findUnique({
      where: { id: userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userTimezone = user.timezone || "UTC"; // get user timezone from DB or fallback

    const startDateFormatted = new Date(event.startTime).toLocaleString(
      "en-US",
      {
        timeZone: userTimezone,
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    );

    const endDateFormatted = new Date(event.endTime).toLocaleString("en-US", {
      timeZone: userTimezone,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Compose email content
    const subject = `Request to Join Event: ${event.title}`;
    const html = `
        <p>Hello Admin,</p>
        <p>User <strong>${user.name}</strong> (${
      user.email
    }) has requested to join the event <strong>${event.title}</strong>.</p>
        <p>Event Details:</p>
        <ul>
          <li><strong>Name:</strong> ${event.title}</li>
          <li><strong>Start Date:</strong> ${startDateFormatted}</li>
          <li><strong>End Date:</strong> ${endDateFormatted}</li>
          <li><strong>Description:</strong> ${event.description || "N/A"}</li>
        </ul>
        <p>Please review this request and take necessary action.</p>
        <p>Regards,<br/>Your Team</p>
      `;
    const adminEmail = process.env.Admin_EMAIL; // Ensure you have an environment variable for admin email
    if (!adminEmail) {
      return res.status(500).json({ error: "Admin email not configured" });
    }
    // Send email to admin
    await sendMail({
      email: adminEmail,
      subject,
      html,
    });

    return res.json({
      success: true,
      message: "Request to join event sent to admin successfully.",
    });
  } catch (error) {
    console.error("Error in request join event:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
