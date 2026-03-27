const router = require("express").Router();
const {
  getAllItems,
  createItem,
  deleteItem,
  putItemLike,
  deleteItemLike,
} = require("../controllers/items");

console.log({
  getAllItems,
  createItem,
  deleteItem,
  putItemLike,
  deleteItemLike,
});

router.get("/", getAllItems);
router.post("/", createItem);
router.delete("/:id", deleteItem);
router.put("/:id/likes", putItemLike);
router.delete("/:id/likes", deleteItemLike);

module.exports = router;
