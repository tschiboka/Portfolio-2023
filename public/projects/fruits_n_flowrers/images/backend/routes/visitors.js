const express = require("express");
const router = express.Router();
const Visitor = require("../models/visitor");




router.get("/api/visitors", async (req, res) => {
    try {
        const visitors = await Visitor.find();
        if (!visitors.length) return res.send({ "total": 0, "unique": 0 });

        res.send({ "total": visitors.map(v => v.visitNum).reduce((acc, curr) => acc + curr), "unique": visitors.length });
    } catch (err) { res.status(500).send(`Error while getting visitors... ${err}`); }
});



router.post("/api/visitors", async (req, res) => {
    try {
        const IP = req.connection.remoteAddress || "";

        let visitor = await Visitor.findOne({ ip: IP });
        if (!visitor) return res.send(await new Visitor({ ip: IP }).save());

        await visitor.update({ $inc: { visitNum: 1 } });
        res.send(visitor);
    } catch (err) { res.staus(500).send(`Error while posting new visitor... ${err}`); }
});



module.exports = router;
