const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  // Hash password for all volunteers (using 'password123' as default)
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Create 5 volunteers with different skills and interests
  const volunteers = [
    {
      name: "Ahmad Ali",
      email: "ahmad.ali@email.com",
      password: hashedPassword,
      contactNumber: "+92-300-1234567",
      role: "volunteer",
      skills: ["Communication", "Leadership", "Event Planning", "Photography"],
      interests: ["Education", "Community Development", "Arts & Culture"],
      experienceYears: 3,
      profileImage: {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        alt: "Ahmad Ali Profile",
      },
      description:
        "Passionate volunteer with experience in community events and educational programs. Love helping others and making a positive impact in society.",
    },
    {
      name: "Fatima Khan",
      email: "fatima.khan@email.com",
      password: hashedPassword,
      contactNumber: "+92-301-9876543",
      role: "volunteer",
      skills: ["Teaching", "Childcare", "First Aid", "Social Media"],
      interests: ["Education", "Youth Development", "Health"],
      experienceYears: 2,
      profileImage: {
        url: "https://images.unsplash.com/photo-1494790108755-2616b612b100?w=150&h=150&fit=crop&crop=face",
        alt: "Fatima Khan Profile",
      },
      description:
        "Dedicated educator and volunteer focused on youth development and health awareness programs. Certified in First Aid and CPR.",
    },
    {
      name: "Hassan Ahmed",
      email: "hassan.ahmed@email.com",
      password: hashedPassword,
      contactNumber: "+92-302-5555666",
      role: "volunteer",
      skills: ["Technology", "Data Entry", "Problem Solving", "Marketing"],
      interests: ["Technology", "Environment", "Disaster Relief"],
      experienceYears: 4,
      profileImage: {
        url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        alt: "Hassan Ahmed Profile",
      },
      description:
        "Tech enthusiast with strong analytical skills. Experienced in digital marketing and environmental conservation projects.",
    },
    {
      name: "Ayesha Malik",
      email: "ayesha.malik@email.com",
      password: hashedPassword,
      contactNumber: "+92-303-7777888",
      role: "volunteer",
      skills: ["Food Service", "Teamwork", "Elderly Care", "Communication"],
      interests: ["Health", "Community Development", "Animal Welfare"],
      experienceYears: 5,
      profileImage: {
        url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        alt: "Ayesha Malik Profile",
      },
      description:
        "Compassionate volunteer with extensive experience in healthcare and elderly care. Strong believer in community service and animal welfare.",
    },
    {
      name: "Usman Sheikh",
      email: "usman.sheikh@email.com",
      password: hashedPassword,
      contactNumber: "+92-304-9999000",
      role: "volunteer",
      skills: ["Manual Labor", "Leadership", "Event Planning", "Photography"],
      interests: ["Environment", "Sports & Recreation", "Disaster Relief"],
      experienceYears: 1,
      profileImage: {
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        alt: "Usman Sheikh Profile",
      },
      description:
        "Energetic and hardworking volunteer with a passion for environmental causes and sports activities. Ready to help in any capacity needed.",
    },
  ];

  // Insert volunteers one by one
  for (const volunteer of volunteers) {
    const user = await prisma.user.create({
      data: volunteer,
    });
    console.log(`✅ Created volunteer: ${user.name} (${user.email})`);
  }

  // Create one admin user as well
  const admin = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin@system.com",
      password: hashedPassword,
      contactNumber: "+92-300-0000000",
      role: "admin",
      description: "System Administrator",
    },
  });
  console.log(`✅ Created admin: ${admin.name} (${admin.email})`);

  console.log("🎉 Seed completed successfully!");
  console.log("\n📋 Summary:");
  console.log("- 5 volunteers created");
  console.log("- 1 admin created");
  console.log("- Default password for all users: password123");
}

main()
  .catch((e) => {
    console.error("❌ Error during seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
