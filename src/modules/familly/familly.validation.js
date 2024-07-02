import joi from "joi";

export const addOrDelete = joi.object({
  kind: joi.string().valid("add", "delete").required(),
});
