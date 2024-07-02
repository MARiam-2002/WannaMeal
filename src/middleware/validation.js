import joi from 'joi'
import { Types } from 'mongoose'

export const validateObjectId = (value, helper) => {
    console.log({ value });
    console.log(helper);
    return Types.ObjectId.isValid(value) ? true : helper.message('In-valid objectId')
}
export const generalFields = {

    email: joi.string().email({
        minDomainSegments: 2,
        maxDomainSegments: 4,
        tlds: { allow: ['com', 'net'] }
    }).required(),
    password: joi.string(),
    cPassword: joi.string().required(),
    id: joi.string().custom(validateObjectId).required(),
    name: joi.string().required(),
    file: joi.object({
        size: joi.number().positive().required(),
        path: joi.string().required(),
        filename: joi.string().required(),
        destination: joi.string().required(),
        mimetype: joi.string().required(),
        encoding: joi.string().required(),
        originalname: joi.string().required(),
        fieldname: joi.string().required()
    })
}

export const validation = (Schema) => {
    return (req, res, next) => {
      const copyReq = {
        ...req.body,
        ...req.params,
        ...req.query,
        ...req.file,
      };
      const validationResult = Schema.validate(copyReq, { abortEarly: false });
      if (validationResult.error) {
        const errorMessages = validationResult.error.details.map(
          (error) => error.message
        );
        return next(new Error(errorMessages), { cause: 400 });
      }
      return next();
    };
  };