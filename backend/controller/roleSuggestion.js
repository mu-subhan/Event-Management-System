const { spawn } = require("child_process");
const path = require("path");
const scriptPath = path.join(__dirname, "../roleSuggestion/suggestUser.py");
const prisma = require("../db/db.server");

class RoleSuggestionController {
  async suggestUsers(req, res) {
    try {
      const { roleId } = req.params;

      // Step 1: Fetch role from DB
      const role = await prisma.EventRole.findUnique({
        where: {
          id: roleId,
        },
      });
      if (!role)
        return res.status(404).json({
          success: false,
          message: "Role not found",
          error: "role Not Found",
        });

      const roleText = `${role.role_name} ${role.skills.join(" ")} ${
        role.description || ""
      }`;

      // Step 2: Pre-filter users by at least one matching skill
      const filteredUsers = await prisma.User.findMany({
        where: {
          skills: {
            hasSome: role.skills, // matches any of the skills
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          contactNumber: true,
          role: true,
          skills: true,
          interests: true,
          experienceYears: true,
          profileImage: true,
          description: true,
          // list all fields you want to include, but **do not** include password
        },
      });

      if (!filteredUsers.length)
        return res.json({ success: true, suggestedUsers: [] }); // No relevant users found

      // Step 3: Format data for Python script
      const payload = {
        role_text: roleText,
        users: filteredUsers.map((user) => ({
          id: user.id,
          skills: user.skills.join(" "),
          interests: user.interests.join(" "),
          description: user.description || "",
        })),
      };
      const python = spawn("python", [scriptPath]);
      let result = "";

      python.stdout.on("data", (data) => {
        result += data.toString();
      });

      python.stderr.on("data", (data) => {
        console.error("Python error:", data.toString());
      });

      python.on("close", () => {
        try {
          if (result) {
            const userScores = JSON.parse(result);
            const MIN_SCORE = 0.15;
            // Step 1: Filter by minimum score
            const filteredByScore = userScores.filter(
              (item) => item.score >= MIN_SCORE
            );

            // Step 2: Sort descending by score (in case input is not sorted)
            filteredByScore.sort((a, b) => b.score - a.score);
            // Step 3: Take top 5 users
            const topUsers = filteredByScore.slice(0, 5);

            const topSuggestedUsersWithScores = topUsers
              .map((topUser) => {
                const matchedUser = filteredUsers.find(
                  (user) => user.id === topUser.userId
                );
                if (matchedUser) {
                  return {
                    ...matchedUser,
                    score: topUser.score,
                  };
                }
                return null; // skip if no match found
              })
              .filter(Boolean); // remove nulls

            return res.json({
              success: true,
              suggestedUsers: topSuggestedUsersWithScores,
            });
          } else {
            throw new Error("Result not Found!");
          }
        } catch (err) {
          console.error(err);
          return res.status(500).json({ error: err.message });
        }
      });

      python.stdin.write(JSON.stringify(payload));
      python.stdin.end();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: error.message || "Internal Serevr Problem",
      });
    }
  }
}

module.exports = new RoleSuggestionController();
