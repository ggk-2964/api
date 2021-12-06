const mongoose = require("mongoose");
const { publication } = require("./database");


const AuthorSchema = mongoose.Schema({
      id: Number,
      name: String,
      books: [String]

});

const AuthorModel = mongoose.model("author", AuthorSchema);

module.exports = AuthorModel;