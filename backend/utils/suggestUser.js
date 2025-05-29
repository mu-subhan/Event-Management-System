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
const SuggestUsers = async ({ role, users }) => {
  try {
    const matches = await matchRoleToUsers(role, users);
    return matches;
  } catch (e) {
    console.error("Matching error:", e.message);
    return [];
  }
};
module.exports = { SuggestUsers };
