const { validateLevel } = require("../validation/level");
const { findAllLevels, findLevelByName, upsertLevel } = require("../../../infrastructure/persistence/level");

async function handleListLevels(req, res) {
    const levels = await findAllLevels();
    const result = levels.map(level => ({
        name: level.targetWords[level.targetWords.length - 1],
        difficulty: level.difficulty
    }));
    res.status(200).json({ levels: result });
}

async function handleGetLevel(req, res) {
    const { name } = req.params;
    const level = await findLevelByName(name);
    if (!level) return res.status(404).json({ error: "Level not found in DB" });
    res.status(200).json(level);
}

async function handleUpsertLevel(req, res) {
    const level = req.body;

    const { error } = validateLevel(level);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const updatedLevel = await upsertLevel(level);

    res.status(200).json({ data: { message: "OK", level: updatedLevel } });
}

module.exports = {
    handleListLevels,
    handleGetLevel,
    handleUpsertLevel,
};
