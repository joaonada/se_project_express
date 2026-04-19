const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getAllItems,
  createItem,
  deleteItem,
  putItemLike,
  deleteItemLike,
} = require("../controllers/items");

router.get("/", getAllItems);
router.post("/", auth, createItem);
router.delete("/:id", auth, deleteItem);
router.put("/:id/likes", auth, putItemLike);
router.delete("/:id/likes", auth, deleteItemLike);

module.exports = router;
