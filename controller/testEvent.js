// import { PrismaClient } from '@prisma/client';
const prisma = require("../db/db.server");
const cron = require("node-cron");

// const prisma = new PrismaClient();

const createEvent = async ({ title, startTime, endTime }) => {
  const now = new Date();

  let status = "PENDING";
  let isPass = false;

  if (now < new Date(startTime)) {
    status = "UPCOMING";
  } else if (now >= new Date(startTime) && now < new Date(endTime)) {
    status = "ONGOING";
  } else if (now >= new Date(endTime)) {
    status = "COMPLETED";
    isPass = true;
  }

  const event = await prisma.eventTest.create({
    data: {
      title,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      status,
      isPass,
    },
  });

  console.log(`Created event "${event.title}" with initial status: ${status}`);

  // Schedule status update to ONGOING
  if (status === "UPCOMING") {
    scheduleStatusUpdate(event.id, startTime, "ONGOING");
    scheduleStatusUpdate(event.id, endTime, "COMPLETED", true);
  }

  if (status === "ONGOING") {
    scheduleStatusUpdate(event.id, endTime, "COMPLETED", true);
  }

  return event;
};

const scheduleStatusUpdate = (eventId, time, newStatus, markPass = false) => {
  const date = new Date(time);

  // Schedule format: 'sec min hour day month weekday'
  const cronTime = `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${
    date.getMonth() + 1
  } *`;

  cron.schedule(cronTime, async () => {
    await prisma.eventTest.update({
      where: { id: eventId },
      data: {
        status: newStatus,
        isPass: markPass,
      },
    });
    console.log(`Event ${eventId} updated to ${newStatus}`);
  });

  console.log(`Scheduled ${newStatus} update for event ${eventId} at ${date}`);
};
module.exports = { createEvent, scheduleStatusUpdate };
