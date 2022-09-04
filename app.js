require('./db/connect');
const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const port = process.env.PORT || 3000;

// Middleware //////////////////////
app.use(express.static('./public'));
app.use(express.json());

// Routes /////////////////////////

app.use('/api/v1/tasks', tasks);

app.use(notFound);
// Activate the custom error middleware we created
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.DB_CONNECTION_STRING);
		app.listen(port, () => {
			console.log('Server app and running! 😎🤟');
		});
	} catch (err) {
		console.log('Error starting the server 🥹');
	}
};

start();
