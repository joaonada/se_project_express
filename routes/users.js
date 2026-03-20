const router = require("express").Router();
const { getUsers } = require("../controllers");
const { createUser } = require("../controllers");

router.get("/", getUsers, createUser);




module.exports = router;