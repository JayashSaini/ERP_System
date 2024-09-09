const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const { ApiError } = require('./utils/ApiError.js');
const { errorHandler } = require('./middlewares/error.middlewares.js');
const morganMiddleware = require('./logger/morgan.logger.js');

const app = express();

const startApp = () => {
  // import routes
  const userRouter = require('./routes/auth/user.routes.js');
  const profileRouter = require('./routes/profile.routes.js');
  const projectRouter = require('./routes/project.routes.js');
  const enquiryRouter = require('./routes/enquiry.routes.js');

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN || '*',
      credentials: true,
    })
  );

  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.use(cookieParser());

  // Set security headers with Helmet middleware
  app.use(helmet());

  // Log requests with Morgan middleware (use 'combined' format for production)
  app.use(morgan('dev'));
  app.use(morganMiddleware);

  // routes
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/profile', profileRouter);
  app.use('/api/v1/projects', projectRouter);
  app.use('/api/v1/inquiries', enquiryRouter);

  // if endpoint not found
  app.use((_, __, next) => {
    const error = new ApiError(404, 'endpoint not found');
    next(error);
  });

  // Error handler
  app.use(errorHandler);
};

module.exports = { app, startApp };
