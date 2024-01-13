const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../secrets/index.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next({ statjus: 401, message: "token required" });
  } else {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return next({ status: 401, message: "token invalid" });
      } else {
        req.decodedJwt = decoded;
        next();
      }
    });
  }

  /*
    * IMPLEMENT

    - On valid token in the Authorization header, call next.
    - On missing token in the Authorization header, the response body should include a string exactly as follows: "token required".
    - On invalid or expired token in the Authorization header, the response body should include a string exactly as follows: "token invalid".
  */
};
