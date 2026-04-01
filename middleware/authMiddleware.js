const jwt = require("jsonwebtoken");
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, "secretKey", (err, user) => {
      if (err) {
        return res.sendStatus(403); // Invalid or expired token
      }
      req.user = user; // Attach user payload to request
      next();
    });
  } else {
    res.sendStatus(401); // Authorization header missing
  }
};
module.exports={authenticateJWT};