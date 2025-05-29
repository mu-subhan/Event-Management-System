const { spawn } = require("child_process");
const path = require("path");
const scriptPath = path.join(__dirname, "../roleSuggestion/suggestUser.py");
const prisma = require("../db/db.server");
const { SuggestUsers } = require("../utils/suggestUser");

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
      const normalizedRoleSkills = role.skills.map((skill) =>
        skill.toLowerCase()
      );
      // Step 2: Pre-filter users by at least one matching skill
      let filteredUsers = await prisma.User.findMany({
        where: {
          role: "Volunteer",
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
          roles: {
            select: {
              id: true,
              event_id: true,
              role_name: true,
              skills: true, // example field; adjust based on your schema
              description: true,
              volunteers: true,
            },
          }, // list all fields you want to include, but **do not** include password
        },
      });
      filteredUsers = filteredUsers.filter(
        (user) => !user.roles.some((r) => r.event_id === role.event_id)
      );
      // if (filteredUsers.role)
      if (!filteredUsers.length)
        return res.json({ success: true, suggestedUsers: [] }); // No relevant users found
      // Step 3: Format data for Python script
      const normalizeText = (text) =>
        text.toLowerCase().replace(/[^a-z0-9 ]/g, "");

      // const payload = {
      //   role: normalizeText(roleText),
      //   users: filteredUsers.map((user) => ({
      //     id: user.id,
      //     skills: user.skills.join(" "),
      //     interests: user.interests.join(" "),
      //     description: user.description || "",
      //   })),
      // };
      // const payload = {
      //   role: {
      //     skills: role.skills.join(" "), // convert array to string
      //     description: role.description || "", // description string
      //   },
      //   users: filteredUsers.map((user) => ({
      //     id: user.id,
      //     skills: user.skills.join(" "),
      //     interests: user.interests.join(" "),
      //     description: user.description || "",
      //   })),
      // };

      // const python = spawn("python", [scriptPath]);
      // let result = "";

      // python.stdout.on("data", (data) => {
      //   result += data.toString();
      // });

      // python.stderr.on("data", (data) => {
      //   console.error("Python error:", data.toString());
      // });

      // python.on("close", () => {
      //   try {
      //     if (result) {
      //       const userScores = JSON.parse(result);
      //       console.log("userScores: ", userScores);
      //       const MIN_SCORE = 0.12;
      //       // Step 1: Filter by minimum score
      //       const filteredByScore = userScores.filter(
      //         (item) => item.score >= MIN_SCORE
      //       );

      //       // Step 2: Sort descending by score (in case input is not sorted)
      //       filteredByScore.sort((a, b) => b.score - a.score);
      //       // Step 3: Take top 5 users
      //       const topUsers = filteredByScore.slice(0, 5);

      //       const topSuggestedUsersWithScores = topUsers
      //         .map((topUser) => {
      //           const matchedUser = filteredUsers.find(
      //             (user) => user.id === topUser.userId
      //           );
      //           if (matchedUser) {
      //             return {
      //               ...matchedUser,
      //               score: topUser.score,
      //             };
      //           }
      //           return null; // skip if no match found
      //         })
      //         .filter(Boolean); // remove nulls
      //       console.log(
      //         "topSuggestedUsersWithScores: ",
      //         topSuggestedUsersWithScores
      //       );
      //       return res.json({
      //         success: true,
      //         suggestedUsers: topSuggestedUsersWithScores,
      //       });
      //     } else {
      //       throw new Error("Result not Found!");
      //     }
      //   } catch (err) {
      //     console.error(err);
      //     return res.status(500).json({ error: err.message });
      //   }
      // });

      // python.stdin.write(JSON.stringify(payload));
      // python.stdin.end();
      // Top Suggested users
      // const userScores = JSON.parse(result);
      const userScores = await SuggestUsers({
        role,
        users: filteredUsers,
      });
      console.log("userScores: ", userScores);
      const MIN_SCORE = 0.25;
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
