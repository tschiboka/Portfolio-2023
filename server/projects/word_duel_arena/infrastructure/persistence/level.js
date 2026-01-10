const { Level } = require("../../model/level");

async function findAllLevels() {
    return Level.find().sort({ createdAt: -1 });
}

async function findLevelByName(name) {
    return Level.findOne({ name });
}

async function upsertLevel(level) {
    return Level.findOneAndUpdate(
        { name: level.name },
        { ...level, updatedAt: Date.now() },
        { new: true, upsert: true, runValidators: true }
    );
}

module.exports = { findAllLevels, findLevelByName, upsertLevel };
