
require("dotenv").config(); //env is basically runtime environment it works only during when we run 

const { json } = require("express");
const express = require("express");  //importing require express --this is a default operation which need to be done
var bodyParser = require("body-parser");
const mongoose = require("mongoose");

//Database
const database = require("./database");  //this operation for importing database

//importing model
const BookModel = require("./book");
const AuthorModel = require("./author");
const PublicationModel = require("./publication");

//Initialize express
const booky = express();  //booky is expression name here, created an instance which is express();

booky.use(bodyParser.urlencoded({extended: true}));
booky.use(bodyParser.json());
//establishing connection with the database
mongoose.connect(
process.env.Mongo_Url
).then(() => console.log("connection established"));  


//GET ALL BOOKS               
/*
Route           /
Description     Get all books
Access          Public
Parameter       NONE
Methods         GET
*/

booky.get("/", async (req,res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);  //here we reponding callback function in jason format where we accessing all the books from database.
});  //no require to put getAllBooks in curly braces cuz mongoose takes care of everything

// booky.get("/", (req,res) => {
//   return res.json({book: database.books});  //here we reponding callback function in jason format where we accessing all the books from database.
// });
  
  //GET A SPECIFIC BOOK localhost:3000/12345Book
  /*
  Route           /is
  Description     Get specific book
  Access          Public
  Parameter       isbn 
  Methods         GET
  */
  booky.get("/is/:isbn", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});

    // const getSpecificBook = database.books.filter(
    //   (book) => book.ISBN === req.params.isbn    //it tells that if your isbn in parameter equal to isbn of specific book in database then only it will respond.
    // );
  
    if(!getSpecificBook) {
      return res.json({
        error: `No book found for ISBN of ${req.params.isbn}`
      });
    }

    // if(getSpecificBook.length === 0) {
    //   return res.json({
    //     error: `No book found for ISBN of ${req.params.isbn}`
    //   });
    // }
  
    return res.json({book: getSpecificBook});
  
  });

  //GET BOOKS on a specific category
/*
Route           /c
Description     Get specific book
Access          Public
Parameter       category
Methods         GET
*/

booky.get("/c/:category", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({category: req.params.category});
  // if no specific book category returned then find one function returns null, and to execute the //NOTE:
  // found prperty we have to make the cond inside if true so  !null is true, 
  
  if(!getSpecificBook) {
    return res.json({
      error: `No book found for category of ${req.params.category}`
    });
  }
  
  return res.json({book: getSpecificBook});
  
  });


  // const getSpecificBook = database.books.filter((book) =>
  // book.category.includes(req.params.category)
  // );
  
  // if(getSpecificBook.length === 0) {
  //   return res.json({
  //     error: `No book found for category of ${req.params.category}`
  //   });
  // }
  
  // return res.json({book: getSpecificBook});
  
  // });


//GET BOOKS on a specific language
/*
Route           /l
Description     Get specific book
Access          Public
Parameter       language
Methods         GET
*/  

  booky.get("/l/:language", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({language: req.params.language});
    // const getSpecificBook = database.books.filter((book) =>
    // book.language.includes(req.params.language)
    //);

    // if(getSpecificBook.length === 0) {
      if(!getSpecificBook) {
      return res.json({
        error: `no book found for language of this ${req.params.language}`
      });
    }

    return res.json({books: getSpecificBook});


  });


//GET all authors
/*
Route           /authors
Description     Get all authors
Access          Public
Parameter       authors
Methods         GET
*/    

booky.get("/author", async (req, res) => {
  const getAllAuthor = await AuthorModel.find();
  return res.json({getAllAuthor});
});


//GET specific authors
/*
Route           /authors/book
Description     Get specific authors
Access          Public
Parameter       authors
Methods         GET
*/  

booky.get("/authors/book/:isbn", async (req,res) => {
  const getSpecificAuthor = await AuthorModel.findOne({books: req.params.isbn});
if(!getSpecificAuthor){
  return res.json({
    error: `No author found for isbn of ${req.params.isbn}`
  });
}  
  return res.json({authors: getSpecificAuthor});
});


// booky.get("/authors/book/:isbn", (req,res) => {
//   const getSpecificAuthor = database.author.filter((author) =>
//   author.books.includes(req.params.isbn)
//   );
//   if(getSpecificAuthor.length == 0){
//     return res.json({
//       error: `no author found for book of this${req.params.isbn}`
//     });
//   }
//   return res.json({authors: getSpecificAuthor});

