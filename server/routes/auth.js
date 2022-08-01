const { Router } = require("express");
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jtwGenerator");
const router = Router();
const validationInfo = require("../middleware/validInfo");
const authMiddleware = require("../middleware/auth");

router.post("/register", validationInfo, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [
      email,
    ]);
    if (user.rows.length !== 0) {
      return res.status(401).json("User already exists.");
    }
    const saltRound = 10;
    const salt = await bcrypt.genSalt(saltRound);
    const bcryptPassword = await bcrypt.hash(password, salt);
    const newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1,$2,$3) RETURNING *",
      [name, email, bcryptPassword]
    );
    const token = jwtGenerator(newUser.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Server Error.");
  }
});

router.post("/login", validationInfo, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await pool.query("SELECT * FROM users WHERE user_email=$1", [
      email,
    ]);
    if (user.rows.length === 0) {
      return res.status(401).json("Invalid credentials.");
    }
    const isMatch = bcrypt.compare(password, user.rows[0].user_password);
    if (!isMatch) {
      return res.status(401).json("Invalid password.");
    }
    const token = jwtGenerator(user.rows[0].user_id);
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json("Server Error.");
  }
});

router.get("/is-verify", authMiddleware, async (req, res) => {
  try {
    res.json(true);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
