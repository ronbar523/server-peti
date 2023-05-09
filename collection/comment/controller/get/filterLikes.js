const CommentModelGet = require("../../model/functions/getFunctions");
const UserModelGet = require("../../../user/model/functions/getFunctions");
const PostModelGet = require("../../../post/model/functions/getFunctions")

const filterLikes = async (req, res) => {
  try {
    let { postId, commentId, commentIdCreated } = req.params;
    let { filter } = req.query;
    filter = filter.toLowerCase();

    const comment = await CommentModelGet.findCommentById(commentId);

    if (comment !== null) {
      let arrUsers = [];

      const arrLikes = comment.arrLikes;

      arrUsers = await UserModelGet.filterUsers(arrLikes);

      const filterArr = arrUsers.filter((users) =>
        users.userName.toLowerCase().startsWith(filter)
      );

      res.status(200).json({ filterArr: filterArr });
    } else {
      const post = await PostModelGet.findPostById(postId);

      if (post !== null) {
        if (commentIdCreated !== "undefined") {
          const commentMain = await CommentModelGet.findCommentById(
            commentIdCreated
          );
          if (commentMain === null) {
            res.status(410).json({ msg: "Comment main deleted" });
          } else {
            res.status(410).json({ msg: "Comment deleted" });
          }
        } else {
          res.status(410).json({ msg: "Comment deleted" });
        }
      } else {
        res.status(410).json({ msg: "Post deleted" });
      }
    }
  } catch (err) {
    
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  filterLikes,
};
