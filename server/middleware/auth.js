const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Not Authorized.");
    }
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log(payload);
    req.user = payload.user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(403).json("Not Authorized.");
  }
};

module.exports = auth;
