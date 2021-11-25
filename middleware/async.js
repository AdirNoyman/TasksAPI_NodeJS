const asyncWrapper = (func) => {
  // We have access to the req,res and next via the Express framework
  return async (req, res, next) => {
    try {
      await func(req, res, next);
    } catch (error) {
      // Passing the error to the next middleware and it handels the error
      next(error);
    }
  };
};

module.exports = asyncWrapper;
