exports.errorResponse = function (res, error) {
  return res.status(400).send({
    error: error.toString(),
    success: false,
  });
};
