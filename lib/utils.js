

exports.resJson = function(res, code, body){
  res.status(code).json(body);
};

exports.resErrJson = function(res, code, body){
  res.status(code).json(body);
};