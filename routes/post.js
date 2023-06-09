const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/check-auth");
const postsController = require("../controllers/postsController");

router.get("/all_posts", postsController.getAllPosts);
router.post("/create_post", postsController.createPost);
router.put("/update_post/:_id", postsController.updatePost);
router.get("/get_single_post/:_id", postsController.getSinglePost);
router.delete("/delete_post/:_id", postsController.deletePost);

module.exports = router;