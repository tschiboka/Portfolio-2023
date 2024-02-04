const { Like } = require("../models/like");
const { Visit } = require("../models/visit");
const nodemailer = require("nodemailer");

async function dailyEmail() {
    const todaysDate = new Date(getDateString());                // Get "YYYY-MM-DD" Date Format
    
    // Get Visit Statistics
    const totalVisits = await Visit.find();                      // Get Every Visit
    const todayVisits = await Visit.find({                       // Get Visits with Date
        visitDate: {
            $gte: new Date(todaysDate.setHours(0, 0, 0, 0)),     // Start of the day: YYYY-MM-DD 00:00:00:0000
            $lt: new Date(todaysDate.setHours(23, 59, 59, 999)), // End of the day:   YYYY-MM-DD 23:59:59:0000
        }});

    // Get Like Statistics
    const totalLikes = await Like.find();                        // Get Every Like
    const todayLikes = await Like.find({                         // Get Likes with Date
        likeDate: {
            $gte: new Date(todaysDate.setHours(0, 0, 0, 0)),     // Start of the day: YYYY-MM-DD 00:00:00:0000
            $lt: new Date(todaysDate.setHours(23, 59, 59, 999)), // End of the day:   YYYY-MM-DD 23:59:59:0000
        }});

    // Breakdown
    const breakdown = {
        visits: {
            today: getPathBreakdown(todayVisits),
            total: getPathBreakdown(totalVisits),
            totalCount: totalVisits.length,
            todayCount: todayVisits.length,
        },
        likes: {
            today: getPathBreakdown(todayLikes),
            total: getPathBreakdown(totalLikes),
            totalCount: totalLikes.length,
            todayCount: todayLikes.length,
        }
    }

    const message = createMessage(breakdown);
    console.log("Call SendEmail");
    try {
        await sendEmail(message);
        console.log("Email Successfully Sent");
        return { success: true };
    }
    catch {
        console.log("Error in Send Mail", err);
        return { success: false, error: err };
    }
}

const getDateString = () => {
    const date = new Date();                                     
    const year = date.getFullYear();                             // YYYY
    const month = date.getMonth() + 1;                           // M | MM
    const day = date.getDate();                                  // D | DD
    const zeroPad = num => num < 10 ? "0" + num : num;           // Pad 9 to 09
    return `${year}-${zeroPad(month)}-${zeroPad(day)}`;          // "YYYY-MM-DD"
}

// Function returns [ {path: string, visits: number}, ... ]
const getPathBreakdown = (records) => {                          // Keyword: "visits" | "likes"   
    if (!records) throw Error("Parameter missing");
    
    const breakdown = [];                                        // [ {path: string, count: 0}, ... ]
    let paths = [];                                              // Create Path Counter ["/", "/blog"]
    records.forEach(record => {                                  // Iterate Records
        if (!record.path) return;                                // Only Objects with Path
        const path = record.path;                             
        if (paths.indexOf(path) === -1) {                        // If path Exists
            paths.push(path)                                     // Append Path
            breakdown.push({ path, count: 0 });                  // Append Breakdown with Default
        }}
    );

    records.forEach(record => {                                  // Fill Up Visit Breakdown
        breakdown.forEach(breakdownItem => {                     // Iterate Breakdown Array
            if(breakdownItem.path === record.path)               // Find if Path Exists on BreakDown
                breakdownItem.count++;                           // Increment Counter
        });
    });               
    return breakdown.sort((a, b) => b.count - a.count);
}

const createMessage = (breakdown) => {
    const visitBreakdown = !breakdown.visits.today.length ? "" : `${breakdown.visits.today
        .map(visit => visit.path + " " + 
                      visit.count + " of " + 
                      (breakdown.visits.total
                        .find(visitTot => visitTot.path === visit.path)|| {count: 0}).count)
                        .join("<br />")}`

    const likeBreakdown = !breakdown.likes.today.length ? "" : `${breakdown.likes.today
        .map(like => like.path + " " + 
                      like.count + " of " + 
                      (breakdown.likes.total
                        .find(likeTot => likeTot.path === like.path)|| {count: 0}).count)
                        .join("<br />")}`;

    const message = `
        <h2>VISITS</h2>
        <p>
            Today Visit Count: ${breakdown.visits?.todayCount}
            Total Visit Count: ${breakdown.visits?.totalCount}
        </p>
        <span>${visitBreakdown}</span>
                        
        <h2>LIKES</h2>
        <p>
            Today Like Count: ${breakdown.likes?.todayCount}
            Total Like Count: ${breakdown.likes?.totalCount}
        </p>
        <span>${likeBreakdown}</span>
    `;
    return message;
}

const sendEmail = async (message) => {
    const fromEmailAddress = "tibi.aki.tivadar@gmail.com";
    const toEmailAddress = "dev@tschiboka.co.uk";
    const emailPassword = process.env.EMAIL_PASSWORD;
    
    const mailOptions = {                                          // Email Specifications
        from: fromEmailAddress,                                       
        to: [fromEmailAddress, toEmailAddress],
        subject: 'Breakdown Report | TSCHIBOKA.CO.UK',
        html: message
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
    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (err) {
        return err;
    }
}

module.exports = dailyEmail;