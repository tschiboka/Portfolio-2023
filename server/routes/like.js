const express = require("express");
const router = express.Router();
const { Like, validateLike } = require("../models/like");

router.get("/", async (req, res) => {
    const path = req.query.path;

    if (!path) {
        const likes = await Like.find();
        const groupedLikes = {};
        likes.forEach(like => {    
            if (!groupedLikes[like.path]) groupedLikes[like.path] = 1;
            else groupedLikes[like.path] = groupedLikes[like.path] + 1;
        });
        res.status(200).json({ success: true, likes: groupedLikes });
    }
    else {
        const likes = await Like.find({path: path});
        res.status(200).json({ success: true, likes: likes.length });
    }
});



router.post("/", async (req, res) => {
    if (!req.body) return res.status(400).json({ success: false, error: "Bad Content"} );
    
    const { error } = validateLike(req.body);
    if (error) return res.status(422).json({ success: false, error: error.details[0].message });
    const like = new Like(req.body);  

    await like.save();
    res.status(200).json({ success: true, like });
});

module.exports = router;