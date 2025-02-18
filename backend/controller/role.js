const express = require("express");
const { PrismaClient } = require("@prisma/client");
const eventRoleValidator = require("../validation/Validator/role");
const prisma = new PrismaClient();
const router = express.Router();

// ✅ 1. Create an Event Role
router.post(
  "/create-role",
  eventRoleValidator.validateCreate,
  async (req, res) => {
    try {
      const { event_id, role_name, skills, description, volunteers } = req.body;

      const newEventRole = await prisma.eventRole.create({
        data: {
          event_id,
          role_name,
          skills,
          description,
          volunteers: { connect: volunteers.map((userId) => ({ id: userId })) },
        },
      });

      res.status(201).json(newEventRole);
    } catch (error) {
      console.log("error is: ", error);
      res.status(500).json({ error: error.message });
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
    const { role_name, skills, description, volunteers } = req.body;

    const updatedEventRole = await prisma.eventRole.update({
      where: { id },
      data: {
        role_name,
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

    res.json({ message: "Event Role deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
