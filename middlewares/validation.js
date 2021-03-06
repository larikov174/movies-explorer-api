const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
});

const updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(3),
  }),
});

const movieIdValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(300),
    director: Joi.string().required().min(2).max(300),
    duration: Joi.number().required().min(2).max(300),
    year: Joi.string().required().length(4),
    description: Joi.string().required().min(2).max(2000),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('В данных поля image обнаружены ошибки.');
    }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('В данных поля trailer обнаружены ошибки.');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('В данных поля thumbnail обнаружены ошибки.');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2).max(300),
    nameEN: Joi.string().required().min(2).max(300),
  }),
});

module.exports = {
  loginValidation,
  updateUserValidation,
  createUserValidation,
  movieIdValidation,
  createMovieValidation,
};
