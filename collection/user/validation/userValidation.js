const joi = require("joi");

const emailRole = {
  email: joi.string().required(),
};

const userNameRole = {
  userName: joi.string().min(4).max(10).trim().required(),
};

const passwordRole = {
  password: joi.string()
    .regex(
      new RegExp("^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&]).{6,30}$")
    )
    .required(),
};


const nameUserRole = {
  firstName: joi.string().min(1).max(13).required(),
  lastName: joi.string().min(1).max(13).required(),
  fullName: joi.string().min(1).max(27).required(),
};

const infoUserRole = {
  phone: joi.string(),
  dateOfBirth: joi.string().required(),
  gender: joi.string().min(4).max(11).required(),
};

const photoRole = {
  photo: joi.string(),
};

const bioRole = {
  bio: joi.string().max(50),
};

const secretNum = {
  num: joi.number().min(100_000).max(999_999).required(),
};

const registerSkeleton = {
  ...emailRole,
  ...userNameRole,
  ...passwordRole,
  ...nameUserRole,
  ...photoRole,
  ...infoUserRole,
  ...bioRole,
};

const loginSkeleton = {
  ...emailRole,
  ...passwordRole,
};

const editUserNameSkeleton = {
  ...userNameRole,
};
const editNameSkeleton = {
  ...nameUserRole,
};

const editBioSkeleton = {
  ...bioRole,
};

const editPasswordSkeleton = {
  ...passwordRole,
};

const editEmailSkeleton = {
  ...emailRole,
};

const newEmailSkeleton = {
  ...emailRole,
};

const restAndNewPasswordSkeleton = {
  ...emailRole,
  ...passwordRole,
  ...secretNum,
};

const updateDetailsSkeleton = {
  ...nameUserRole,
  ...photoRole,
  ...infoUserRole,
};

const registerSchema = joi.object(registerSkeleton);
const loginSchema = joi.object(loginSkeleton);
const editUserNameSchema = joi.object(editUserNameSkeleton);
const editNameSchema = joi.object(editNameSkeleton);
const editBioSchema = joi.object(editBioSkeleton);
const editPasswordSchema = joi.object(editPasswordSkeleton);
const editEmailSchema = joi.object(editEmailSkeleton);

const newEmailSchema = joi.object(newEmailSkeleton);
const restAndPassSchema = joi.object(restAndNewPasswordSkeleton);
const updateDetailsSchema = joi.object(updateDetailsSkeleton);

module.exports = {
  registerSchema,
  loginSchema,
  editUserNameSchema,
  editNameSchema,
  editPasswordSchema,
  editEmailSchema,
  editBioSchema,
  newEmailSchema,
  restAndPassSchema,
  updateDetailsSchema,
};
