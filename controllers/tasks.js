const Task = require('../models/Tasks');
const asyncWrapper = require('../middleware/async');
const {createCustomError} = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({tasks});
});

const getTask = asyncWrapper(async (req, res) => {
    const {id: taskId} = req.params;
    const task = await Task.findOne({_id: taskId});

    if (!task) {
        return next(createCustomError(`NO task with id : ${taskId}`, 404));
    }

    res.status(200).json({task});
});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({task});
});

const updateTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true,
    });

    if (!task) {
        return next(createCustomError(`NO task with id : ${taskID}`, 404));
    }

    res.status(200).json({task});
});

// PUT route controller replaces as against the PATCH which adds
const editTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
        new: true,
        runValidators: true,
        overwrite: true,
    });

    if (!task) {
        return next(createCustomError(`NO task with id : ${taskID}`, 404));
    }

    res.status(200).json({task});
});

const deleteTask = asyncWrapper(async (req, res) => {
    const {id: taskID} = req.params;
    const task = await Task.findOneAndDelete({_id: taskID});

    if (!task) {
        return next(createCustomError(`NO task with id : ${taskID}`, 404));
    }
    res.status(200).json({task});
});

module.exports = {
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask,
    editTask,
};
