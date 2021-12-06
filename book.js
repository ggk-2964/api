const mongoose = require("mongoose");
const { publication } = require("./database");
//creting schema ---schema is basically blueprint of database which will be stored
const BookSchema = mongoose.Schema({
      ISBN: String,
      title: String,
      pubDate: String,
      language: String,
      numPage: Number,
      author: [Number],
      publications: Number,
      category: [String]
});
 //creating book model
 const BookModel = mongoose.model("book",BookSchema);

 module.exports = BookModel;

