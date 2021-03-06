require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/index');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');
const errorHandler = require('./middlewares/custom-error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { db } = require('./utils/const');

const { PORT = 3000, DB = db } = process.env;
const app = express();

app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log(error));

app.listen(PORT, (error) => (error ? console.log(error) : console.log(`listening port ${PORT}`)));
