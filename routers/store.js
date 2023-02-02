const express = require("express");

const { retrieveCollections } = require("../controllers/store.js");

const router = express.Router();

router.route("/collections").get(retrieveCollections);


module.exports = router;
