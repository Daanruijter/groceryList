const mongoose = require("mongoose");

const updateIdArraySchema = new mongoose.Schema({
  updateIdsArray:Array

});

module.exports = mongoose.model("updateids", updateIdArraySchema);
