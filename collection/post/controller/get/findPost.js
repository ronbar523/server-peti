const PostModelGet = require("../../model/functions/getFunctions");

const find = async (req, res) => {
  try {
    let = { skip, limit } = req.query;

    const postsArr = await PostModelGet.findAllPosts(skip, limit);

    res.json({ postsArr: postsArr });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  find,
};
