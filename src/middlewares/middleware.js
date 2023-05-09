exports.globalMiddleware = (req, res, next) => {
  res.locals.localVar = "Está é uma variável local."
  next();
};

exports.csrfErrorCheck = (error, req, res, next) => {
  if (error) {
    return res.render("404");
  }
  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};