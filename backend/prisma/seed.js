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
      skills: ["Event Management", "Leadership", "Project Planning"],
      interests: ["Community Development", "Social Impact", "Volunteer Management"],
      experienceYears: 5,
      description: "Experienced event organizer with expertise in coordinating large-scale community initiatives and managing volunteer teams.",
      profileImage: {
        public_id: "admin_profile",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
    },
  });

  // Create Volunteer Users with specific skills for ML matching
  const volunteerData = [
    {
      name: "Muhammad Hassan",
      email: "volunteer1@example.com",
      skills: ["Emergency Response", "First Aid Certification", "Crisis Management", "Medical Camp Coordination"],
      interests: ["Healthcare Services", "Emergency Medicine", "Community Health"],
      description: "Certified emergency response professional with extensive experience in medical camps.",
      profileImage: {
        public_id: "vol_profile_1",
        url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      },
    },
    {
      name: "Aisha Malik",
      email: "volunteer2@example.com",
      skills: ["Special Education", "Curriculum Development", "Workshop Facilitation", "Educational Assessment"],
      interests: ["Inclusive Education", "Child Development", "Educational Innovation"],
      description: "Specialized educator with focus on special needs and inclusive learning methodologies.",
      profileImage: {
        public_id: "vol_profile_2",
        url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      },
    },
    {
      name: "Omar Sheikh",
      email: "volunteer3@example.com",
      skills: ["Environmental Science", "Waste Management", "Conservation Planning", "Sustainability Assessment"],
      interests: ["Environmental Protection", "Sustainable Development", "Community Education"],
      description: "Environmental scientist specializing in conservation and sustainability projects.",
      profileImage: {
        public_id: "vol_profile_3",
        url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      },
    },
    {
      name: "Zainab Ahmad",
      email: "volunteer4@example.com",
      skills: ["Mental Health Counseling", "Crisis Intervention", "Group Therapy", "Psychological First Aid"],
      interests: ["Mental Health Awareness", "Youth Counseling", "Community Support"],
      description: "Licensed mental health counselor specializing in youth and crisis intervention.",
      profileImage: {
        public_id: "vol_profile_4",
        url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
      },
    },
    {
      name: "Ali Raza",
      email: "volunteer5@example.com",
      skills: ["Digital Literacy", "Computer Training", "Technology Education", "IT Support"],
      interests: ["Technology Education", "Digital Inclusion", "STEM Outreach"],
      description: "Technology educator focused on bridging the digital divide in communities.",
      profileImage: {
        public_id: "vol_profile_5",
        url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      },
    },
    {
      name: "Sara Hussain",
      email: "volunteer6@example.com",
      skills: ["Public Health", "Health Education", "Vaccination Programs", "Community Health"],
      interests: ["Preventive Healthcare", "Health Awareness", "Medical Outreach"],
      description: "Public health specialist with experience in community health programs.",
      profileImage: {
        public_id: "vol_profile_6",
        url: "https://images.unsplash.com/photo-1544717305-2782549b5136",
      },
    },
    {
      name: "Bilal Ahmed",
      email: "volunteer7@example.com",
      skills: ["Project Management", "Construction Safety", "Team Leadership", "Site Coordination"],
      interests: ["Infrastructure Development", "Community Building", "Urban Planning"],
      description: "Project manager with expertise in community infrastructure development.",
      profileImage: {
        public_id: "vol_profile_7",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
    },
    {
      name: "Fatima Khan",
      email: "volunteer8@example.com",
      skills: ["Youth Mentoring", "Career Counseling", "Leadership Development", "Program Management"],
      interests: ["Youth Empowerment", "Career Development", "Skill Building"],
      description: "Youth development specialist focusing on career guidance and leadership.",
      profileImage: {
        public_id: "vol_profile_8",
        url: "https://images.unsplash.com/photo-1544717302-de2939b7ef71",
      },
    },
    {
      name: "Hassan Ali",
      email: "volunteer9@example.com",
      skills: ["Sports Coaching", "Physical Education", "First Aid", "Team Building"],
      interests: ["Youth Sports", "Athletic Development", "Health & Fitness"],
      description: "Sports coach specializing in youth athletics and team development.",
      profileImage: {
        public_id: "vol_profile_9",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
    },
    {
      name: "Amina Syed",
      email: "volunteer10@example.com",
      skills: ["Art Therapy", "Creative Workshop", "Counseling", "Group Facilitation"],
      interests: ["Mental Health", "Creative Expression", "Youth Development"],
      description: "Art therapist with experience in mental health and youth programs.",
      profileImage: {
        public_id: "vol_profile_10",
        url: "https://images.unsplash.com/photo-1544717305-2782549b5136",
      },
    },
    {
      name: "Usman Khan",
      email: "volunteer11@example.com",
      skills: ["Digital Marketing", "Social Media Strategy", "Content Creation", "Online Engagement"],
      interests: ["Digital Communication", "Social Impact", "Community Outreach"],
      description: "Digital marketing specialist focused on social impact initiatives.",
      profileImage: {
        public_id: "vol_profile_11",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
    },
    {
      name: "Sana Malik",
      email: "volunteer12@example.com",
      skills: ["Environmental Education", "Conservation", "Public Speaking", "Project Planning"],
      interests: ["Environmental Awareness", "Sustainability", "Community Action"],
      description: "Environmental educator specializing in community conservation projects.",
      profileImage: {
        public_id: "vol_profile_12",
        url: "https://images.unsplash.com/photo-1544717305-2782549b5136",
      },
    },
    {
      name: "Imran Ahmed",
      email: "volunteer13@example.com",
      skills: ["Financial Education", "Business Planning", "Workshop Facilitation", "Mentoring"],
      interests: ["Economic Empowerment", "Financial Literacy", "Entrepreneurship"],
      description: "Financial educator focused on community economic development.",
      profileImage: {
        public_id: "vol_profile_13",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
    },
    {
      name: "Nadia Hassan",
      email: "volunteer14@example.com",
      skills: ["Early Childhood Education", "Child Psychology", "Activity Planning", "Parent Education"],
      interests: ["Child Development", "Family Support", "Educational Play"],
      description: "Early childhood specialist with expertise in developmental education.",
      profileImage: {
        public_id: "vol_profile_14",
        url: "https://images.unsplash.com/photo-1544717305-2782549b5136",
      },
    },
    {
      name: "Kamran Malik",
      email: "volunteer15@example.com",
      skills: ["Sports Management", "Event Planning", "First Aid", "Team Coordination"],
      interests: ["Sports Development", "Youth Athletics", "Community Sports"],
      description: "Sports management professional specializing in community athletics programs.",
      profileImage: {
        public_id: "vol_profile_15",
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      },
    }
  ];

  const volunteers = await Promise.all(
    volunteerData.map(data => 
      prisma.user.create({
        data: {
          ...data,
          password: hashedPassword,
          contactNumber: `+92-300-${Math.floor(1000000 + Math.random() * 9000000)}`,
          role: "Volunteer",
          experienceYears: Math.floor(1 + Math.random() * 5),
        },
      })
    )
  );

  console.log(`✅ Created ${volunteers.length + 1} users (1 admin, ${volunteers.length} volunteers)`);

  // Create Events with specific roles for ML matching
  const eventTypes = [
    {
      title: "Emergency Medical Camp",
      description: "A comprehensive medical camp providing emergency healthcare services. Seeking volunteers with medical training, first aid certification, and crisis management experience.",
      roles: [
        {
          role_name: "Medical Coordinator",
          skills: ["Emergency Response", "First Aid Certification", "Crisis Management"],
          description: "Lead the medical team and coordinate emergency response activities",
          maxVolunteers: 2
        },
        {
          role_name: "Health Educator",
          skills: ["Health Education", "Public Health", "Community Health"],
          description: "Conduct health awareness sessions and manage preventive care programs",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Special Education Workshop",
      description: "Educational workshop series focusing on special needs children. Looking for volunteers with special education background and teaching experience.",
      roles: [
        {
          role_name: "Education Lead",
          skills: ["Special Education", "Curriculum Development", "Workshop Facilitation"],
          description: "Lead workshop sessions and develop educational materials",
          maxVolunteers: 2
        },
        {
          role_name: "Child Development Specialist",
          skills: ["Early Childhood Education", "Child Psychology", "Activity Planning"],
          description: "Support special needs children and assist with individualized learning",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Environmental Conservation Drive",
      description: "Community-based environmental conservation project. Need volunteers with environmental science background and project management skills.",
      roles: [
        {
          role_name: "Conservation Lead",
          skills: ["Environmental Science", "Conservation Planning", "Project Management"],
          description: "Coordinate conservation activities and manage volunteer teams",
          maxVolunteers: 2
        },
        {
          role_name: "Environmental Educator",
          skills: ["Environmental Education", "Public Speaking", "Community Engagement"],
          description: "Conduct awareness sessions and lead educational activities",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Youth Mental Health Workshop",
      description: "Mental health awareness and support workshop for youth. Seeking volunteers with counseling and therapy experience.",
      roles: [
        {
          role_name: "Mental Health Counselor",
          skills: ["Mental Health Counseling", "Crisis Intervention", "Group Therapy"],
          description: "Provide counseling services and lead support groups",
          maxVolunteers: 2
        },
        {
          role_name: "Art Therapist",
          skills: ["Art Therapy", "Creative Workshop", "Group Facilitation"],
          description: "Conduct art therapy sessions and creative workshops",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Digital Literacy Program",
      description: "Technology education program for underserved communities. Need volunteers with IT and teaching experience.",
      roles: [
        {
          role_name: "Tech Trainer",
          skills: ["Digital Literacy", "Computer Training", "Technology Education"],
          description: "Lead computer training sessions and digital skills workshops",
          maxVolunteers: 2
        },
        {
          role_name: "Digital Content Creator",
          skills: ["Digital Marketing", "Content Creation", "Social Media Strategy"],
          description: "Create educational content and manage online resources",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Community Sports Day",
      description: "Sports and fitness event for youth development. Looking for volunteers with sports coaching and event management experience.",
      roles: [
        {
          role_name: "Sports Coordinator",
          skills: ["Sports Management", "Event Planning", "Team Coordination"],
          description: "Coordinate sports activities and manage event logistics",
          maxVolunteers: 2
        },
        {
          role_name: "Youth Coach",
          skills: ["Sports Coaching", "Physical Education", "Team Building"],
          description: "Lead sports training sessions and team activities",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Career Development Workshop",
      description: "Career guidance and mentoring program for young professionals. Seeking volunteers with mentoring and leadership development experience.",
      roles: [
        {
          role_name: "Career Mentor",
          skills: ["Career Counseling", "Leadership Development", "Mentoring"],
          description: "Provide career guidance and mentoring support",
          maxVolunteers: 2
        },
        {
          role_name: "Workshop Facilitator",
          skills: ["Workshop Facilitation", "Program Management", "Youth Mentoring"],
          description: "Lead career development workshops and training sessions",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Public Health Campaign",
      description: "Community health awareness campaign. Need volunteers with public health and education experience.",
      roles: [
        {
          role_name: "Health Program Coordinator",
          skills: ["Public Health", "Program Management", "Health Education"],
          description: "Coordinate health campaign activities and manage volunteer teams",
          maxVolunteers: 2
        },
        {
          role_name: "Community Health Educator",
          skills: ["Health Education", "Community Health", "Public Speaking"],
          description: "Conduct health awareness sessions in the community",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Early Childhood Development Program",
      description: "Educational program for early childhood development. Seeking volunteers with child psychology and education experience.",
      roles: [
        {
          role_name: "Early Education Specialist",
          skills: ["Early Childhood Education", "Child Psychology", "Activity Planning"],
          description: "Lead early childhood development activities",
          maxVolunteers: 2
        },
        {
          role_name: "Parent Education Coordinator",
          skills: ["Parent Education", "Workshop Facilitation", "Child Development"],
          description: "Conduct parent education workshops and support sessions",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Financial Literacy Workshop",
      description: "Community workshop on financial education and planning. Need volunteers with financial education and mentoring experience.",
      roles: [
        {
          role_name: "Financial Education Lead",
          skills: ["Financial Education", "Workshop Facilitation", "Program Management"],
          description: "Lead financial literacy workshops and program activities",
          maxVolunteers: 2
        },
        {
          role_name: "Business Planning Mentor",
          skills: ["Business Planning", "Mentoring", "Financial Literacy"],
          description: "Provide mentoring support for business planning",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Youth Sports Training Camp",
      description: "Multi-sport training camp for youth development. Seeking volunteers with sports coaching and physical education experience.",
      roles: [
        {
          role_name: "Sports Program Director",
          skills: ["Sports Management", "Program Management", "Team Coordination"],
          description: "Oversee sports training programs and coordinate activities",
          maxVolunteers: 2
        },
        {
          role_name: "Physical Education Trainer",
          skills: ["Physical Education", "Sports Coaching", "Team Building"],
          description: "Conduct sports training sessions and fitness activities",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Digital Marketing Workshop",
      description: "Workshop series on digital marketing for social impact. Need volunteers with digital marketing and content creation experience.",
      roles: [
        {
          role_name: "Digital Strategy Lead",
          skills: ["Digital Marketing", "Social Media Strategy", "Program Management"],
          description: "Lead digital marketing workshops and strategy sessions",
          maxVolunteers: 2
        },
        {
          role_name: "Content Creation Specialist",
          skills: ["Content Creation", "Online Engagement", "Workshop Facilitation"],
          description: "Develop content and lead hands-on workshops",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Environmental Education Series",
      description: "Educational series on environmental conservation and sustainability. Seeking volunteers with environmental education experience.",
      roles: [
        {
          role_name: "Environmental Program Lead",
          skills: ["Environmental Education", "Program Management", "Conservation"],
          description: "Coordinate environmental education programs",
          maxVolunteers: 2
        },
        {
          role_name: "Sustainability Educator",
          skills: ["Environmental Science", "Public Speaking", "Workshop Facilitation"],
          description: "Conduct sustainability workshops and educational sessions",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Community Health Fair",
      description: "Health awareness and screening fair. Need volunteers with healthcare and public health experience.",
      roles: [
        {
          role_name: "Health Services Coordinator",
          skills: ["Public Health", "Healthcare Services", "Event Planning"],
          description: "Coordinate health services and manage event operations",
          maxVolunteers: 2
        },
        {
          role_name: "Health Screening Specialist",
          skills: ["First Aid Certification", "Health Education", "Community Health"],
          description: "Conduct health screenings and provide health education",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Youth Leadership Summit",
      description: "Leadership development program for young community leaders. Seeking volunteers with leadership training experience.",
      roles: [
        {
          role_name: "Leadership Program Director",
          skills: ["Leadership Development", "Program Management", "Youth Mentoring"],
          description: "Lead leadership training programs and workshops",
          maxVolunteers: 2
        },
        {
          role_name: "Youth Development Facilitator",
          skills: ["Workshop Facilitation", "Team Building", "Career Counseling"],
          description: "Facilitate leadership workshops and mentoring sessions",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Creative Arts Therapy Workshop",
      description: "Art therapy sessions for mental health and wellness. Need volunteers with art therapy and counseling experience.",
      roles: [
        {
          role_name: "Art Therapy Coordinator",
          skills: ["Art Therapy", "Mental Health Counseling", "Program Management"],
          description: "Coordinate art therapy programs and sessions",
          maxVolunteers: 2
        },
        {
          role_name: "Creative Workshop Leader",
          skills: ["Creative Workshop", "Group Facilitation", "Counseling"],
          description: "Lead creative workshops and therapeutic activities",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Tech Skills Bootcamp",
      description: "Intensive technology training program for digital skills development. Seeking volunteers with IT and training experience.",
      roles: [
        {
          role_name: "Tech Program Manager",
          skills: ["Digital Literacy", "Program Management", "IT Support"],
          description: "Manage technology training programs and curriculum",
          maxVolunteers: 2
        },
        {
          role_name: "Technology Instructor",
          skills: ["Computer Training", "Technology Education", "Workshop Facilitation"],
          description: "Conduct technical training sessions and workshops",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Community Infrastructure Project",
      description: "Infrastructure development and safety project. Need volunteers with project management and construction experience.",
      roles: [
        {
          role_name: "Project Management Lead",
          skills: ["Project Management", "Construction Safety", "Team Leadership"],
          description: "Oversee project implementation and team coordination",
          maxVolunteers: 2
        },
        {
          role_name: "Site Safety Coordinator",
          skills: ["Construction Safety", "Site Coordination", "Team Building"],
          description: "Manage site safety and coordinate volunteer teams",
          maxVolunteers: 3
        }
      ]
    },
    {
      title: "Mental Health Support Group",
      description: "Support group sessions for mental health and wellness. Seeking volunteers with counseling and group therapy experience.",
      roles: [
        {
          role_name: "Mental Health Program Lead",
          skills: ["Mental Health Counseling", "Group Therapy", "Program Management"],
          description: "Coordinate mental health programs and support groups",
          maxVolunteers: 2
        },
        {
          role_name: "Support Group Facilitator",
          skills: ["Crisis Intervention", "Group Facilitation", "Psychological First Aid"],
          description: "Facilitate support group sessions and provide counseling",
          maxVolunteers: 3
        }
      ]
    }
  ];

  const events = await Promise.all(
    eventTypes.map((eventType, index) => {
      const startTime = new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000);
      const endTime = new Date(startTime.getTime() + 4 * 60 * 60 * 1000);
      const status = index < 8 ? "UPCOMING" : index < 15 ? "ONGOING" : "COMPLETED";

      return prisma.event.create({
        data: {
          adminId: admin.id,
          title: eventType.title,
          description: eventType.description,
          startTime,
          endTime,
          location: "Community Center, Model Town, Lahore",
          status,
          isPass: status === "COMPLETED",
          role: {
            create: eventType.roles.map(role => ({
              ...role,
              volunteers: {
                connect: [
                  { id: volunteers[Math.floor(Math.random() * volunteers.length)].id }
                ]
              }
            }))
          }
        }
      });
    })
  );

  console.log(`✅ Created ${events.length} events with specific roles`);

  // Create Notifications
  const notifications = await Promise.all([
    prisma.notification.create({
      data: {
        title: "ML Matching System Update",
        message: "The volunteer matching system has been updated with improved skill matching algorithms.",
        status: "Unread"
      }
    }),
    prisma.notification.create({
      data: {
        userId: admin.id,
        title: "New Volunteer Matches",
        message: "New potential volunteer matches found for upcoming events based on skill analysis.",
        status: "Unread"
      }
    }),
    ...volunteers.map((volunteer) =>
      prisma.notification.create({
        data: {
          userId: volunteer.id,
          title: "Skill Match Found",
          message: `Your skills match with an upcoming event. Check your dashboard for details.`,
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
