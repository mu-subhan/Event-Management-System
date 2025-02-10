const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

// ✅ 1. Create an Event Role
router.post("/", async (req, res) => {
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
    res.status(500).json({ error: error.message });
  }
});

// ✅ 2. Get All Event Roles
router.get("/", async (req, res) => {
  try {
    const eventRoles = await prisma.eventRole.findMany({
      include: { volunteers: true, event: true },
    });
    res.json(eventRoles);
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
