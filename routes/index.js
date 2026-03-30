const router = require("express").Router();

const userRouter = require("./users");

const itemsRouter = require("./items");

const { HTTP_STATUS } = require("../utils/constants");

router.use("/users", userRouter);
router.use("/items", itemsRouter);
router.use((req, res) => {
   res
    .status(HTTP_STATUS.NOT_FOUND)
    .send({ message: "Requested resource not found" });
});

module.exports = router;
