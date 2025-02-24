const bcrypt = require('bcrypt');  // Ensure bcrypt is installed

const { pool } = require('../../config/db');  // Assuming you're using the pool from db.js

const createTask = async (req, res) => {
  try {
    const { user_id, task } = req.body;

    const result = await pool.query(
        "INSERT INTO tasks (user_id, task) VALUES ($1, $2) RETURNING *",
        [user_id, task]
    );

    res.status(201).json({user_id : user_id, task : task});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating task" });
  }
};

const deleteTask = async (req, res) => {
    try {
      const { task_id } = req.query;
      console.log("req.query : ", req.query);
  
      const result = await pool.query(
        "DELETE FROM tasks WHERE task_id = $1 RETURNING *",
        [task_id]
      );
  
      // Check if a task was deleted
      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Task not found" });
      }
  
      res.status(200).json({ message: "Task deleted successfully", deletedTask: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error deleting task" });
    }
  };
    
  const getTasks = async (req, res) => {
    try {
      const { user_id} = req.query; // Extract user_id from query parameters
  
      if (!user_id) {
        return res.status(400).json({ message: "User ID is required" });
      }
  
      const result = await pool.query(
        "SELECT * FROM tasks WHERE user_id = $1",
        [user_id]
      );
  
      res.status(200).json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving tasks" });
    }
  };  

  // const updateTask = async (req, res) => {
  //   try {
  //     const { task_id, new_task} = req.body; // Extract task ID and new values

  
  //     if (!task_id) {
  //       return res.status(400).json({ message: "Task ID is required" });
  //     }
  
  //     const result = await pool.query(
  //       "UPDATE tasks SET task = $1 WHERE task_id = $2 RETURNING *",
  //       [new_task, task_id]
  //     );      
  //     if (result.rowCount === 0) {
  //       return res.status(404).json({ message: "Task not found" });
  //     }
  
  //     res.status(200).json({ message: "Task updated successfully", updatedTask: result.rows[0] });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ message: "Error updating task" });
  //   }
  // }; 
  
  const updateTask = async (req, res) => {
  try {
    const { task_id, new_task } = req.body; // Extract task ID and new values

    if (!task_id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    // Convert task_id to a string
    const taskIdString = String(task_id);

    // Validate UUID format
    const isValidUUID = /^[0-9a-fA-F-]{36}$/.test(taskIdString);
    if (!isValidUUID) {
      return res.status(400).json({ message: "Invalid UUID format" });
    }


    const result = await pool.query(
      "UPDATE tasks SET task = $1 WHERE task_id = $2 RETURNING *",
      [new_task, taskIdString]
    );


    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully", updatedTask: result.rows[0] });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
  }
};


module.exports = { createTask, deleteTask, getTasks, updateTask };