const { Level } = require("../../../model/level");

const levelPersistance = {
    findAllLevels: async () => Level.find().sort({ createdAt: -1 }),
    findLevelByName: async (name) => Level.findOne({ name }),
    upsertLevel: async (level) => Level.findOneAndUpdate(
        { name: level.name },
        { ...level, updatedAt: Date.now() },
        { new: true, upsert: true, runValidators: true }
    ),
    findLevelForSession: async (sessionState) => {
        // TODO: Implement a better level selection logic based on player history
        const levels = await Level.find().lean();
        if (levels.length === 0) return null;

        const randomIndex = Math.floor(Math.random() * levels.length);
        return levels[randomIndex];
    }
}

module.exports = { levelPersistance };
