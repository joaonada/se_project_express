const router = require("express").Router();
const { getCurrentUser, updateCurrentUser } = require("../controllers/users");

router.get("/", getCurrentUser);
router.patch("/", updateCurrentUser);

module.exports = router;