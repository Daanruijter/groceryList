const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({
  product: String,
  amount: String,
  information: String

});

module.exports = mongoose.model("grocerydata", grocerySchema);
