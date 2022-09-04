const { CustomAPIError } = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
	// If there is a customed error I've set - Launch that customized error
	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	} else {
		// Else return the default Node.js built in error handler
		return res
			.status(500)
			.json({ msg: 'Something went wrong. Please try again 😬' });
	}
};

module.exports = errorHandlerMiddleware;
