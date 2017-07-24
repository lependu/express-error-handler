const notFound = (req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
};

const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;

  if (process.env.NODE_ENV === 'development') {
    res.status(status)
      .send({
        message: err.message,
        details: err
      })
      .end();
  } else {
    res.status(status)
      .send({
        message: err.message,
        details: null
      })
      .end();
  }
}

module.exports.notFound = notFound;
module.exports.errorHandler = errorHandler;
