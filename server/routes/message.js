const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const { Message, validateMessage } = require("../models/message");


router.post("/", async (req, res) => {
    const { name, email, phone, message } = req.body;
    const { error } = validateMessage(req.body);
    
    if (error) return res.json({
        success: false,
        error: error.message
    });

    // Save a New Message Entry in DB
    const messageEntry = await Message({
        name,
        email,
        phone: phone.length === 0 ? undefined : phone,
        message,
    });

    await messageEntry.save();
    

    // Send Notification Email
    const fromEmailAddress = "tibi.aki.tivadar@gmail.com";
    const toEmailAddress = "tibi.aki.tivadar@gmail.com";
    const emailPassword = process.env.EMAIL_PASSWORD;
    
    const mailOptions = {                                          // Email Specifications
        from: fromEmailAddress,                                       
        to: [fromEmailAddress, toEmailAddress],                                                 // From Request
        subject: 'New Message | TSCHIBOKA.CO.UK',
        html: `
            <h1>You have a new message!</h1>
            <p>
                From: ${ name }
                <br />
                Email: ${ email }
                <br />
                Phone: ${ phone || "N/A"}
                <br />
            </p>
            <h2>Message</h2>
            <p>${ message }</p>
                
            <a href="tschiboka.co.uk">tschiboka.co.uk</a>`
    };

    const transporter = nodemailer.createTransport({
        auth: {
            user: fromEmailAddress,
            pass: emailPassword
        },
        secure: true,
        port: 465,
        tls: { rejectUnauthorized: false },
        host: "smtp.gmail.com",
    });
    
    await transporter.sendMail(mailOptions);
    
    return res.status(200).json({ success: true, message: "Message Sent!" });
});

module.exports = router;