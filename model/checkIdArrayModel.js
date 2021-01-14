const mongoose = require("mongoose");

const checkIdArraySchema = new mongoose.Schema({
  checkIdArray:Array

});

module.exports = mongoose.model("arraywithids", checkIdArraySchema);
