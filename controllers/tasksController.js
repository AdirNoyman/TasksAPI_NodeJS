const TaskModel = require('../models/taskModel');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await TaskModel.find({});
    res.status(201).json({ tasks });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await TaskModel.create(req.body);

    console.log(task);

    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getTask = async (req, res) => {
  try {
    // taskID is the alias we give to the id parameter
    const { id: taskID } = req.params;
    const task = await TaskModel.findOne({ _id: taskID });
    if (!task) {
      return res.status(404).json({ msg: `No task with ID ${taskID} found.` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteTask = async (req, res) => {
  try {
    // taskID is the alias we give to the id parameter
    const { id: taskID } = req.params;
    const taskToDelete = await TaskModel.findOneAndDelete({ _id: taskID });
    if (!taskToDelete) {
      return res.status(404).json({ msg: `No task with ID ${taskID} found.` });
    }
    res.status(200).json({ taskToDelete });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;

    const taskToUpdate = await TaskModel.findOneAndUpdate(
      { _id: taskID },
      // return task body
      req.body,
      // new >>> ordering mongo to return the updated task
      // runValidators >>> run validations that are defined in the schema
      { new: true, runValidators: true }
    );
    if (!taskToUpdate) {
      return res.status(404).json({ msg: `No task with ID ${taskID} found.` });
    }

    res.status(200).json({ taskToUpdate });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
