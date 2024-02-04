const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
      res.status(500).json({message: error.message, stack: error.stack});
  });
}

module.exports =  asyncHandler;