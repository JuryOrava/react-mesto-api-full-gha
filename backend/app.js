const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const routerUser = require('./routes/users');
const routerCard = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');

const { writeTextToFile } = require('./errors/server-err-logs/error-logs');

const date = Date.now();
const serverErrorFile = `./errors/server-err-logs/log-${date}.txt`;

const { PORT = 3000 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._~#=]{1,256}\.[a-zA-Z0-9()]{1,6}(?:[-a-zA-Z0-9()@:%_.~#?&=]*)/),
  }),
}), createUser);

app.use('/', auth, routerUser);
app.use('/', auth, routerCard);

app.patch('*', (err, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не найдена'));
});

app.use(errorLogger);

app.use(errors());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  if (err.statusCode === undefined) {
    res.status(500).send({ message: 'На сервере произошла ошибка.' });
    writeTextToFile(serverErrorFile, `Дата и время ошибки: ${new Date()}; Текст ошибки: ${err.message}`);
  } else {
    res.status(err.statusCode).send({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
