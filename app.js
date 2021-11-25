const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
// Middleware #1 - serving the static files (tells Express where to find them)
app.use(express.static('./public'));
// Middleware #2 - required for mounting the request data on to the request body. It converts the JSON payload to JS object.
app.use(express.json());
// Middleware #3 - setting the root router
app.use('/api/v1/tasks', tasks);
// Middleware #4 - Deals with 404 situations
app.use(notFound);
// Middleware #5 - Handels errors
app.use(errorHandlerMiddleware);

// If the environment we run our project there is env PORT definition, it will run on that PORT, but if not, it will run 3000;
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on ${port} 😎🤘`));

    console.log('Connected to DB 🤓🤘...');
  } catch (err) {
    console.log(err);
  }
};

start();
