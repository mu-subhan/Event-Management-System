const express = require("express");
const { PrismaClient } = require("@prisma/client");
const eventRoleValidator = require("../validation/Validator/role");
const { isAuthenticated, isAdmin } = require("../middleware/auth");
const prisma = new PrismaClient();
const router = express.Router();
// ✅ 1. Create an Event Role
router.post(
  "/create-role",
  eventRoleValidator.validateCreate,
  isAuthenticated,
  isAdmin("Admin"),
  async (req, res) => {
    try {
      const { event_id, role_name, skills, description, maxVolunteers } =
        req.body;

      const newEventRole = await prisma.eventRole.create({
        data: {
          event_id,
          role_name,
          skills,
          description,
          maxVolunteers,
        },
      });

      res.status(201).json({ success: true, eventRole: newEventRole });
    } catch (error) {
      console.log("error is: ", error);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// ✅ 2. Get All Event Roles with Pagination
router.get("/get-roles/:id", async (req, res) => {
  try {
    const event_id = req.params.id || null;
    const { page = 1 } = req.query; // Default page is 1
    const limit = 10; // Number of roles per page
    const skip = (page - 1) * limit;

    const eventRoles = await prisma.eventRole.findMany({
      where: { event_id: event_id },
      skip,
      take: limit,
      include: { volunteers: true, event: true },
    });

    const totalRoles = await prisma.eventRole.count({
      where: { event_id: event_id },
    }); // Get total number of roles
    const totalPages = Math.ceil(totalRoles / limit);

    res.json({
      eventRoles,
      totalPages,
      currentPage: Number(page),
      totalRoles,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ 3. Get an Event Role by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const eventRole = await prisma.eventRole.findUnique({
      where: { id },
      include: { volunteers: true, event: true },
    });

    if (!eventRole) {
      return res.status(404).json({ message: "Event Role not found" });
    }

    res.json(eventRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ 4. Update an Event Role
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role_name, skills, description, volunteers, event_id } = req.body;

    const updatedEventRole = await prisma.eventRole.update({
      where: { id },
      data: {
        role_name,
        event_id,
        skills,
        description,
        volunteers: { set: volunteers.map((userId) => ({ id: userId })) },
      },
    });

    res.json(updatedEventRole);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ 5. Delete an Event Role
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.eventRole.delete({ where: { id } });

    res.json({ success: true, message: "Event Role deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: error?.message || "Internal Server Problem",
      error: error.message,
    });
  }
});
// ✅ 6. Assign a Volunteer to an Event Role
router.post("/:roleId/assign", async (req, res) => {
  try {
    const { roleId } = req.params;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userId is required in the request body",
      });
    }

    // Assuming there is a relation table like eventRoleVolunteers or a field like assignedVolunteers
    await prisma.eventRole.update({
      where: { id: roleId },
      data: {
        volunteers: {
          connect: { id: userId },
        },
      },
    });

    res.json({
      success: true,
      message: "Volunteer assigned to role successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.message || "Internal Server Problem",
      error: error.message,
    });
  }
});

// assign volunteer to role
// ✅ 2. Assign a volunteer to a role
router.post(
  "/assign-volunteer",
  isAuthenticated,
  isAdmin("Admin"),
  async (req, res) => {
    try {
      const { volunteerId, roleId, eventId } = req.body;

      if (!volunteerId || !roleId || !eventId) {
        return res.status(400).json({
          success: false,
          message: "volunteerId, roleId, and eventId are required.",
        });
      }

      // ✅ Check if volunteer is already assigned to any role in this event
      const isAlreadyAssigned = await prisma.eventRole.findFirst({
        where: {
          event_id: eventId,
          volunteers: {
            some: { id: volunteerId },
          },
        },
      });

      if (isAlreadyAssigned) {
        return res.status(400).json({
          success: false,
          message: "Volunteer is already assigned to a role in this event.",
        });
      }
      const targetRole = await prisma.eventRole.findUnique({
        where: { id: roleId },
        include: { volunteers: true }, // get current volunteer count
      });
      console.log(
        "targetRole.volunteers.length >= targetRole?.maxVolunteers: ",
        targetRole.volunteers.length >= targetRole?.maxVolunteers
      );
      console.log(
        "targetRole.volunteers.length : ",
        targetRole.volunteers.length
      );
      console.log("targetRole?.maxVolunteers: ", targetRole?.maxVolunteers);
      if (targetRole.volunteers.length >= targetRole?.maxVolunteers) {
        return res.status(400).json({
          success: false,
          message:
            "Cannot assign more volunteers. Max volunteer limit reached for this role.",
        });
      }

      // ✅ Proceed with assignment
      const updatedRole = await prisma.eventRole.update({
        where: { id: roleId },
        data: {
          volunteers: {
            connect: { id: volunteerId },
          },
        },
        include: {
          volunteers: true,
        },
      });

      res.status(200).json({
        success: true,
        message: "Volunteer assigned successfully",
        role: updatedRole,
      });
    } catch (error) {
      console.error("Error assigning volunteer:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  }
);

module.exports = router;
