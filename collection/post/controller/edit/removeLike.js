const PostModelEdit = require("../../model/functions/editFunctions");
const PostModelGet = require("../../model/functions/getFunctions");

const removeLike = async (req, res) => {
  try {
    const { postId } = req.params;
    const myId = req.jwtData._id;

    const post = await PostModelGet.findPostById(postId);
    if (post !== null) {
      const arrLikes = post.arrLikes;
      let flagLike = false;

      for (let x = 0; x < arrLikes.length; x++) {
        if (arrLikes[x].toString() === myId) {
          flagLike = true;
          break;
        }
      }

      if (flagLike) {
        const updatePost = await PostModelEdit.removeLike(postId, myId);
        res.json({ msg: "Remove like", updatePost: updatePost });
      } else {
        res.status(410).json({ msg: "Post deleted" });
      }
    } else {
      res.status(203).json({ msg: "You not have like on this post" });
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  removeLike,
};