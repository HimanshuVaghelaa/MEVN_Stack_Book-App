var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BookSchema = new Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: false },
  author: { type: String, required: true },
  ratings: { type: String, required: false },
  category: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("Book", BookSchema);
