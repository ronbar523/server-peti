const PostModelGet = require("../../../post/model/functions/getFunctions");
const CommenttModelGet = require("../../model/functions/getFunctions");

const find = async (req, res) => {
  try {
    let { postId } = req.params;
    let { skip, limit } = req.query;

    const post = await PostModelGet.findPostById(postId);

    if (post !== null) {
      const commentsArr = post.arrComments;

      let comments = await CommenttModelGet.findPostComments(
        commentsArr,
        skip,
        limit
      );

      res.json({ comments: comments });
    } else {
      res.status(410).json({ msg: "Post Deleted" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  find,
};
