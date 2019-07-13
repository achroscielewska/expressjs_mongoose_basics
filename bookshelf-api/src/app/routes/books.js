const express = require("express");
const router = express.Router();
const Book = require("../models/book");

// add new book
router.post("/newBook", (req, res, next) => {
  const book = new Book({
    title: req.body.title,
    description: req.body.description,
    bookshelfNo: req.body.bookshelfNo
  });
  book.save().then(result => {
    res.status(201).json({ message: "Book added", bookId: result._id });
  });
});

// get all books
router.get("", (req, res, next) => {
  Book.find().then(books => {
    res.status(200).json({
      message: "Books send",
      books: books
    });
  });
});

router.delete("/:id", (req, res, next) => {
  Book.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({ message: "Book deleted!" });
  });
});

module.exports = router;
