const express = require("express");
const borrowCards = require("../controllers/borrowCard.controllers");

const router = express.Router();

router.route("/")
    .get(borrowCards.findAll)
    .post(borrowCards.create)
    .delete(borrowCards.deleteAll);

router.route("/:id")
    .get(borrowCards.findOne)
    .delete(borrowCards.delete);

module.exports = router;