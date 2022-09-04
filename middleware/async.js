// fn = The controller function I pass to the wrapper function
const asyncWrapper = fn => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			// Pass the error to an error middleware
			next(error);
		}
	};
};

module.exports = asyncWrapper;
