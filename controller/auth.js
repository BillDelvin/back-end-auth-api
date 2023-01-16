require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { query } = require("../database/config");

async function validateAuth(req, res, next) {
  const { username, password } = req.body;
  try {
    if (username === undefined) return res.status(400).json({ message: "Username required!" });

    if (password === undefined) return res.status(400).json({ message: "Password required!" });

    next();
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
}

async function register(req, res) {
  const { username, password } = req.body;

  try {
    const checkUser = await query(`
        SELECT id FROM users WHERE username = '${username}';
    `);

    if (checkUser.length !== 0) return res.status(400).json({ message: "User already exists!" });

    const slat = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(password, slat);

    await query(`
        INSERT INTO users (
            username, password
        ) VALUES (
            '${username}', '${hash}'
        );
    `);

    return res.status(200).json({ message: "Register Successfully!" });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
}

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const [checkUser] = await query(`
      SELECT id, username, password FROM users WHERE username = '${username}';
    `);

    if (checkUser === undefined) return res.status(400).json({ message: "Invalid user!" });

    const isMatch = await bcrypt.compare(password, checkUser.password);

    if (!isMatch) return res.status(400).json({ message: "Invalid username/password!" });

    const data = {
      id: checkUser.id,
      username: checkUser.username,
    };

    const token = await jwt.sign(data, process.env.privateKey, { expiresIn: "1d" });
    return res.status(200).json({ Authorization: `bearer ${token}` });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
}

module.exports = { register, login, validateAuth };
