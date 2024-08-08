require('dotenv').config({
  path: './.env',
});
const { app, startApp } = require('./app.js');
const connectDB = require('./db/index.js');

(async () => {
  // connect mongodb database
  await connectDB();

  // start the application
  startApp();

  // start express server
  app.listen(process.env.PORT, () => {
    console.log(`🚝 Server is running on port ${process.env.PORT}`);
  });
})();
