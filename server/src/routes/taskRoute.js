const express = require("express");

const router = express.Router();

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

//create task route
router.post("/", createTask);

//Get all tasks route
router.get("/", getTasks);

//Update job
router.put("/:id", updateTask);


//Delete job
router.delete("/:id", deleteTask);

module.exports = router;
