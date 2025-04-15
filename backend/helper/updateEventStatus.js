var cron = require("node-cron");
const prisma = require("../db/db.server");

const updateEventStatus = async (event) => {
  console.log("updateEventStatus run!");
  console.log("event is: ", event);
  console.log("event.startTime is: ", event.startTime);
  const { id, startTime, endTime, status } = event;
  const now = new Date();
  if (startTime < now && status !== "UPCOMING") {
    // Update events that should be UPCOMING
    const updatedEvent = await prisma.event.updateMany({
      where: {
        id: id,
      },
      data: { status: "UPCOMING" },
    });

    const startTime2 = new Date(startTime);
    scheduleJob(startTime2, () => {
      updateEventStatus({ updatedEvent });
    });
    // const cronExpression = `${startTime2.getUTCMinutes()} ${startTime2.getUTCHours()} ${startTime2.getUTCDate()} ${
    //   startTime2.getUTCMonth() + 1
    // } *`;
    // cron.schedule(cronExpression, () => {
    //   updateEventStatus({ updatedEvent });
    // });
  } else if (startTime >= now && endTime > now && status !== "ONGOING") {
    // Update events that should be ONGOING
    const updatedEvent = await prisma.event.updateMany({
      where: {
        id: id,
        endTime: { lte: now },
      },
      data: { status: "ONGOING" },
    });
    const endtTime2 = new Date(endTime);

    scheduleJob(endtTime2, () => {
      updateEventStatus({ updatedEvent });
    });
    // const cronExpression = `${endtTime2.getUTCMinutes()} ${endtTime2.getUTCHours()} ${endtTime2.getUTCDate()} ${
    //   endtTime2.getUTCMonth() + 1
    // } *`;
    // cron.schedule(cronExpression, () => {
    //   updateEventStatus({ updatedEvent });
    // });
  } else if (endTime < now && status !== "COMPLETED") {
    // Update events that should be ONGOING
    await prisma.event.updateMany({
      where: {
        id: id,
      },
      data: { status: "COMPLETED" },
    });
  } else if (status === "UPCOMING") {
    const startTime2 = new Date(startTime);
    scheduleJob(startTime2, () => {
      updateEventStatus({ id, startTime, endTime, status });
    });
    // const cronExpression = `${startTime2.getUTCMinutes()} ${startTime2.getUTCHours()} ${startTime2.getUTCDate()} ${
    //   startTime2.getUTCMonth() + 1
    // } *`;

    // console.log("cronExpression: ", cronExpression);
    // cron.schedule(cronExpression, () => {
    //   updateEventStatus({ id, startTime, endTime, status });
    // });
  } else if (status === "ONGOING") {
    const endtTime2 = new Date(endTime);
    scheduleJob(endtTime2, () => {
      updateEventStatus({ id, startTime, endTime, status });
    });
    // const cronExpression = `${endtTime2.getUTCMinutes()} ${endtTime2.getUTCHours()} ${endtTime2.getUTCDate()} ${
    //   endtTime2.getUTCMonth() + 1
    // } *`;
    // cron.schedule(cronExpression, () => {
    //   updateEventStatus({ id, startTime, endTime, status });
    // });
  }
  if (!startTime || !endTime) {
    // Update events that should be ONGOING
    await prisma.Event.update({
      where: {
        id: id,
      },
      data: { status: "PENDING" },
    });
  }
};
const scheduleJob = (date, callback) => {
  const cronTime = `${date.getUTCMinutes()} ${date.getUTCHours()} ${date.getUTCDate()} ${
    date.getUTCMonth() + 1
  } ${date.getDay()}`;

  console.log("Scheduling cron job at:", cronTime);
  cron.schedule(cronTime, callback, { timezone: "UTC" });
};

module.exports = updateEventStatus;
