import Joi from "joi";

export const tipSchema = Joi.object({
  title: Joi.string().min(3).max(31).required(),
  content: Joi.string().min(10).required(),
});

