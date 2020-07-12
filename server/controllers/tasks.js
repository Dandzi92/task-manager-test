const Task = require("../models/task");
const Status = require("../models/status");

class TasksController {
  static async getAll(req, res) {
    const tasks = await Task.find().populate(['userId', 'statusId']);
    return res.send(tasks);
  }
  static async getById(req, res) {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).populate(['userId', 'statusId']);
    return res.send(task);
  }
  static async getByCriteria(req, res) {
    const taskId = req.params.id;
    const task = await Task.findById(taskId).populate(['userId', 'statusId']);
    return res.send(task);
  }
  static async create(req, res) {
    const userId = req.userInfo.userId
    const newTaskData = req.body;
    const newStatus = await Status.create({description: newTaskData.description})
    const newTask = await Task.create({...newTaskData, userId, statusId: newStatus._id });
    return res.send(newTask);
  }
  static async update(req, res) {
    const userId = req.userInfo.userId
    const newTaskData = req.body;
    const { idTask, ...updatedTaskData } = req.body;
    const updatedTask = await Task.findByIdAndUpdate(idtask, updatedTaskData);
    return res.send(updatedTask);
  }
  static async removeById(req, res) {
    const taskId = req.params.id;
    const removedTask = await Task.findByIdAndRemove(taskId);
    return res.send(removedTask);
  }
}

module.exports = TasksController;
