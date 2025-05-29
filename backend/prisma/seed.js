const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Clear existing data
  await prisma.notification.deleteMany();
  await prisma.eventRole.deleteMany();
  await prisma.eventImage.deleteMany();
  await prisma.event.deleteMany();
  await prisma.eventTest.deleteMany();
  await prisma.user.deleteMany();

  // Hash password
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create Admin User
  const admin = await prisma.user.create({
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
        public_id: "admin_profile",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
    },
  });

  // Create Volunteer Users
  const volunteers = await Promise.all(
    Array(20).fill(null).map((_, index) => {
      const volunteerData = [
        {
          name: "Muhammad Hassan",
          email: `volunteer1@example.com`,
          skills: ["First Aid", "Event Management", "Public Speaking"],
          interests: ["Healthcare", "Education", "Community Service"],
          profileImage: {
            public_id: "vol_profile_1",
            url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
          },
        },
        {
          name: "Aisha Malik", 
          email: `volunteer2@example.com`,
          skills: ["Teaching", "Translation", "Social Media"],
          interests: ["Education", "Women Empowerment", "Digital Literacy"],
          profileImage: {
            public_id: "vol_profile_2",
            url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          },
        },
        {
          name: "Omar Sheikh",
          email: `volunteer3@example.com`, 
          skills: ["Photography", "Video Editing", "Graphic Design"],
          interests: ["Arts", "Media", "Environmental Conservation"],
          profileImage: {
            public_id: "vol_profile_3",
            url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
          },
        },
        {
          name: "Zainab Ahmad",
          email: `volunteer4@example.com`,
          skills: ["Counseling", "Event Coordination", "Community Outreach"],
          interests: ["Mental Health", "Social Work", "Youth Development"],
          profileImage: {
            public_id: "vol_profile_4",
            url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
          },
        },
        {
          name: "Ali Raza",
          email: `volunteer5@example.com`,
          skills: ["IT Support", "Database Management", "Technical Training"],
          interests: ["Technology", "Digital Inclusion", "Skills Development"],
          profileImage: {
            public_id: "vol_profile_5",
            url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
          },
        },
        {
          name: "Sara Hussain",
          email: `volunteer6@example.com`,
          skills: ["Nursing", "Health Education", "Emergency Response"],
          interests: ["Healthcare", "Emergency Services", "Public Health"],
          profileImage: {
            public_id: "vol_profile_6",
            url: "https://images.unsplash.com/photo-1544717305-2782549b5136",
          },
        },
        {
          name: "Bilal Ahmed",
          email: `volunteer7@example.com`,
          skills: ["Construction", "Project Management", "Team Leadership"],
          interests: ["Community Development", "Infrastructure", "Housing"],
          profileImage: {
            public_id: "vol_profile_7",
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          },
        },
        {
          name: "Fatima Khan",
          email: `volunteer8@example.com`,
          skills: ["Teaching", "Mentoring", "Program Development"],
          interests: ["Education", "Youth Empowerment", "Skill Development"],
          profileImage: {
            public_id: "vol_profile_8",
            url: "https://images.unsplash.com/photo-1544717302-de2939b7ef71",
          },
        },
        {
          name: "Hassan Ali",
          email: `volunteer9@example.com`,
          skills: ["Sports Coaching", "First Aid", "Event Planning"],
          interests: ["Youth Sports", "Health", "Community Events"],
          profileImage: {
            public_id: "vol_profile_9",
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          },
        },
        {
          name: "Amina Syed",
          email: `volunteer10@example.com`,
          skills: ["Art Therapy", "Counseling", "Workshop Facilitation"],
          interests: ["Mental Health", "Arts", "Youth Development"],
          profileImage: {
            public_id: "vol_profile_10",
            url: "https://images.unsplash.com/photo-1544717305-996b815c338c",
          },
        },
        {
          name: "Usman Khan",
          email: `volunteer11@example.com`,
          skills: ["Digital Marketing", "Social Media Management", "Content Creation"],
          interests: ["Digital Literacy", "Youth Empowerment", "Technology"],
          profileImage: {
            public_id: "vol_profile_11",
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          },
        },
        {
          name: "Sana Malik",
          email: `volunteer12@example.com`,
          skills: ["Environmental Education", "Project Coordination", "Public Speaking"],
          interests: ["Environment", "Sustainability", "Community Engagement"],
          profileImage: {
            public_id: "vol_profile_12",
            url: "https://images.unsplash.com/photo-1544717305-2782549b5136",
          },
        },
        {
          name: "Imran Ahmed",
          email: `volunteer13@example.com`,
          skills: ["Financial Literacy", "Teaching", "Workshop Facilitation"],
          interests: ["Education", "Economic Empowerment", "Community Development"],
          profileImage: {
            public_id: "vol_profile_13",
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          },
        },
        {
          name: "Nadia Hassan",
          email: `volunteer14@example.com`,
          skills: ["Child Care", "Teaching", "Activity Planning"],
          interests: ["Early Education", "Child Development", "Community Service"],
          profileImage: {
            public_id: "vol_profile_14",
            url: "https://images.unsplash.com/photo-1544717305-2782549b5136",
          },
        },
        {
          name: "Kamran Malik",
          email: `volunteer15@example.com`,
          skills: ["Sports Training", "First Aid", "Event Management"],
          interests: ["Youth Sports", "Health", "Community Development"],
          profileImage: {
            public_id: "vol_profile_15",
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          },
        },
        {
          name: "Rabia Aziz",
          email: `volunteer16@example.com`,
          skills: ["Sign Language", "Special Education", "Disability Support"],
          interests: ["Inclusive Education", "Disability Rights", "Community Support"],
          profileImage: {
            public_id: "vol_profile_16",
            url: "https://images.unsplash.com/photo-1544717305-2782549b5136",
          },
        },
        {
          name: "Yasir Shah",
          email: `volunteer17@example.com`,
          skills: ["Food Safety", "Kitchen Management", "Nutrition Education"],
          interests: ["Food Security", "Nutrition", "Community Welfare"],
          profileImage: {
            public_id: "vol_profile_17",
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          },
        },
        {
          name: "Mehwish Khan",
          email: `volunteer18@example.com`,
          skills: ["Crisis Intervention", "Mental Health First Aid", "Support Group Facilitation"],
          interests: ["Mental Health", "Crisis Support", "Community Wellbeing"],
          profileImage: {
            public_id: "vol_profile_18",
            url: "https://images.unsplash.com/photo-1544717305-2782549b5136",
          },
        },
        {
          name: "Faisal Qureshi",
          email: `volunteer19@example.com`,
          skills: ["Elderly Care", "Healthcare Support", "Patient Care"],
          interests: ["Senior Welfare", "Healthcare", "Community Service"],
          profileImage: {
            public_id: "vol_profile_19",
            url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
          },
        },
        {
          name: "Hina Zahid",
          email: `volunteer20@example.com`,
          skills: ["Youth Mentoring", "Career Counseling", "Leadership Development"],
          interests: ["Youth Development", "Career Guidance", "Community Leadership"],
          profileImage: {
            public_id: "vol_profile_20",
            url: "https://images.unsplash.com/photo-1544717305-2782549b5136",
          },
        },
      ];

      return prisma.user.create({
        data: {
          ...volunteerData[index],
          password: hashedPassword,
          contactNumber: `+92-300-${Math.floor(1000000 + Math.random() * 9000000)}`,
          role: "Volunteer",
          experienceYears: Math.floor(1 + Math.random() * 5),
          description: `Dedicated volunteer with experience in ${volunteerData[index].skills.join(", ")}`,
        },
      });
    })
  );

  console.log(`✅ Created ${volunteers.length + 1} users (1 admin, ${volunteers.length} volunteers)`);

  // Create Events
  const eventTypes = [
    "Health Camp", "Educational Workshop", "Environmental Cleanup",
    "Food Distribution", "Digital Literacy", "Blood Donation",
    "Sports Event", "Art Workshop", "Mental Health Awareness",
    "Career Guidance", "Women Empowerment", "Youth Development",
    "Community Festival", "Skill Development", "Environmental Awareness",
    "Senior Care", "Children's Program", "Technology Workshop",
    "Cultural Exchange", "Fundraising Event"
  ];

  const locations = [
    "Community Center, Model Town, Lahore",
    "Public Library, DHA Phase 5, Lahore",
    "Sports Complex, Johar Town, Lahore",
    "Government School, Gulberg, Lahore",
    "Art Gallery, MM Alam Road, Lahore"
  ];

  const currentDate = new Date();
  const events = await Promise.all(
    eventTypes.map((type, index) => {
      const startTime = new Date(currentDate.getTime() + (index * 2 * 24 * 60 * 60 * 1000));
      const endTime = new Date(startTime.getTime() + (4 * 60 * 60 * 1000));
      const status = index < 5 ? "COMPLETED" : 
                    index < 10 ? "ONGOING" :
                    index < 15 ? "UPCOMING" : "PENDING";
      const isPass = status === "COMPLETED";

      return prisma.event.create({
        data: {
          adminId: admin.id,
          title: type,
          description: `Join us for this amazing ${type.toLowerCase()} event. This event aims to make a positive impact in our community.`,
          startTime,
          endTime,
          location: locations[Math.floor(Math.random() * locations.length)],
          status,
          isPass,
          images: {
            create: [
              {
                url: `https://example.com/images/${type.toLowerCase().replace(" ", "_")}_1.jpg`,
                publicId: `${type.toLowerCase().replace(" ", "_")}_1`,
                order: 1
              },
              {
                url: `https://example.com/images/${type.toLowerCase().replace(" ", "_")}_2.jpg`,
                publicId: `${type.toLowerCase().replace(" ", "_")}_2`,
                order: 2
              }
            ]
          },
          role: {
            create: [
              {
                role_name: "Team Leader",
                skills: ["Leadership", "Organization", "Communication"],
                description: "Lead and coordinate the volunteer team",
                maxVolunteers: 2,
                volunteers: {
                  connect: [
                    { id: volunteers[index % volunteers.length].id }
                  ]
                }
              },
              {
                role_name: "Support Staff",
                skills: ["Teamwork", "Time Management", "Problem Solving"],
                description: "Assist in various event activities",
                maxVolunteers: 3,
                volunteers: {
                  connect: [
                    { id: volunteers[(index + 1) % volunteers.length].id },
                    { id: volunteers[(index + 2) % volunteers.length].id }
                  ]
                }
              }
            ]
          }
        }
      });
    })
  );

  console.log(`✅ Created ${events.length} events with roles and images`);

  // Create Notifications
  const notifications = await Promise.all([
    // System notifications
    prisma.notification.create({
      data: {
        title: "System Update",
        message: "The platform will undergo maintenance this weekend.",
        status: "Unread"
      }
    }),
    // Admin notifications
    prisma.notification.create({
      data: {
        userId: admin.id,
        title: "New Volunteer Applications",
        message: "You have 5 new volunteer applications to review.",
        status: "Unread"
      }
    }),
    // Volunteer notifications
    ...volunteers.map((volunteer, index) => 
      prisma.notification.create({
        data: {
          userId: volunteer.id,
          title: "Event Assignment",
          message: `You have been assigned to the ${eventTypes[index % eventTypes.length]} event.`,
          status: "Unread"
        }
      })
    )
  ]);

  console.log(`✅ Created ${notifications.length} notifications`);

  console.log("🎉 Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
