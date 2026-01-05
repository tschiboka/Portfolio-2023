const { Level } = require("../model/level");

const getLevel = (session) => {
    // For now return only the latest level
    // TODO: implement level selection logic
    const level = Level.findOne().sort({ createdAt: -1 });
    return 'Level 1'
}

module.exports = { getLevel };