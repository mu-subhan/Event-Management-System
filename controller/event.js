const express = require("express");
const router = express.Router();
// custome files
const prisma = require("../db/db.server");
const sendMail = require("../utils/sendMail");
const { scheduleStatusUpdate } = require("../helper/updateEventStatus");
const eventValidator = require("../validation/Validator/event");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const cloudinary = require("cloudinary");
const { upload } = require("../config/multer");
const { deleteImages } = require("../utils/cloudinary");
// Create an event
router.post(
  "/create-event",
  upload.array("images", 5),
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
      let images = [];
      if (req.files && req.files.length > 0) {
        try {
          images = req.files.map((file, index) => ({
            url: file.path,
            publicId: file.filename,
            order: 1 + index,
          }));
        } catch (error) {
          console.error("Upload error:", error);
          return res.status(500).json({
            success: false,
            message: "Failed to upload images.",
            error: error.message,
          });
        }
      }
      const event = await prisma.Event.create({
        data: {
          ...req.body,
          startTime,
          endTime,
          status,
          images: {
            create: images, // Assuming you have an 'images' field in your Event model
          },
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
      // ✅ Rollback: delete already-uploaded Cloudinary images using req.files
      if (req.files && req.files.length > 0) {
        const publicIds = req.files.map((file) => file.filename);
        const deleteResults = await deleteImages(publicIds);
        console.log("Rolled back uploaded images:", deleteResults);
      }

      return res.status(500).json({
        success: false,
        message: error?.message || "error in Creation of Image!",
        error: "Failed to create event",
        details: error.message,
      });
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
      include: {
        images: true, // Include images related to the event
      },
    });
    console.log("All Events ARe: ", events);
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
        // startTime: { gt: now },
        status: "UPCOMING", // Assuming you want to count only UPCOMING events
      },
    });

    // Count for ONGOING events
    const ongoingCount = await prisma.Event.count({
      where: {
        status: "ONGOING", // Assuming you want to count only ONGOING events
        // startTime: { lte: now },
        // endTime: { gte: now },
      },
    });

    // Count for PAST events
    const pastCount = await prisma.Event.count({
      where: {
        status: "COMPLETED", // Assuming you want to count only COMPLETED events
        // endTime: { lt: now },
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
// Search events by name
router.get("/search", async (req, res) => {
  const { title } = req.query;
  console.log("title: ", title);
  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Search term (name) is required.",
    });
  }
  try {
    const events = await prisma.Event.findMany({
      where: {
        title: {
          contains: title,
          mode: "insensitive", // Case-insensitive search
        },
      },
      include: {
        images: true, // Include images related to the event
      },
    });
    console.log("events Are: ", events);
    return res.status(200).json({
      success: true,
      events,
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      message: "Error searching events.",
      error: error.message,
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
        images: true,
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
    const startTime = new Date(req.body.startTime);
    const endTime = new Date(req.body.endTime);
    console.log("startTime is: ", startTime);
    console.log("endTime is: ", endTime);
    console.log("now is: ", now);
    if (!startTime || !endTime || startTime >= endTime) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid time range." });
    }
    if (endTime < now) {
      return res
        .status(400)
        .send({ success: false, message: "Event has already ended." });
    }

    let status = "UPCOMING";
    let isPass = false;
    if (startTime && endTime && now >= startTime && now < endTime) {
      status = "ONGOING";
    } else if (endTime && now >= endTime) {
      status = "COMPLETED";
      isPass = true;
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
        startTime,
        endTime,
        status,
        isPass,
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
      const { id: eventId } = req.params;
      if (!eventId) {
        return res.status(400).json({
          success: false,
          message: "Event ID is required for deletion.",
        });
      }
      const images = await prisma.EventImage.findMany({
        where: { eventId },
        select: { publicId: true },
      });

      const publicIds = images.map((img) => img.publicId);
      // 2. Delete from Cloudinary
      const cloudinaryResults = await deleteImages(publicIds);
      const event = await prisma.Event.delete({
        where: { id: req.params.id },
      });
      res
        .status(200)
        .json({ success: true, message: "Event Deleted Successfully!", event });
    } catch (error) {
      console.error("Error deleting event:", error);
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
    const adminEmail = process.env.ADMIN_EMAIL; // Ensure you have an environment variable for admin email
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
router.post(
  "/upload-file",
  isAuthenticated,
  isAdmin("Admin"),
  upload.array("images", 5),
  async (req, res) => {
    console.log("API Request Recieved!");
    console.log("Upload file request received:", req.body);
    try {
      console.log("Upload file request received:", req.body);
      const { eventId } = req.body;

      if (!eventId) {
        return res
          .status(400)
          .json({ success: false, message: "Event ID is required." });
      }
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No files uploaded.",
        });
      }

      const images = req.files.map((file) => ({
        url: file.path,
        public_id: file.filename,
      }));
      try {
        const existingImages = await prisma.EventImage.findMany({
          where: { eventId },
          orderBy: { order: "desc" },
          take: 1,
        });

        const currentMaxOrder =
          existingImages.length > 0 ? existingImages[0].order : 0;

        await prisma.EventImage.createMany({
          data: images.map((img, index) => ({
            url: img.url,
            publicId: img.public_id,
            eventId: eventId,
            order: currentMaxOrder + index + 1,
          })),
        });

        return res.status(200).json({
          success: true,
          message: "Files uploaded successfully.",
          images,
        });
      } catch (error) {
        console.error("Upload error:", error);

        // On error, delete uploaded files from Cloudinary
        for (const img of images) {
          try {
            await cloudinary.v2.uploader.destroy(img.public_id);
          } catch (delErr) {
            console.error("Error deleting image from Cloudinary:", delErr);
          }
        }

        return res.status(500).json({
          success: false,
          message: "Failed to upload images.",
          error: error.message,
        });
      }
    } catch (error) {
      console.error("Upload error:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to upload images.",
        error: error.message,
      });
    }
  }
);
router.delete(
  "/delete-file",
  isAuthenticated,
  isAdmin("Admin"),
  async (req, res) => {
    const { images } = req.body;
    console.log("Images to delete:", images);
    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images provided for deletion.",
      });
    }
    const deletionResults = [];
    try {
      for (const image of images) {
        const imageId = image?.public_id;

        if (!imageId) {
          deletionResults.push({
            public_id: imageId,
            status: "failed",
            message: "Missing public_id",
          });
          continue;
        }

        const cloudinaryResult = await cloudinary.v2.uploader.destroy(imageId);
        if (cloudinaryResult.result === "ok") {
          // 2. Delete from database (EventImage) by publicId
          const dbResult = await prisma.EventImage.deleteMany({
            where: {
              publicId: imageId,
            },
          });

          deletionResults.push({
            public_id: imageId,
            status: "deleted",
            message: "Deleted from Cloudinary and database",
            dbDeletedCount: dbResult.count,
          });
        } else {
          deletionResults.push({
            public_id: imageId,
            status: "failed",
            message: "Failed to delete from Cloudinary",
          });
        }

        // deletionResults.push({
        //   public_id: imageId,
        //   status: result.result === "ok" ? "deleted" : "not found",
        //   message: result.result,
        // });
      }

      return res.status(200).json({
        success: true,
        message: "Deletion process completed.",
        results: deletionResults,
      });
    } catch (error) {
      console.error("Deletion error:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during image deletion.",
        error: error.message,
      });
    }
  }
);

module.exports = router;
