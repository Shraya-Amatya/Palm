const express = require("express");
const router = express.Router();
const mysql = require("mysql");

/**
 * @swagger
 * components:
 *   schemas:
 *     Plot:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the plot
 *         name:
 *           type: string
 *           description: The name of the plot
 *         property1:
 *           type: string
 *           description: If it's default or sample
 *         showSold:
 *           type: number
 *           description: If it's 0=not sold or 1=sold
 *         plot:
 *           type: string
 *           description: The plot details
 *         heading:
 *           type: string
 *           description: The heading of the plot
 *         available:
 *           type: number
 *           description: The availability status of the plot
 *         showAvailable:
 *           type: number
 *           description: If it's 0=not available or 1=available
 *         location:
 *           type: string
 *           description: The location of the plot
 *         house:
 *           type: string
 *           description: The house details associated with the plot
 *         road:
 *           type: string
 *           description: The road details associated with the plot
 *         drain:
 *           type: string
 *           description: The drainage details associated with the plot
 *         ft:
 *           type: string
 *           description: The measurement unit of the plot (e.g., feet)
 *         Sold:
 *           type: number
 *           description: The sold status of the plot
 *         road2:
 *           type: string
 *           description: The secondary road details associated with the plot
 *         totalPlot:
 *           type: number
 *           description: The total number of plots
 *         measurement:
 *           type: string
 *           description: The measurement details of the plot
 *      
 */

/**
 * @swagger
 * tags:
 *   name: Plots
 *   description: The plots managing API
 */

/**
 * @swagger
 * /api/plots:
 *   get:
 *     summary: Returns the list of all the plots
 *     tags: [Plots]
 *     responses:
 *       200:
 *         description: The list of the plots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Plot'
 */

/**
 * @swagger
 * /api/plots/add:
 *   post:
 *     summary: Add a new plot  
 *     tags: [Plots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Plot'
 *     responses:
 *       201:
 *         description: The plot was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plot'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/plots/{id}:
 *   get:
 *     summary: Get the plot by id
 *     tags: [Plots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The plot id
 *     responses:
 *       200:
 *         description: The plot description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Plot'
 *       404:
 *         description: The plot was not found
 */

/**
 * @swagger
 * /api/plots/delete/{id}:
 *   delete:
 *     summary: Delete a plot by id
 *     tags: [Plots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The plot id
 *     responses:
 *       200:
 *         description: The plot was successfully deleted
 *       404:
 *         description: The plot was not found
 *       500:
 *         description: Some server error
 */

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "plots_database",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    process.exit(1); // Exit the process with failure
  } else {
    console.log("Connected to the database.");
  }
});

// Middleware to check database connection
router.use((req, res, next) => {
  if (!db._socket || db._socket.destroyed) {
    return res.status(500).json({ error: "Database connection was lost" });
  }
  next();
});

// Get all plots
router.get("/", (req, res) => {
  const sql = "SELECT * FROM plots";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching plots:", err);
      return res.status(500).json({ error: "Failed to fetch plots" });
    }
    res.json(results);
  });
});

// Get plot by ID
router.get("/:id", (req, res) => {
  const sql = "SELECT * FROM plots WHERE id = ?";
  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error("Error fetching plot:", err);
      return res.status(500).json({ error: "Failed to fetch plot" });
    }
    res.json(result);
  });
});

// Add a new plot
router.post("/", (req, res) => {
  const newPlot = req.body;
  const sql = "INSERT INTO plots SET ?";

  db.query(sql, newPlot, (err, result) => {
    if (err) {
      console.error("Error inserting plot:", err);
      return res.status(500).json({ error: "Failed to insert plot" });
    }
    console.log("New plot added:", result.insertId);
    res.status(201).json({ id: result.insertId, ...newPlot });
  });
});

// Delete a plot
router.delete("/delete/:id", (req, res) => {
  const sql = "DELETE FROM plots WHERE id = ?";
  db.query(sql, [req.params.id], (err) => {
    if (err) {
      console.error("Error deleting plot:", err);
      return res.status(500).json({ error: "Failed to delete plot" });
    }
    res.json({ message: "Plot deleted" });
  });
});

module.exports = router;
