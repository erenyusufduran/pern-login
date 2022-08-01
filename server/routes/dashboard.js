const { Router } = require("express");
const pool = require("../db");
const authMiddleware = require("../middleware/auth");

const router = Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [
      req.user,
    ]);
    res.json(user.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error.");
  }
});

module.exports = router;
