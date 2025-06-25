const tf = require("@tensorflow/tfjs");
const use = require("@tensorflow-models/universal-sentence-encoder");

function cleanText(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9 ]+/g, " ")
    .trim();
}

function skillOverlapScore(roleSkills, userSkills) {
  if (
    !Array.isArray(roleSkills) ||
    !Array.isArray(userSkills) ||
    roleSkills.length === 0
  )
    return 0;
  const roleSet = new Set(roleSkills.map((s) => s.toLowerCase()));
  const userSet = new Set(userSkills.map((s) => s.toLowerCase()));
  let matched = 0;
  for (const skill of roleSet) {
    if (userSet.has(skill)) matched++;
  }
  return matched / roleSet.size;
}

function cosineSimilarity(emb1, emb2) {
  const v1 = emb1.squeeze();
  const v2 = emb2.squeeze();

  const dot = v1.dot(v2);
  const normA = v1.norm();
  const normB = v2.norm();

  return dot.div(normA.mul(normB));
}

async function matchRoleToUsers(role, users) {
  if (!role || !users || !Array.isArray(users)) {
    throw new Error("Invalid input: role and users array are required.");
  }

  const model = await use.load();

  const roleDesc = cleanText(role.description || "");
  const roleSkillsText = (role.skills || []).map((s) => cleanText(s)).join(" ");
  const roleText = `${roleDesc} ${roleSkillsText}`.trim();

  const roleEmbedding = await model.embed([roleText]);

  const userTexts = users.map((user) => {
    const desc = cleanText(user.description || "");
    const skillsText = (user.skills || []).map((s) => cleanText(s)).join(" ");
    const interestsText = (user.interests || [])
      .map((s) => cleanText(s))
      .join(" ");
    return `${desc} ${skillsText} ${interestsText}`.trim();
  });

  const userEmbeddings = await model.embed(userTexts);

  const results = [];

  for (let i = 0; i < users.length; i++) {
    try {
      const simTensor = cosineSimilarity(
        roleEmbedding.slice([0, 0], [1, -1]),
        userEmbeddings.slice([i, 0], [1, -1])
      );
      const simScore = (await simTensor.data())[0];
      const skillScore = skillOverlapScore(
        role.skills || [],
        users[i].skills || []
      );
      const finalScore = 0.7 * simScore + 0.3 * skillScore;
      results.push({
        userId: users[i].id,
        name: users[i].name,
        score: parseFloat(finalScore.toFixed(4)),
      });
    } catch (err) {
      console.error(`Error processing user ${users[i].id}:`, err.message);
    }
  }

  results.sort((a, b) => b.score - a.score);

  return results;
}

// Example usage:
(async () => {
  // const role = {
  //   id: "role1",
  //   role_name: "carpenter",
  //   skills: ["wood-worker"],
  //   description:
  //     "We need a skilled carpenter to help with community housing projects.",
  // };

  // const users = [
  //   {
  //     id: 59,
  //     name: "Muhammad Rehman",
  //     skills: ["Construction", "carpinter", "Team Leadership"],
  //     interests: ["Community Development", "Infrastructure", "Housing"],
  //     description: "Civil engineer helping with community development projects",
  //   },
  //   {
  //     id: 54,
  //     name: "Aisha Malik",
  //     skills: ["Teaching", "Translation", "Social Media"],
  //     interests: ["Education", "Women Empowerment", "Digital Literacy"],
  //     description: "Teacher dedicated to educational outreach programs",
  //   },
  //   {
  //     id: 61,
  //     name: "Sara Khan",
  //     skills: ["Graphic Design", "UI/UX", "Creativity"],
  //     interests: ["Art", "Technology", "Startups"],
  //     description:
  //       "Passionate graphic designer focused on user-centered experiences",
  //   },
  //   {
  //     id: 62,
  //     name: "Ali Zafar",
  //     skills: ["Software Development", "JavaScript", "Node.js"],
  //     interests: ["Programming", "Open Source", "Gaming"],
  //     description:
  //       "Full-stack developer with a love for building scalable web apps",
  //   },
  //   {
  //     id: 63,
  //     name: "Fatima Noor",
  //     skills: ["Healthcare", "Patient Care", "Medical Research"],
  //     interests: ["Health Awareness", "Community Service", "Nutrition"],
  //     description:
  //       "Healthcare professional committed to improving patient outcomes",
  //   },
  //   {
  //     id: 64,
  //     name: "Ahmed Raza",
  //     skills: ["Data Analysis", "Python", "Machine Learning"],
  //     interests: ["AI", "Big Data", "Research"],
  //     description:
  //       "Data analyst exploring machine learning applications in finance",
  //   },
  //   {
  //     id: 65,
  //     name: "Hina Malik",
  //     skills: ["Event Management", "Leadership", "Communication"],
  //     interests: ["Social Events", "Networking", "Marketing"],
  //     description:
  //       "Experienced event coordinator organizing community and corporate events",
  //   },
  //   {
  //     id: 66,
  //     name: "Usman Sheikh",
  //     skills: ["Education", "Mentoring", "Public Speaking"],
  //     interests: ["Teaching", "Youth Empowerment", "Motivation"],
  //     description:
  //       "Dedicated educator inspiring youth through mentoring and coaching",
  //   },
  //   {
  //     id: 67,
  //     name: "Zainab Ali",
  //     skills: ["Digital Marketing", "Content Creation", "SEO"],
  //     interests: ["Social Media", "Branding", "Entrepreneurship"],
  //     description:
  //       "Digital marketer helping brands grow through creative content",
  //   },
  //   {
  //     id: 68,
  //     name: "Omar Farooq",
  //     skills: ["Photography", "Videography", "Editing"],
  //     interests: ["Travel", "Arts", "Documentaries"],
  //     description:
  //       "Visual storyteller capturing compelling narratives through the lens",
  //   },
  //   {
  //     id: 69,
  //     name: "Layla Hassan",
  //     skills: ["Teaching", "Curriculum Development", "Child Psychology"],
  //     interests: ["Education", "Child Development", "Special Needs"],
  //     description:
  //       "Educator specializing in child psychology and curriculum design",
  //   },
  // ];

  try {
    const matches = await matchRoleToUsers(role, users);
    console.log("Top matches:", matches);
  } catch (e) {
    console.error("Matching error:", e.message);
  }
})();
