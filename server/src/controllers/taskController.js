const Task = require("../models/task");

//create task
const createTask = async (req, res) => {
  
  try {
    const task = await Task.create({
      ...req.body,
    });
    res.status(201).json({
      message: "Task Created",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//get all task
const getTasks = async (req, res) => {
  
  try {
    const task = await Task.find();
    res.status(200).json({
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//update task

const updateTask = async (req, res) => {
  try {
    console.log(req.params.id)
     console.log(req.body)
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      message: "Task Updated",
      task,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

//Delete task
const deleteTask = async (req, res) => {
  
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Task Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
};
