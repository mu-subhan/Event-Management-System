const express = require("express");
const router = express.Router();
const RoleSuggestionController = require("../controller/roleSuggestion");
router.get("/:roleId", RoleSuggestionController.suggestUsers);
module.exports = router;
