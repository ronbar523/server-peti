const PostModelGet = require("../../model/functions/getFunctions");

const find = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModelGet.findPostById(id);

    if(post !== null){
      res.json(post);
    } else {
      res.status(410).json({ msg: "Post deleted" });
    }

  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  find,
};
