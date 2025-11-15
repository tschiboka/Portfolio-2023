const express = require("express");
const router = express.Router()

router.get("/", [], async (_, res) => {
    res.status(200).json({data: { message: "OK" }})
})

module.exports = router;
