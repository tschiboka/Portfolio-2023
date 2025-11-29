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
const category = require("../routes/category")
const xmas2025 = require("../projects/xmas_2025/routes")
const session = require("../routes/session")

module.exports = function(app) {
    // Profile website routes
    app.use("/", index);
    app.use("/message", message);
    app.use("/visit", visit);
    app.use("/like", like);
    app.use('/api/session', session)
    app.use("/schedule", schedule);

    // API routes
    app.use("/api/settings", settings);
    app.use("/api/user", user);
    app.use("/api/login", login);
    app.use("/api/confirm", confirm);
    app.use("/api/log", log)
    app.use("/api/categories", category)

    // Project routes
    app.use("/projects/xmas_2025", xmas2025)
}
