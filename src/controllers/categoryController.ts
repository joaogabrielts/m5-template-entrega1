import { Request, Response } from 'express';
import { categoryService } from '../services/categoryService';

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.createCategory(req.body, req.userId);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    await categoryService.deleteCategory(req.params.id, req.userId);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
