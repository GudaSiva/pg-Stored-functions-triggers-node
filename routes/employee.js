const express = require("express");
const router = express.Router();
const pool = require("pg");

router.get("/get/employees", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM employees");
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/post/employee", async (req, res) => {
  const { name, age, salary, department_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO employees (name, age, salary, department_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, age, salary, department_id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.put("/put/employees/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { name, age, salary, department_id } = req.body;
  try {
    const result = await pool.query(
      "UPDATE employees SET name=$1, age=$2, salary=$3, department_id=$4 WHERE id=$5 RETURNING *",
      [name, age, salary, department_id, id]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/delete/employees/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query("DELETE FROM employees WHERE id=$1", [id]);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
