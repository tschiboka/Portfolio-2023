const express = require("express");
const router = express.Router();
const auth = require("../../../../../middlewares/auth");
const { handleGetWordList, handleGetAnagramMap, handleGetFrequencies } = require("../handlers/word");

router.get("/list", [auth], handleGetWordList);
router.get("/anagrams", [auth], handleGetAnagramMap);
router.get("/frequencies", [auth], handleGetFrequencies);

module.exports = router;
