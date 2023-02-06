const users =  require("../models/userSchema.js");
const blogs = require("../models/blogSchema.js");
const authenticate = require("../middleware/authenticate");

exports.getBlogs = async (req, res) => {
    try {
      const Blog = await blogs.find();
      res.status(200).json(Blog);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };