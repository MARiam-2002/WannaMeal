import joi from "joi";

export const createUserValidator = joi
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
    role: joi.string().valid("user", "admin").required(),
    phone: joi
      .string()
      .optional()
      .custom((value, helpers) => {
        const arEGRegex = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/; // Example regex for Egyptian phone numbers
        if (!arEGRegex.test(value)) {
          return helpers.message(
            "Invalid phone number only accepted Egy  Phone numbers"
          );
        }
        return value;
      }),
  })
  .required();

export const getUserValidator = joi
  .object({
    id: joi
      .string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": "Invalid User id format",
        "any.required": "User id is required",
      }),
  })
  .required();

export const updateUserValidator = joi
  .object({
    id: joi
      .string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": "Invalid User id format",
        "any.required": "User id is required",
      }),
    userName: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    role: joi.string().valid("user", "admin").required(),
    phone: joi
      .string()
      .optional()
      .custom((value, helpers) => {
        const arEGRegex = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/; // Example regex for Egyptian phone numbers
        if (!arEGRegex.test(value)) {
          return helpers.message(
            "Invalid phone number only accepted Egy  Phone numbers"
          );
        }
        return value;
      }),
  })
  .required();

export const deleteUserValidator = joi
  .object({
    id: joi
      .string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": "Invalid User id format",
        "any.required": "User id is required",
      }),
  })
  .required();

export const updateLoggedUserValidator = joi
  .object({
    userName: joi.string().min(3).max(20).required(),
    email: joi.string().email().required(),
    phone: joi
      .string()
      .optional()
      .custom((value, helpers) => {
        const arEGRegex = /^(00201|\+201|01)[0-2,5]{1}[0-9]{8}$/; // Example regex for Egyptian phone numbers
        if (!arEGRegex.test(value)) {
          return helpers.message(
            "Invalid phone number only accepted Egy  Phone numbers"
          );
        }
        return value;
      }),
  })
  .required();
