const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

exports.register = async (req, res) => {
  const { username, phone, email, location, password, passwordConfirm } = req.body;

  // Validation checks
  if (!username || !phone||  !email || !location || !password || !passwordConfirm) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Check if email is already in use
  pool.query(
    "SELECT email FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "Email already in use" });
      }

      // Check if passwords match
      if (password !== passwordConfirm) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 8);

        // Insert new user into database
        pool.query(
          "INSERT INTO users SET ?",
          { username, phone, email, location, password: hashedPassword },
          (error, result) => {
            if (error) {
              console.log(error);
              return res.status(500).json({ message: "Internal Server Error" });
            }

            // Respond with a success message
            return res.status(201).json({ message: "User registered successfully." });
          }
        );
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Fetch user from database
  pool.query("SELECT * FROM users WHERE email = ?", [email], async (error, results) => {
    if (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Email or password is incorrect" });
    }

    const user = results[0];

    try {
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Email or password is incorrect" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      // Set cookie with JWT token
      const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("jwt", token, cookieOptions);

      // Respond with a success message or redirect to profile page
      return res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

