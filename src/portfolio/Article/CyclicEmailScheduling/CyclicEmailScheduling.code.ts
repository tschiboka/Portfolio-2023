const codeSnippets = {
    nodeCron: `const cron = require('node-cron');                // Import NodeCron for Scheduling Tasks
const nodemailer = require('nodemailer');         // Import NodeMailer for Sending Emails

cron.schedule('0 8 * * *', () => {                // Schedule the Email to be Sent Every Day at 8 AM
    sendEmail();                                  // Your Emailer Implementation
});`,
    nodemailerInstall: `npm i nodemailer`,
    sendEmail: `const nodemailer = require("nodemailer");
        
const sendEmail = async (message) => {                             
    const fromEmailAddress = "email_address1@gmail.com";           // The Sender Email Address
    const toEmailAddress = "email_address2@gmail.com";             // The Recipient Email Address
    const emailPassword = process.env.EMAIL_PASSWORD;              // Do NOT Expose Your Email Password

    const mailOptions = {                                          // Email Specifications
        from: fromEmailAddress,                                       
        to: [fromEmailAddress, toEmailAddress],
        subject: 'Breakdown Report | MY AMAZING WEBSITE',          
        html: "<h1>My Message</h1>"                                // You Can Also Opt for Plain Text Using Text Property
    };

    const transporter = nodemailer.createTransport({
        auth: {
            user: fromEmailAddress,
            pass: emailPassword
        },
        secure: true,
        port: 465,                                                 // Use Port 465 for TSL
        tls: { rejectUnauthorized: false },
        host: "smtp.gmail.com",                                    // Specific to Google (You Might Need to Change This Line According to Your Email Server)
    });

    try {
        const info = await transporter.sendMail(mailOptions);      // Await Transporter Response
        console.log("Email Successfully Sent\\n", info);           
        return info;
    } catch (err) {
        console.log("Email Error", err);
        return err;
    }
}

module.exports = dailyEmail;`,
    route: `const express = require("express");
const sendEmail = require("../scheduled/sendEmail");
const route = express.Router();

route.post("/daily-breakdown", async (req, res) => {
    const result = await sendEmail();    // Call the Email Sender
    res.status(200).json(result);
});

module.exports = route;`
};

export default codeSnippets;