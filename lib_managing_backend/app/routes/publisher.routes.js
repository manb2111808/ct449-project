const express = require("express");
const publishers = require("../controllers/publisher.controllers");

const router = express.Router();

router.route("/")
    .get(publishers.findAll)
    .post(publishers.create);

router.route("/:id")
    .get(publishers.findOne)
    .put(publishers.update)
    .delete(publishers.delete);

// router.route("/:name")
//     .get(publishers.searchByName);

router.route("/search")
    .get(publishers.searchByName);

module.exports = router;