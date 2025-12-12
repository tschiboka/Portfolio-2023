const mongoose = require("mongoose");



const visitorSchema = mongoose.Schema({
    ip: { type: String, required: true, unique: true },
    visitNum: { type: Number, default: 0 }
});



const Visitor = new mongoose.model("Visitor", visitorSchema);



module.exports = Visitor;