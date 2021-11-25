const { CustomAPIError } = require('../errors/custom-error');

const errorHandlerMiddleware = (err, req, res, next) => {
  // Handels error that we handel in the controller
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  // Handels error that we didn't handel in the controller
  return res
    .status(500)
    .json({ error: 'Something went wrong 😫...Try again 💪' });
};

module.exports = errorHandlerMiddleware;
