var mongoose = require("mongoose");

var listSchema = new mongoose.Schema({
    todos: [String],
    created : {type: Date , default: Date.now}
});

module.exports = mongoose.model("list",listSchema);