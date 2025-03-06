import { Request, Response } from 'express';
import { taskService } from '../services/taskService';

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.createTask(req.body, req.userId);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskService.getTasks(req.userId, req.query.category);
    res.status(200).json(tasks);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await taskService.updateTask(req.params.id, req.body, req.userId);
    res.status(200).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    await taskService.deleteTask(req.params.id, req.userId);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
