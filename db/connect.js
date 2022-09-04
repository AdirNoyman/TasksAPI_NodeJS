const mongoose = require('mongoose');

const connectionString =
	'mongodb+srv://adiros:qC0b9EwDi8P9Kob1@taskmanager.wbwag29.mongodb.net/?retryWrites=true&w=majority';

const connectDB = url => {
	return mongoose
		.connect(url)
		.then(() => {
			console.log('Connected to DB 🤓🤟');
		})
		.catch(err => {
			console.log('Error connecting to DB failed 😩:', err);
		});
};

module.exports = connectDB;
