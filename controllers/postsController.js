postsController = {}
const Post = require('../models/post');

/**
 * @swagger
 * /all_posts:
 *   get:
 *     summary: Get all posts
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 */
postsController.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send({
            message: "Successful",
            data: posts,
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).send(error);
    }
};
postsController.createPost = async (req, res) => {
    try {
        const body = req.body;
        const post = new Post(body);
        const result = await post.save().then((r) => {
            res.status(200).send({
                result: r,
                code: 200,
                message: "Post added successfully",
            });
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).send(error);
    }
};
postsController.updatePost = async (req, res) => {
    if (!req.params._id) {
        res.status(500).send({
            message: "ID missing",
        });
    }
    try {
        const _id = req.params._id;
        let updates = req.body;
        runUpdate(_id, updates, res);
    } catch (error) {
        console.log("error", error);
        return res.status(500).send(error);
    }
};
postsController.deletePost = async (req, res) => {
    if (!req.params._id) {
        res.status(500).send({
          message: "ID missing",
        });
      }
      try {
        const _id = req.params._id;
    
        const result = await Post.findOneAndDelete({
          _id: _id,
        });
    
        res.status(200).send({
          code: 200,
          message: "Deleted Successfully",
        });
      } catch (error) {
        console.log("error", error);
        return res.status(500).send(error);
      }
};
postsController.getSinglePost = async (req, res) => {
    try {
      const _id = req.params._id;
      const post = await Post.findOne({ _id: _id });
      res.status(200).send({
        message: "Successful",
        data: post,
      });
    } catch (error) {
      console.log("error", error);
      return res.status(500).send(error);
    }
};
async function runUpdate(_id, updates, res) {
    try {
        const result = await Post.updateOne(
            {
                _id: _id,
            },
            {
                $set: updates,
            },
            {
                upsert: true,
                runValidators: true,
            }
        );
        {
            if (result.modifiedCount == 1) {
                res.status(200).send({
                    code: 200,
                    message: "Updated Successfully",
                });
            } else if (result.upsertedCount) {
                res.status(200).send({
                    code: 200,
                    message: "Created Successfully",
                });
            } else {
                res.status(422).send({
                    code: 422,
                    message: "Unprocessible Entity",
                });
            }
        }
    } catch (error) {
        console.log("error", error);
        return res.status(500).send(error);
    }
}
module.exports = postsController;