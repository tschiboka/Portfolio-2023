const express = require("express");
const router = express.Router()
const auth = require("../../middlewares/auth");
const { validateMessage, XmasMessage, validateCandle, XmasCandle } = require("./models");
const { User } = require("../../models/user");
const { tail } = require("ramda");

router.get("/", [], async (_, res) => {
    res.status(200).json({data: { message: "OK" }})
})

router.get("/device", [], async (_, res) => {
    res.status(200).send("<<<OK>>>")
})


router.post("/message", [auth], async (req, res) => {
    const { error } = validateMessage(req.body)
    if (error) return res.status(400).json({ success: false, message: error.details[0].message, error })
    
    const xmasMessage = new XmasMessage(req.body)
    await xmasMessage.save()
    
    res.status(200).json({ success: true, message: "Message sent successfully" })
})

router.get("/message", [auth], async (req, res) => {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ success: false, message: "User ID is required" })

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" })
        
    if (user.isAdmin) {
        const messages = await XmasMessage.find().sort({ createdAt: -1 });
        return res.status(200).json({ success: true, data: messages })
    }

    const messages = await XmasMessage.find({ userId: user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: messages })
})

router.get("/message/device", async (_, res) => {
    const messages = await XmasMessage.find();
    const unreadMessages = messages.filter(({ isRead }) => !isRead);
    
    const lasMessage = tail(unreadMessages);
    const responseMessages = unreadMessages.length ? unreadMessages : lasMessage;
    
    const textResponse = responseMessages.map(msg => `${msg.name}: ${msg.message}`)[0];
    return res.status(200).send(`<<<${textResponse}>>>`)
})

router.get("/candles", [auth], async (_, res) => {
    const candles = await XmasCandle.find();

    if (candles?.length === 0) {
        const newCandle = new XmasCandle({
            candle1: false,
            candle2: false,
            candle3: false,
            candle4: false,
        });
        await newCandle.save();
        return res.status(200).json({ success: true, data: { candles: newCandle } })
    }
    
    res.status(200).json({ success: true, data: { candles: candles[0] } })
})

router.put("/candles", [auth], async (req, res) => {
    const { error } = validateCandle(req.body)
    if (error) return res.status(400).json({ success: false, message: error.details[0].message, error })

    const candles = await XmasCandle.find();  
    if (candles?.length === 0) {
        return res.status(404).json({ success: false, message: "No candles found to update" })
    }

    const firstCandle = candles[0];
    Object.assign(firstCandle, req.body);
    await firstCandle.save();
    
    res.status(200).json({ success: true, data: { candles: firstCandle } })
})



router.get("/candles/device", async (_, res) => {
    const candles = await XmasCandle.find();

    if (candles?.length === 0) {
        return res.status(200).send("<<<0000>>>")
    }

    const firstCandle = candles[0];
    const candleState = [firstCandle.candle1, firstCandle.candle2, firstCandle.candle3, firstCandle.candle4]
        .map(c => c ? '1' : '0')
        .join('');
    return res.status(200).send(`<<<${candleState}>>>`)
})



module.exports = router;
