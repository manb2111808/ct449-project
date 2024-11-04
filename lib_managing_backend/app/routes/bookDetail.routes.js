const express = require("express");
const bookDetails = require("../controllers/bookDetail.controllers");

const router = express.Router();

router.route("/:id")
    .get(bookDetails.findDetail)
    .delete(bookDetails.deleteDetail);

router.route("/borrow/:id")
    .get(bookDetails.borrow)
    .put(bookDetails.return);

router.route("/borrowList")
    .put(bookDetails.findBorrowed);


module.exports = router;