// });


booky.get("/publications", async (req,res) => {
  const getAllPublication = await PublicationModel.find();
  return res.json({getAllPublication});

});

booky.get("/publication/:isbn", async (req,res) => {
  const getSpecificPublication = await PublicationModel.findOne({books: req.params.isbn});
  //const getSpecificPublication = database.publication.filter((publication) =>
  
  // publication.books.includes(req.params.isbn)
//);
  if (!getSpecificPublication){
  // if (getSpecificPublication.length == 0){
    return res.json({
      error: `no publication found for this${req.params.isbn}`
    });
  }
  return res.json({publications: getSpecificPublication});

});

//Add new book
/*
Route           /book/new
Description     add new book
Access          Public
Parameter       books
Methods         post
*/  

booky.post("/book/new", async (req,res) => {
  const { newBook } = req.body; //here we destructuring the new book as it written in curly brace cuz it is safe we got lot of object from req body so destructuring will keep you away from the error
  // const newBook = req.body;
  const addNewBook = BookModel.create(newBook);
  // database.books.push(newBook);
  return res.json({books: addNewBook, message: "book added successfully"});
}
);

//Add new author
/*
Route           /author/new
Description     add new author
Access          Public
Parameter       authors
Methods         post
*/  

booky.post("/author/new", async (req,res) => {
  const {newAuthor} = req.body;
  // const newAuthor = req.body;
 
  // database.author.push(newAuthor);
  const addNewAuthor =  AuthorModel.create(newAuthor);
  return res.json({authors: addNewAuthor, message: "author has been added"});
  // return res.json({updatedAuthor: database.author});
}
);

//Add new publication
/*
Route           /publication/new
Description     add new publication
Access          Public
Parameter       publication
Methods         post
*/  

booky.post("/publication/new", async (req,res)=> {
  //const newPublication = req.body;
  const {newPublication} = req.body;
  const addNewPublication = PublicationModel.create(newPublication); 
  
  //database.publication.push(newPublication);
  return res.json({publications: addNewPublication, message:"publication added successful"});
});


//Update publication and books
// Route           /publication/update/book
// Description     update publication and book
// Access          Public
// Parameter       ISBN
// Methods         put

booky.put("/book/update/:isbn", async (req,res)=> {
  const updateBook = await BookModel.findOneAndUpdate(
  {
    ISBN: req.params.isbn
  },
  {
    title: req.body.bookTitle
  },
  {
    new: true
  }
  );
  return res.json({books: database.books});
})





//Update publication and books
/*
Route           /publication/update/book
Description     update publication and book
Access          Public
Parameter       ISBN
Methods         put
*/  


booky.put("/publication/update/book/:isbn", (req,res)=>{
  //update publication
  database.publication.forEach((pub) => {             //this line means we going in publication which is indsie database js and we assigning each publication as pub
    if(pub.id === req.body.pubId) {                  //this line means if (assign pub id = to pubid inside request body in postman)
      return pub.books.push(req.params.isbn);         // here then we pushing isbn inside the books which is inside particular id publication and which is inside the database js
    }
  });



  // update the book DB
  database.books.forEach((book) => {        //this line means we going in books which is indsie database js and we assigning each books as book
    if(book.ISBN == req.params.isbn){       //this line means if (assign book ISBN   = isbn reqested in parameter)
      book.publications = req.body.pubId;   //then go to assign book publications in the database js and update there publication id by requesting the body which resides inside the postman
      return;
    }

  });
  return res.json(
    {
      books: database.books,
      publication: database.publication,
      message: "updation completed"        //this line is just confirmation that the changes or updation u made in your publication and in books which is inside the database have been completed
    }
  )


});

// booky.delete("/book/delete/:isbn", async (req,res)=> {
//   const updateBookDatabase = await BookModel.findOneAndDelete({
//     ISBN: req.params.isbn
//   });
//   return res,json({books: updateBookDatabase});
// });


  
// booky.delete("/book/delete/author:isbn/:authorID", async (req,res)=> {
//   const updateBook = await BookModel.findOneAndUpdate(
//     {
//       ISBN: req.params.isbn
//     },
//     {
//       $pull:{
//         author:parseInt(req.params.authorId)
//       }
//     },
//     {
//       new:true
//     }
//   );
   
// });  

booky.listen(3000,() => console.log("Server is up and running!!!")); //here we are making instance to listen at port 3000 we can put any port no where instance can listen
