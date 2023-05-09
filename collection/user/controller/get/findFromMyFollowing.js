const UserModelGet = require("../../model/functions/getFunctions");
const FollowModelGet = require("../../../follow/model/functions/getFunctions");

const findUsers = async (req, res) => {
  try {
    let { limit } = req.query;
    const myId = req.jwtData._id;

    const myFollow = await FollowModelGet.findFollowByCreatedBy(myId);

    const myFollowing = myFollow[0].arrFollowing;

    let usersArr = await UserModelGet.findFollowersForTag(
      myFollowing,
      0,
      limit
    );


    if(usersArr.length < 10){
      const limit  =  10 - usersArr.length
      let moreUser = await UserModelGet.findAllUsers(0, limit)

      for(let x = 0; x < moreUser.length; x++){
        let flag = false;
        for(let y = 0; y <usersArr.length; y++){
          if(usersArr[y]._id === moreUser[x]._id){
            flag = true
            break
          }
        }
        if(!flag){
          usersArr.push(moreUser[x])
        }
      }
    }
    

    res.json(usersArr);
    
  } catch (err) {
    console.log(err)
    res.status(400).json({ err: err });
  }
};

module.exports = {
  findUsers,
};