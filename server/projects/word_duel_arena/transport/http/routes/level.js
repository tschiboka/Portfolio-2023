const express = require("express");
const router = express.Router();
const { handleListLevels, handleGetLevel, handleUpsertLevel } = require("../handlers/level");
const auth = require("../../../../../middlewares/auth");

router.get("/name", handleListLevels);
router.get("/:name", handleGetLevel);
router.post("/", [auth], handleUpsertLevel);

module.exports = router;
