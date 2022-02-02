const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExp } = require('../utils/const');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required().min(2).max(300),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().min(2).max(300),
    image: Joi.string().required().pattern(regExp),
    trailerLink: Joi.string().required().pattern(regExp),
    thumbnail: Joi.string().required().pattern(regExp),
    // TODO: определить количество символов в id
    movieId: Joi.string().hex().required(),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
  }),
}), createMovie);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    // TODO: определить количество символов в id
    id: Joi.string().hex().required(),
  }),
}), deleteMovie);

module.exports = router;
