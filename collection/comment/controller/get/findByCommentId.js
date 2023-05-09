const CommenttModelGet = require("../../model/functions/getFunctions");
const PostModelGet = require("../../../post/model/functions/getFunctions")

const find = async (req, res) => {
  try {
    let { commentId, postId } = req.params;
    let { skip, limit } = req.query;

    const comment = await CommenttModelGet.findCommentById(commentId);

    if (comment !== null) {
      const commentsArr = comment.arrComments;

      if (limit === "All") {
        limit = commentsArr.length;
      }

      let comments = await CommenttModelGet.findCommentComments(
        commentsArr,
        skip,
        limit
      );

      res.json({ comments: comments });
    } else {
      const post = await PostModelGet.findPostById(postId);

      if (post === null) {
        res.status(410).json({ msg: "Post deleted" });
      } else {
        res.status(410).json({ msg: "Comment deleted" });
      }
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  find,
};
