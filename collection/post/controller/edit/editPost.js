const PostModelEdit = require("../../model/functions/editFunctions");
const PostModelGet = require("../../model/functions/getFunctions");
const PostArraysModelEdit = require("../../../postArrays/model/functions/editFunctions");
const PostValidation = require("../../validation/postValidation");

const edit = async (req, res) => {
  try {
    let { postId } = req.params;
    const myId = req.jwtData._id;
    const post = await PostModelGet.findPostById(postId);

    if (post !== null) {
      if (post.createdBy.toString() === myId) {
        const requestBody = await PostValidation.editSchema.validateAsync(
          req.body,
          { abortEarly: false }
        );

        let lastArrTag = post.arrTag;
        let newArrTag = requestBody.arrTag;

        let newTag = [];
        let removeTag = [];
        if (lastArrTag.length > 0 && newArrTag.length > 0) {
          for (let y = 0; y < newArrTag.length; y++) {
            let flag = false;
            for (let x = 0; x < lastArrTag.length; x++) {
              if (newArrTag[y] === lastArrTag[x].toString()) {
                flag = true;
                break;
              }
            }
            if (!flag) {
              newTag.push(newArrTag[y]);
            }
          }
        } else {
          if (newArrTag.length === 0) {
            removeTag = lastArrTag;
          } else {
            newTag = newArrTag;
          }
        }

        if (lastArrTag.length + newTag.length !== newArrTag.length) {
          if (removeTag.length === 0) {
            for (let y = 0; y < lastArrTag.length; y++) {
              const lastTag = lastArrTag[y].toString();
              let flag = false;
              for (let x = 0; x < newArrTag.length; x++) {
                if (lastTag === newArrTag[x]) {
                  flag = true;
                  break;
                }
              }
              if (!flag) {
                removeTag.push(lastArrTag[y]);
              }
            }
          }
        }

        for (let x = 0; x < newTag.length; x++) {
          await PostArraysModelEdit.sendTag(newTag[x], postId);
        }

        for (let x = 0; x < removeTag.length; x++) {
          await PostArraysModelEdit.removeTag(removeTag[x], postId);
        }

        const postUpdate = await PostModelEdit.editPost(
          post._id,
          requestBody.description,
          requestBody.shortDescription,
          requestBody.category,
          requestBody.location,
          requestBody.arrTag,
          requestBody.lastUpdate
        );

        res.json({ msg: "Post update", postUpdate: postUpdate });
      } else {
        res.status(401).json({ msg: "You not alowed to edit this comment" });
      }
    } else {
      res.status(410).json({ msg: "Post deleted" });
    }
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
};

module.exports = {
  edit,
};
