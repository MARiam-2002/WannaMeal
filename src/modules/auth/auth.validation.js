import joi from "joi";
import { validateObjectId } from "../../middleware/validation.js";

export const registerSchema = joi
  .object({
    userName: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
    confirmPassword: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .valid(joi.ref("password"))
      .required(),
    lang: joi.string().valid("en", "ar").required(),
  })
  .required();

export const activateSchema = joi
  .object({
    activationCode: joi.string().required(),
    lang: joi.string().valid("en", "ar").required(),
  })
  .required();

export const login = joi
  .object({
    email: joi.string().email().required(),
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
    lang: joi.string().valid("en", "ar").required(),
  })
  .required();

export const forgetCode = joi
  .object({
    email: joi.string().email().required(),
    lang: joi.string().valid("en", "ar").required(),
  })
  .required();
export const verify = joi
  .object({
    forgetCode: joi.string().required(),
    lang: joi.string().valid("en", "ar").required(),
  })
  .required();

export const resetPassword = joi
  .object({
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .required(),
    confirmPassword: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
      .valid(joi.ref("password"))
      .required(),
    lang: joi.string().valid("en", "ar").required(),
  })
  .required();

export const followUnFollowUser = joi
  .object({
    id: joi.string().custom(validateObjectId).required(),
    lang: joi.string().valid("en", "ar").required(),
  })
  .required();
export const update = joi
  .object({
    id: joi.string().custom(validateObjectId).required(),
    userName: joi.string().min(3).max(20),
    email: joi.string().email(),
    password: joi
      .string()
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/),
    boi: joi.string(),
    size: joi.number().positive(),
    path: joi.string(),
    filename: joi.string(),
    destination: joi.string(),
    mimetype: joi.string(),
    encoding: joi.string(),
    originalname: joi.string(),
    fieldname: joi.string(),
    lang: joi.string().valid("en", "ar").required(),
  })
  .required();
export const getProfile = joi
  .object({
     query:joi.string().required() ,
    lang: joi.string().valid("en", "ar").required(),
  })
  .required();
export const lang = joi
  .object({
    lang: joi.string().valid("en", "ar").required(),
  })
  .required();
export const updatePremium = joi
  .object({
    userId: joi.string().custom(validateObjectId).required(),
    isPremium: joi.boolean().required(),
    lang: joi.string().valid("en", "ar").required(),
  })
  .required();



