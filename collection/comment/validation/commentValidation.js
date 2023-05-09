const joi = require("joi");

const descriptionRole = {
  description: joi.string().min(0).max(1000).required()
};

const shortDescriptionRole = {
  shortDescription: joi.string().min(0).max(1000).required()
};

const arrTagRole = {
  arrTag: joi.array()
}

const lastUpdateRole = {
  lastUpdate: joi.number()
}


const createSkeleton = {
  ...descriptionRole,
  ...shortDescriptionRole,
  ...arrTagRole,
};

const editSkeleton = {
  ...descriptionRole,
  ...shortDescriptionRole,
  ...arrTagRole,
  ...lastUpdateRole
}

const createSchema = joi.object(createSkeleton);
const editSchema = joi.object(editSkeleton);


module.exports = {
  createSchema,
  editSchema
};
