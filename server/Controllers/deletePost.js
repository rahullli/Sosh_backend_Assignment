const users =  require("../models/userSchema.js");
const blogs = require("../models/blogSchema.js");
const authenticate = require("../middleware/authenticate");

exports.deletePost = async (req, res) => {
    const postId = req.params.id;
    try {
        const post = await blogs.findById(postId);
        if (!post) return res.status(404).json({ error: 'Post not found' });

        const deletedPost = await blogs.findByIdAndDelete(postId);
        res.status(200).json({ message: 'Post deleted successfully'});
    } catch (err) {
        res.status(500).json(err);
    }
};
