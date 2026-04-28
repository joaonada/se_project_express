const router = require("express").Router();
const userRouter = require("./users");
const itemsRouter = require("./items");
const { HTTP_STATUS } = require("../utils/constants");
const auth = require("../middlewares/auth");
const { register, login } = require("../controllers/users");

router.post("/signup", register);
router.post("/signin", login);
router.use("/users", auth, userRouter);
router.use("/items", itemsRouter);
router.use((req, res) => {
   res
    .status(HTTP_STATUS.NOT_FOUND)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
