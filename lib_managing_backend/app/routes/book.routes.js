const express = require("express");
const books = require("../controllers/book.controllers");

const router = express.Router();

router.route("/")
    .get(books.findAll)
    .post(books.create)
    .delete(books.deleteAll);

router.route("/add/:id")
    .get(books.addDetail)


router.route("/available")
    .get(books.findAllAvailable);

// router.route("/count")
//     .get(books.count);

// router.route("/count/:genre")
//     .get(books.countGenre);

router.route("/:id")
    .get(books.findOne)
    .put(books.update)
    .delete(books.delete);

module.exports = router;