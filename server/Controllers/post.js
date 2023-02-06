const blogs = require("../models/blogSchema.js");
const users =  require("../models/userSchema.js");
const bcrypt = require("bcrypt");
const authenticate = require("../middleware/authenticate");

exports.blogPost = async(req,res)=>{
    const user = req.user;

    if (!user) return res.status(401).json({ error: 'Token is not valid' });

    const newPost = new blogs({
        title: req.body.title,
        description: req.body.description,
        createdBy: user._id,
    });

    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
}


// Update the Post
exports.updateBlogPost = async (req, res) => {

 

  try {


    const blog = await blogs.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });


    blog.title = req.body.title;
    blog.description = req.body.description;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};
