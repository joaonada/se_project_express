router.get("/", getAllItems);
router.post("/", createItem);
router.delete("/:id", deleteItems);
router.put("/:id/likes", putItemLike);
router.delete("/:id/likes", deleteItemLike);
