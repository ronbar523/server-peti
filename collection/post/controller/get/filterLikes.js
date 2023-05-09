const PostModelGet = require("../../model/functions/getFunctions");
const UserModelGet = require("../../../user/model/functions/getFunctions");

const filterLikes = async (req, res) => {
  try {
    let { id } = req.params;
    let { filter } = req.query;
    filter = filter.toLowerCase();

    const post = await PostModelGet.findPostById(id);

    if (post !== null) {
      let arrUsers = [];

      const arrLikes = post.arrLikes;

      arrUsers = await UserModelGet.filterUsers(arrLikes);

      const filterArr = arrUsers.filter((users) =>
        users.userName.toLowerCase().startsWith(filter)
      );

      res.status(200).json({ filterArr: filterArr });
    } else {
      res.status(410).json({ msg: "Post deleted" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  filterLikes,
};
