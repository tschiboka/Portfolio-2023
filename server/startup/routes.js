// Routes
const index = require("../routes/index");
const message = require("../routes/message");
const visit = require("../routes/visit");
const like = require("../routes/like");
const schedule = require("../routes/schedule");
const settings = require("../routes/settings")
const user = require("../routes/user");
const login = require("../routes/login");
const confirm = require("../routes/confirm");
const log = require("../routes/log");

module.exports = function(app) {
    app.use("/", index);
    app.use("/message", message);
    app.use("/visit", visit);
    app.use("/like", like);
    app.use("/schedule", schedule);
    app.use("/api/settings", settings);
    app.use("/api/user", user);
    app.use("/api/login", login);
    app.use("/api/confirm", confirm);
    app.use("/api/log", log)
}
