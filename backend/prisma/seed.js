const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data (optional - uncomment if you want to reset)
  await prisma.notification.deleteMany();
  await prisma.eventRole.deleteMany();
  await prisma.event.deleteMany();
  await prisma.eventTest.deleteMany();
  await prisma.user.deleteMany();

  // Hash passwords for users
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Admin Users
  const admin1 = await prisma.user.create({
    data: {
      name: "Ahmed Ali",
      email: "admin@example.com",
      password: hashedPassword,
      contactNumber: "+92-300-1234567",
      role: "Admin",
      skills: [],
      interests: [],
      experienceYears: 5,
      description: "Experienced event organizer and community leader",
      profileImage: {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
        alt: "Admin profile picture",
      },
    },
  });

  const admin2 = await prisma.user.create({
    data: {
      name: "Fatima Khan",
      email: "fatima.admin@example.com",
      password: hashedPassword,
      contactNumber: "+92-301-9876543",
      role: "Admin",
      skills: [],
      interests: [],
      experienceYears: 3,
      description: "NGO coordinator with passion for social causes",
      profileImage: {
        url: "https://images.unsplash.com/photo-1494790108755-2616c64e5e3a?w=150",
        alt: "Admin profile picture",
      },
    },
  });

  // Create Volunteer Users
  const volunteers = await Promise.all([
    prisma.user.create({
      data: {
        name: "Muhammad Hassan",
        email: "hassan.volunteer@example.com",
        password: hashedPassword,
        contactNumber: "+92-302-1111111",
        role: "Volunteer",
        skills: ["First Aid", "Event Management", "Public Speaking"],
        interests: ["Healthcare", "Education", "Community Service"],
        experienceYears: 2,
        description:
          "Medical student passionate about community health initiatives",
        profileImage: {
          url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
          alt: "Volunteer profile picture",
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Aisha Malik",
        email: "aisha.volunteer@example.com",
        password: hashedPassword,
        contactNumber: "+92-303-2222222",
        role: "Volunteer",
        skills: ["Teaching", "Translation", "Social Media"],
        interests: ["Education", "Women Empowerment", "Digital Literacy"],
        experienceYears: 1,
        description: "Teacher dedicated to educational outreach programs",
        profileImage: {
          url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
          alt: "Volunteer profile picture",
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Omar Sheikh",
        email: "omar.volunteer@example.com",
        password: hashedPassword,
        contactNumber: "+92-304-3333333",
        role: "Volunteer",
        skills: ["Photography", "Video Editing", "Graphic Design"],
        interests: ["Arts", "Media", "Environmental Conservation"],
        experienceYears: 3,
        description:
          "Creative professional supporting environmental awareness campaigns",
        profileImage: {
          url: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150",
          alt: "Volunteer profile picture",
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Zainab Ahmad",
        email: "zainab.volunteer@example.com",
        password: hashedPassword,
        contactNumber: "+92-305-4444444",
        role: "Volunteer",
        skills: ["Counseling", "Event Coordination", "Community Outreach"],
        interests: ["Mental Health", "Social Work", "Youth Development"],
        experienceYears: 4,
        description:
          "Psychology graduate working in community mental health support",
        profileImage: {
          url: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150",
          alt: "Volunteer profile picture",
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Ali Raza",
        email: "ali.volunteer@example.com",
        password: hashedPassword,
        contactNumber: "+92-306-5555555",
        role: "Volunteer",
        skills: ["IT Support", "Database Management", "Technical Training"],
        interests: ["Technology", "Digital Inclusion", "Skills Development"],
        experienceYears: 2,
        description:
          "Software engineer volunteering for digital literacy programs",
      },
    }),
    prisma.user.create({
      data: {
        name: "Sara Hussain",
        email: "sara.volunteer@example.com",
        password: hashedPassword,
        contactNumber: "+92-307-6666666",
        role: "Volunteer",
        skills: ["Nursing", "Health Education", "Emergency Response"],
        interests: ["Healthcare", "Emergency Services", "Public Health"],
        experienceYears: 3,
        description:
          "Registered nurse volunteering for health awareness programs",
        profileImage: {
          url: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150",
          alt: "Volunteer profile picture",
        },
      },
    }),
    prisma.user.create({
      data: {
        name: "Bilal Ahmed",
        email: "bilal.volunteer@example.com",
        password: hashedPassword,
        contactNumber: "+92-308-7777777",
        role: "Volunteer",
        skills: ["Construction", "Project Management", "Team Leadership"],
        interests: ["Community Development", "Infrastructure", "Housing"],
        experienceYears: 5,
        description:
          "Civil engineer helping with community development projects",
      },
    }),
  ]);

  console.log(`✅ Created ${volunteers.length + 2} users`);

  // Create Events
  const currentDate = new Date();
  const futureDate1 = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); // 1 week from now
  const futureDate2 = new Date(
    currentDate.getTime() + 14 * 24 * 60 * 60 * 1000
  ); // 2 weeks from now
  const pastDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 1 week ago

  const events = await Promise.all([
    prisma.event.create({
      data: {
        adminId: admin1.id,
        title: "Community Health Camp",
        description:
          "Free medical checkup and health awareness program for the local community. We will provide basic health screening, blood pressure checks, diabetes testing, and health education sessions.",
        startTime: futureDate1,
        endTime: new Date(futureDate1.getTime() + 6 * 60 * 60 * 1000), // 6 hours later
        location: "Community Center, Model Town, Lahore",
        status: "UPCOMING",
        isPass: false,
      },
    }),
    prisma.event.create({
      data: {
        adminId: admin1.id,
        title: "Educational Workshop for Underprivileged Children",
        description:
          "Interactive learning sessions covering basic mathematics, English, and computer literacy for children from low-income families.",
        startTime: futureDate2,
        endTime: new Date(futureDate2.getTime() + 4 * 60 * 60 * 1000), // 4 hours later
        location: "Government School, Gulberg, Lahore",
        status: "PENDING",
        isPass: false,
      },
    }),
    prisma.event.create({
      data: {
        adminId: admin2.id,
        title: "Environmental Cleanup Drive",
        description:
          "Join us for a community-wide cleanup initiative to make our neighborhood cleaner and greener. We will clean parks, streets, and plant trees.",
        startTime: new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        endTime: new Date(
          currentDate.getTime() + 3 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000
        ), // 3 hours later
        location: "Liberty Market Area, Lahore",
        status: "UPCOMING",
        isPass: false,
      },
    }),
    prisma.event.create({
      data: {
        adminId: admin2.id,
        title: "Food Distribution Drive",
        description:
          "Monthly food distribution program for families in need. We provide essential groceries and cooked meals.",
        startTime: pastDate,
        endTime: new Date(pastDate.getTime() + 5 * 60 * 60 * 1000), // 5 hours later
        location: "Masjid Al-Noor, Johar Town, Lahore",
        status: "COMPLETED",
        isPass: true,
      },
    }),
    prisma.event.create({
      data: {
        adminId: admin1.id,
        title: "Digital Literacy Training",
        description:
          "Computer and internet training sessions for seniors and those new to technology. Basic computer skills, email, and online safety.",
        startTime: new Date(currentDate.getTime() + 1 * 60 * 60 * 1000), // 1 hour from now
        endTime: new Date(currentDate.getTime() + 4 * 60 * 60 * 1000), // 3 hours duration
        location: "Public Library, DHA Phase 5, Lahore",
        status: "ONGOING",
        isPass: false,
      },
    }),
    prisma.event.create({
      data: {
        adminId: admin2.id,
        title: "Blood Donation Camp",
        description:
          "Community blood donation drive to help local hospitals maintain blood bank supplies. All healthy adults welcome to donate.",
        startTime: new Date(currentDate.getTime() + 21 * 24 * 60 * 60 * 1000), // 3 weeks from now
        endTime: new Date(
          currentDate.getTime() + 21 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000
        ), // 4 hours later
        location: "Shaukat Khanum Hospital, Lahore",
        status: "PENDING",
        isPass: false,
      },
    }),
  ]);

  console.log(`✅ Created ${events.length} events`);

  // Create Event Roles with maxVolunteers
  const eventRoles = await Promise.all([
    // Roles for Community Health Camp
    prisma.eventRole.create({
      data: {
        event_id: events[0].id,
        role_name: "Medical Assistant",
        skills: ["First Aid", "Basic Medical Knowledge", "Patient Care"],
        description:
          "Assist medical professionals in conducting health checkups and managing patient flow",
        maxVolunteers: 3,
        volunteers: {
          connect: [
            { id: volunteers[0].id },
            { id: volunteers[3].id },
            { id: volunteers[5].id },
          ],
        },
      },
    }),
    prisma.eventRole.create({
      data: {
        event_id: events[0].id,
        role_name: "Registration Coordinator",
        skills: ["Organization", "Communication", "Data Entry"],
        description:
          "Handle patient registration and maintain attendance records",
        maxVolunteers: 2,
        volunteers: {
          connect: [{ id: volunteers[4].id }],
        },
      },
    }),

    // Roles for Educational Workshop
    prisma.eventRole.create({
      data: {
        event_id: events[1].id,
        role_name: "Teaching Assistant",
        skills: ["Teaching", "Patience", "Child Psychology"],
        description:
          "Support main instructors and help children with individual learning needs",
        maxVolunteers: 4,
        volunteers: {
          connect: [{ id: volunteers[1].id }],
        },
      },
    }),
    prisma.eventRole.create({
      data: {
        event_id: events[1].id,
        role_name: "Activity Coordinator",
        skills: ["Creativity", "Event Management", "Leadership"],
        description:
          "Organize interactive activities and games to make learning fun",
        maxVolunteers: 2,
        volunteers: {
          connect: [{ id: volunteers[2].id }],
        },
      },
    }),

    // Roles for Environmental Cleanup
    prisma.eventRole.create({
      data: {
        event_id: events[2].id,
        role_name: "Team Leader",
        skills: ["Leadership", "Organization", "Environmental Awareness"],
        description:
          "Lead cleanup teams and coordinate activities across different areas",
        maxVolunteers: 3,
        volunteers: {
          connect: [{ id: volunteers[0].id }, { id: volunteers[6].id }],
        },
      },
    }),
    prisma.eventRole.create({
      data: {
        event_id: events[2].id,
        role_name: "Documentation Specialist",
        skills: ["Photography", "Social Media", "Report Writing"],
        description:
          "Document the cleanup process and create content for social media awareness",
        maxVolunteers: 2,
        volunteers: {
          connect: [{ id: volunteers[2].id }],
        },
      },
    }),

    // Roles for Food Distribution (Completed Event)
    prisma.eventRole.create({
      data: {
        event_id: events[3].id,
        role_name: "Distribution Coordinator",
        skills: ["Organization", "Crowd Management", "Empathy"],
        description:
          "Manage food distribution queue and ensure fair distribution",
        maxVolunteers: 5,
        volunteers: {
          connect: [
            { id: volunteers[1].id },
            { id: volunteers[3].id },
            { id: volunteers[6].id },
          ],
        },
      },
    }),

    // Roles for Digital Literacy Training
    prisma.eventRole.create({
      data: {
        event_id: events[4].id,
        role_name: "IT Instructor",
        skills: ["Computer Skills", "Teaching", "Patience"],
        description:
          "Provide hands-on computer training and troubleshoot technical issues",
        maxVolunteers: 3,
        volunteers: {
          connect: [{ id: volunteers[4].id }],
        },
      },
    }),
    prisma.eventRole.create({
      data: {
        event_id: events[4].id,
        role_name: "Learning Support",
        skills: ["Communication", "Patience", "Problem Solving"],
        description:
          "Provide one-on-one support to learners who need extra help",
        maxVolunteers: 4,
        volunteers: {
          connect: [{ id: volunteers[1].id }],
        },
      },
    }),

    // Roles for Blood Donation Camp
    prisma.eventRole.create({
      data: {
        event_id: events[5].id,
        role_name: "Medical Support",
        skills: ["Nursing", "Health Screening", "Emergency Response"],
        description:
          "Assist with donor screening and provide medical support during donation",
        maxVolunteers: 4,
        volunteers: {
          connect: [{ id: volunteers[5].id }],
        },
      },
    }),
    prisma.eventRole.create({
      data: {
        event_id: events[5].id,
        role_name: "Volunteer Coordinator",
        skills: ["Organization", "Communication", "Event Management"],
        description: "Coordinate volunteer activities and manage donor flow",
        maxVolunteers: 2,
        volunteers: {
          connect: [{ id: volunteers[0].id }],
        },
      },
    }),
    prisma.eventRole.create({
      data: {
        event_id: events[5].id,
        role_name: "Registration & Reception",
        skills: ["Customer Service", "Data Entry", "Communication"],
        description:
          "Handle donor registration and provide information about the donation process",
        maxVolunteers: 3,
        volunteers: {
          connect: [{ id: volunteers[4].id }],
        },
      },
    }),
  ]);

  console.log(`✅ Created ${eventRoles.length} event roles`);

  // Create Notifications
  const notifications = await Promise.all([
    // Notifications for Admin 1
    prisma.notification.create({
      data: {
        userId: admin1.id,
        title: "New Volunteer Application",
        message:
          "Muhammad Hassan has applied to volunteer for the Community Health Camp event.",
        status: "Unread",
      },
    }),
    prisma.notification.create({
      data: {
        userId: admin1.id,
        title: "Event Reminder",
        message:
          "Your Digital Literacy Training event is starting in 1 hour. Please make sure all preparations are complete.",
        status: "Read",
      },
    }),
    prisma.notification.create({
      data: {
        userId: admin1.id,
        title: "Role Capacity Alert",
        message:
          "Medical Assistant role for Community Health Camp is now full (3/3 volunteers assigned).",
        status: "Unread",
      },
    }),

    // Notifications for Admin 2
    prisma.notification.create({
      data: {
        userId: admin2.id,
        title: "Event Completion Report",
        message:
          "Food Distribution Drive has been completed successfully. 50 families were served.",
        status: "Read",
      },
    }),
    prisma.notification.create({
      data: {
        userId: admin2.id,
        title: "Volunteer Update",
        message:
          "Omar Sheikh has updated his availability for the Environmental Cleanup Drive.",
        status: "Unread",
      },
    }),
    prisma.notification.create({
      data: {
        userId: admin2.id,
        title: "New Event Approved",
        message:
          "Your Blood Donation Camp event has been approved and is now visible to volunteers.",
        status: "Read",
      },
    }),

    // Notifications for Volunteers
    prisma.notification.create({
      data: {
        userId: volunteers[0].id,
        title: "Role Assignment Confirmation",
        message:
          "You have been assigned as Medical Assistant for the Community Health Camp. Event details have been sent to your email.",
        status: "Read",
      },
    }),
    prisma.notification.create({
      data: {
        userId: volunteers[1].id,
        title: "Upcoming Event Reminder",
        message:
          "You have an upcoming event: Educational Workshop for Underprivileged Children in 3 days.",
        status: "Unread",
      },
    }),
    prisma.notification.create({
      data: {
        userId: volunteers[2].id,
        title: "Thank You Message",
        message:
          "Thank you for your excellent work as Documentation Specialist. Your photos really helped promote our cause!",
        status: "Unread",
      },
    }),
    prisma.notification.create({
      data: {
        userId: volunteers[3].id,
        title: "Event Update",
        message:
          "The location for Community Health Camp has been updated. Please check event details.",
        status: "Dismissed",
      },
    }),
    prisma.notification.create({
      data: {
        userId: volunteers[4].id,
        title: "New Skill Training Opportunity",
        message:
          "A new training session for advanced IT skills is available. Would you like to participate?",
        status: "Unread",
      },
    }),
    prisma.notification.create({
      data: {
        userId: volunteers[5].id,
        title: "Medical Volunteer Needed",
        message:
          "Your nursing skills are needed for the upcoming Blood Donation Camp. You have been pre-selected for the Medical Support role.",
        status: "Unread",
      },
    }),
    prisma.notification.create({
      data: {
        userId: volunteers[6].id,
        title: "Leadership Role Offer",
        message:
          "Based on your experience, you have been offered a Team Leader role for the Environmental Cleanup Drive.",
        status: "Read",
      },
    }),

    // General/System Notifications
    prisma.notification.create({
      data: {
        userId: null,
        title: "System Maintenance",
        message:
          "The platform will undergo maintenance on Sunday from 2 AM to 4 AM. Limited functionality may be available.",
        status: "Unread",
      },
    }),
    prisma.notification.create({
      data: {
        userId: null,
        title: "New Feature Available",
        message:
          "We have added volunteer capacity limits for event roles to help better manage volunteer assignments.",
        status: "Unread",
      },
    }),
    prisma.notification.create({
      data: {
        userId: null,
        title: "Community Achievement",
        message:
          "Our volunteer community has reached 1000+ registered volunteers! Thank you for being part of this journey.",
        status: "Unread",
      },
    }),
  ]);

  console.log(`✅ Created ${notifications.length} notifications`);

  // Create EventTest data
  const eventTests = await Promise.all([
    prisma.eventTest.create({
      data: {
        title: "Test Event 1 - Blood Donation Camp",
        startTime: new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000),
        endTime: new Date(
          currentDate.getTime() + 5 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000
        ),
        status: "UPCOMING",
        isPass: false,
      },
    }),
    prisma.eventTest.create({
      data: {
        title: "Test Event 2 - Skills Development Workshop",
        startTime: pastDate,
        endTime: new Date(pastDate.getTime() + 6 * 60 * 60 * 1000),
        status: "COMPLETED",
        isPass: true,
      },
    }),
    prisma.eventTest.create({
      data: {
        title: "Test Event 3 - Community Iftar",
        startTime: new Date(currentDate.getTime() + 10 * 24 * 60 * 60 * 1000),
        endTime: new Date(
          currentDate.getTime() + 10 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000
        ),
        status: "PENDING",
        isPass: false,
      },
    }),
    prisma.eventTest.create({
      data: {
        title: "Test Event 4 - Emergency Response Training",
        startTime: new Date(currentDate.getTime() + 2 * 60 * 60 * 1000), // 2 hours from now
        endTime: new Date(currentDate.getTime() + 7 * 60 * 60 * 1000), // 5 hours duration
        status: "ONGOING",
        isPass: false,
      },
    }),
  ]);

  console.log(`✅ Created ${eventTests.length} test events`);

  console.log("🎉 Seed completed successfully!");
  console.log("\n📊 Summary:");
  console.log(
    `- Users: ${volunteers.length + 2} (2 admins, ${
      volunteers.length
    } volunteers)`
  );
  console.log(`- Events: ${events.length}`);
  console.log(
    `- Event Roles: ${eventRoles.length} (with maxVolunteers specified)`
  );
  console.log(`- Notifications: ${notifications.length}`);
  console.log(`- Test Events: ${eventTests.length}`);
  console.log("\n🔐 Login Credentials:");
  console.log("Admin: admin@example.com / password123");
  console.log("Admin: fatima.admin@example.com / password123");
  console.log("Volunteer: hassan.volunteer@example.com / password123");
  console.log("(All users have the same password: password123)");
  console.log("\n📋 Event Roles Capacity Overview:");
  console.log("- Medical Assistant: 3/3 volunteers (FULL)");
  console.log("- Registration Coordinator: 1/2 volunteers");
  console.log("- Teaching Assistant: 1/4 volunteers");
  console.log("- Activity Coordinator: 1/2 volunteers");
  console.log("- Team Leader: 2/3 volunteers");
  console.log("- Documentation Specialist: 1/2 volunteers");
  console.log("- And more roles with varying capacities...");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
