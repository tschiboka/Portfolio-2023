const { validateLevel } = require("../validation/level");
const { levelPersistance } = require("../../../infrastructure/persistence/db/level");

async function handleListLevels(_, res) {
    const levels = await levelPersistance.findAllLevels();
    if (!levels) 
        return res.status(500).json({ message: "Error retrieving levels from DB" });
    const result = levels.map(level => ({
        name: level.name,
        displayName: level.targetWords[level.targetWords.length - 1] || level.name,
        difficulty: level.difficulty,
    }));
    
    if (result.length === 0) 
        return res.status(404).json({ message: "No levels found in DB" });
    
    res.status(200).json({ levels: result });
}

async function handleGetLevel(req, res) {
    const { name } = req.params;
    const level = await levelPersistance.findLevelByName(name);

    if (!level) return res.status(404).json({ message: "Level not found in DB" });
    res.status(200).json(level);
}

async function handleUpsertLevel(req, res) {
    const level = req.body;
    const { error } = validateLevel(level);
    
    if (error) return res.status(400).json({ message: error.details[0].message });
    const updatedLevel = await levelPersistance.upsertLevel(level);
    res.status(200).json({ data: { message: "OK", level: updatedLevel } });
}

module.exports = {
    handleListLevels,
    handleGetLevel,
    handleUpsertLevel,
};
