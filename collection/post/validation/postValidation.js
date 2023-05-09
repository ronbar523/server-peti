const joi = require("joi");

const descriptionRole = {
  description: joi.string().min(0).max(1000)
};

const shortDescriptionRole = {
  shortDescription: joi.string().min(0)
};

const categoryRole = {
  category: joi.array()
}

const locationRole = {
  location: joi.any()
}

const postKindRole = {
  postKind: joi.string().required()
}

const postPhotoRole = {
  postPhoto: joi.string()
}

const arrTagRole = {
  arrTag: joi.array()
}

const lastUpdateRole = {
  lastUpdate: joi.number().required()
}

const createSkeleton = {
  ...descriptionRole,
  ...shortDescriptionRole,
  ...categoryRole,
  ...locationRole,
  ...postKindRole,
  ...postPhotoRole,
  ...arrTagRole,
};

const editSkeleton = {
  ...descriptionRole,
  ...shortDescriptionRole,
  ...categoryRole,
  ...locationRole,
  ...arrTagRole,
  ...lastUpdateRole
}

const createSchema = joi.object(createSkeleton);
const editSchema = joi.object(editSkeleton);


module.exports = {
  createSchema,
  editSchema
};
