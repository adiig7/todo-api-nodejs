import ErrorHandler from "../middlewares/error.js"
import {Task} from "../models/task.js"

export const newTask = async (req, res, next) => {
    const { title, description } = req.body
    // const task = new Task({ title })
    // await task.save()
    await Task.create({
        title,
        description,
        user: req.user,
    })
    res.status(201).json({
        success: true,
        message: "Task added successfully"
    })
}

export const getMyTask = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const tasks = await Task.find({
          user: userId,
        });
        res.status(200).json({
          success: true,
          tasks,
        });
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res, next) => {
    const { id } = req.params
    const task = await Task.findById(id)

    if (!task) return next(new ErrorHandler("Task not found", 404));

    task.isCompleted = !task.isCompleted
    await task.save()
    res.status(200).json({
        success: true,
        message: "Task updated"
    })
};

export const deleteTask = async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new Error("Invalid ID"))
    
   await task.deleteOne();
  res.status(200).json({
      success: true,
      message: "Task deleted"
  });
};