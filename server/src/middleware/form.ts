import type { RequestHandler } from "express";
import Joi from "joi";

const fighterSchema = Joi.object({
  lastName: Joi.string()
    .min(2)
    .max(50)
    .messages({
      "string.min": "Le nom doit contenir au moins 2 caractère",
      "string.max": "Le nom doit contenir au maximum 50 caractères",
    })
    .required(),
  firstName: Joi.string().min(2).max(30).required().messages({
    "string.min": "Firstname must contain maximum 30 characters",
    "string.max": "Firstname must contain maximum 30 characters",
  }),
  nationality: Joi.string().min(3).max(30).required().messages({
    "string.min": "Nationality must contain minimum 3 characters",
    "string.max": "Nationality must contain maximum 30 characters",
  }),
  photo: Joi.string().min(10).max(255).required().messages({
    "photo.max": "This can be only an URL with minimum 10 characters",
    "photo.min": "This can be only an URL with maximum 255 characters",
  }),
  wins: Joi.number().min(1).max(2).integer().required().messages({
    "number.max": "Wins must contain maximum 99 wins",
    "number.min": "Wins must contain minimum 1 win",
  }),
  losses: Joi.number().min(1).max(2).integer().required().messages({
    "number.min": "Wins must contain maximum 99 losses",
    "number.max": "Wins must contain minimum 1 losse",
  }),
  nickname: Joi.string().min(2).max(50).required().messages({
    "string.min": "Nickname must contain minimum 2 characters",
    "string.max": "Nickname must contain maximum 50 characters",
  }),
});

const validate: RequestHandler = async (req, res, next) => {
  const { error } = fighterSchema.validate(req.body);
  if (error) {
    res.json({ error: error.details[0].message });
  } else {
    next();
  }
};
export default { validate };
