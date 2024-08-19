const Task = require('../models/Tasks');

const getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({tasks});
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

const getTask = async (req, res) => {
    try {
        const {id: taskId} = req.params;
        const task = await Task.findOne({_id: taskId});
        console.log(task);

        if (!task) {
            return res.status(404).json({msg: `NO task with id : ${taskId}`});
        }

        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

const updateTask = (req, res) => {
    res.send('update task');
};

const editTask = (req, res) => {
    res.send('edit task');
};

const deleteTask = (req, res) => {
    res.send('delete task');
};

module.exports = {
    getAllTasks,
    getTask,
    updateTask,
    deleteTask,
    createTask,
    editTask,
};
