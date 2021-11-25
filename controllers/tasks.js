const TaskModel = require('../models/taskModel');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await TaskModel.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await TaskModel.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  // taskID is the alias we give to the id parameter
  const { id: taskID } = req.params;
  const task = await TaskModel.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with ID ${taskID} found.`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  // taskID is the alias we give to the id parameter
  const { id: taskID } = req.params;
  const taskToDelete = await TaskModel.findOneAndDelete({ _id: taskID });
  if (!taskToDelete) {
    return next(createCustomError(`No task with ID ${taskID} found.`, 404));
  }
  res.status(200).json({ taskToDelete });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await TaskModel.findOneAndUpdate(
    { _id: taskID },
    // return task body
    req.body,
    // new >>> ordering mongo to return the updated task
    // runValidators >>> run validations that are defined in the schema
    { new: true, runValidators: true }
  );
  if (!task) {
    return next(createCustomError(`No task with ID ${taskID} found.`, 404));
  }

  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
