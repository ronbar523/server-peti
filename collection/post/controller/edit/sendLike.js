const PostModelEdit = require("../../model/functions/editFunctions");
const PostModelGet = require("../../model/functions/getFunctions");
const LikeModelEdit = require("../../../like/model/functions/editFunctions")

const sendLike = async (req, res) => {
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

      if (!flagLike) {
        const updatePost = await PostModelEdit.likePost(postId, myId);
        await LikeModelEdit.newLikePost(myId, postId)
        res.json({ msg: "New like", updatePost: updatePost });
      } else {
        res.status(203).json({ msg: "you already did like for this post" });
      }
    } else {
      res.status(410).json({ msg: "Post deleted" });
    }
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

module.exports = {
  sendLike,
};
