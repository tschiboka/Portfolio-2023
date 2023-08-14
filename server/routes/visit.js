const express = require("express");
const router = express.Router();
const { Visit, validateVisit } = require("../models/visit");



router.get("/", async (req, res) => {  // Home Page Visits
    const visits = await Visit.find({ path: "/" });
    res.status(200).json({success: true, visits:visits.length});
});

router.get("/:path", async (req, res) => { // Subpage Visits
    const visits = await Visit.find({ path: req.params.path });
    res.json({ success: true, visits: visits.length });
})

router.post("/", async (req, res) => {
    console.log(req.body)
    if (!req.body) return res.status(400).json({ success: false, error: "Bad Content"} );
    
    const { error } = validateVisit(req.body);
    if (error) return res.status(422).json({ success: false, error: error.details[0].message });
    const visit = new Visit(req.body);  

    await visit.save();
    res.status(200).json({ success: true, visit });
});

module.exports = router;