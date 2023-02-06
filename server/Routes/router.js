const express = require("express");
const router = new express.Router();
const controllers_auth = require("../Controllers/auth");
const controllers_post = require("../Controllers/post");
const controllers_delete = require("../Controllers/deletePost");
const controllers_allblogs = require("../Controllers/allblogs");

const Auth  = require("../middleware/authenticate");
router.post("/user/register",controllers_auth.user_register);
router.post("/user/login",controllers_auth.user_login);
router.post("/blogPost", Auth.authenticate , controllers_post.blogPost);
router.put("/editBlog/:id", Auth.authenticate , controllers_post.updateBlogPost);
router.delete("/deletePost/:id", Auth.authenticate,  controllers_delete.deletePost);
router.get("/allBlogs", Auth.authenticate , controllers_allblogs.getBlogs);


module.exports = router;