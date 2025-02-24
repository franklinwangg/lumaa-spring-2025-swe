const express = require("express");
const { createTask, deleteTask, updateTask, getTasks } = require("../controllers/taskController");

const router = express.Router();

router.post("/", createTask); 
router.get("/", getTasks);
router.put("/", updateTask);
router.delete("/", deleteTask);

module.exports = router;