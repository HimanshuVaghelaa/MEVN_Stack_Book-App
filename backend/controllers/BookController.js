const Book = require("../models/BookModel");
const { body, validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../helpers/apiResponse");
const auth = require("../middlewares/jwt");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

// Book Schema
function BookData(data) {
  this.id = data._id;
  this.title = data.title;
  this.price = data.price;
  this.image = data.image;
  this.author = data.author;
  this.ratings = data.ratings;
  this.category = data.category;
  this.description = data.description;
}

exports.bookList = [
  auth,
  function (req, res) {
    try {
      Book.find().then((books) => {
        if (books.length > 0) {
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            books
          );
        } else {
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            []
          );
        }
      });
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.bookDetail = [
  auth,
  function (req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return apiResponse.successResponseWithData(res, "Operation success", {});
    }
    try {
      Book.findOne(
        { _id: req.params.id },
        "_id title price image author ratings category description"
      ).then((book) => {
        if (book !== null) {
          let bookData = new BookData(book);
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            bookData
          );
        } else {
          return apiResponse.successResponseWithData(
            res,
            "Operation success",
            {}
          );
        }
      });
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.bookStore = [
  auth,
  body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
  body("price", "Price must not be empty.").isLength({ min: 1 }).trim(),
  body("author", "Author must not be empty.").isLength({ min: 1 }).trim(),
  body("category", "Category must not be empty.").isLength({ min: 1 }).trim(),
  body("description", "Description must not be empty.")
    .isLength({ min: 1 })
    .trim(),

  sanitizeBody("*").escape(),
  (req, res) => {
    try {
      const errors = validationResult(req);
      var book = new Book({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        author: req.body.author,
        ratings: req.body.ratings,
        category: req.body.category,
        description: req.body.description,
      });

      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        //Save book.
        book.save(function (err) {
          if (err) {
            return apiResponse.ErrorResponse(res, err);
          }
          let bookData = new BookData(book);
          return apiResponse.successResponseWithData(
            res,
            "Book add Success.",
            bookData
          );
        });
      }
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.bookUpdate = [
  auth,
  body("title", "Title must not be empty.").isLength({ min: 1 }).trim(),
  body("price", "Price must not be empty.").isLength({ min: 1 }).trim(),
  body("author", "Author must not be empty.").isLength({ min: 1 }).trim(),
  body("category", "Category must not be empty.").isLength({ min: 1 }).trim(),
  body("description", "Description must not be empty.")
    .isLength({ min: 1 })
    .trim(),
  sanitizeBody("*").escape(),
  (req, res) => {
    try {
      const errors = validationResult(req);
      var book = new Book({
        title: req.body.title,
        price: req.body.price,
        image: req.body.image,
        author: req.body.author,
        ratings: req.body.ratings,
        category: req.body.category,
        description: req.body.description,
        _id: req.params.id,
      });

      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          "Validation Error.",
          errors.array()
        );
      } else {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
          return apiResponse.validationErrorWithData(
            res,
            "Invalid Error.",
            "Invalid ID"
          );
        } else {
          Book.findById(req.params.id, function (err, foundBook) {
            if (foundBook === null) {
              return apiResponse.notFoundResponse(
                res,
                "Book not exists with this id"
              );
            } else {
              //update book.
              Book.findByIdAndUpdate(req.params.id, book, {}, function (err) {
                if (err) {
                  return apiResponse.ErrorResponse(res, err);
                } else {
                  let bookData = new BookData(book);
                  return apiResponse.successResponseWithData(
                    res,
                    "Book update Success.",
                    bookData
                  );
                }
              });
            }
          });
        }
      }
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];

exports.bookDelete = [
  auth,
  function (req, res) {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return apiResponse.validationErrorWithData(
        res,
        "Invalid Error.",
        "Invalid ID"
      );
    }
    try {
      Book.findById(req.params.id, function (err, foundBook) {
        if (foundBook === null) {
          return apiResponse.notFoundResponse(
            res,
            "Book not exists with this id"
          );
        } else {
          //delete book.
          Book.findByIdAndRemove(req.params.id, function (err) {
            if (err) {
              return apiResponse.ErrorResponse(res, err);
            } else {
              return apiResponse.successResponse(res, "Book delete Success.");
            }
          });
        }
      });
    } catch (err) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, err);
    }
  },
];
