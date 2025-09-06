const middleware = (req, res, next) => {
  console.log(`Request method: ${req.method} \nRequest url: ${req.url}`);
  next();
};

const jsonMiddleware = (req, res, next) => {
  res.setHeader("Content-Type", "apllication/json");
  next();
};

export { middleware, jsonMiddleware };
