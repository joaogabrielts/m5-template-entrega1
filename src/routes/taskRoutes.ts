import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  categoryId: z.number().optional(),
});

router.post('/', async (req, res) => {
  try {
    const validated = taskSchema.parse(req.body);
    const category = validated.categoryId ? await prisma.category.findUnique({ where: { id: validated.categoryId } }) : null;

    if (validated.categoryId && !category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const task = await prisma.task.create({
      data: validated,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const category = req.query.category ? String(req.query.category) : null;
    const tasks = category
      ? await prisma.task.findMany({
          where: {
            category: {
              name: category,
            },
          },
          include: {
            category: true,
          },
        })
      : await prisma.task.findMany({ include: { category: true } });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(404).json({ message: 'Category not found' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        category: true,
      },
    });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(404).json({ message: 'Task not found' });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const validated = taskSchema.parse(req.body);
    const category = validated.categoryId ? await prisma.category.findUnique({ where: { id: validated.categoryId } }) : null;

    if (validated.categoryId && !category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const updatedTask = await prisma.task.update({
      where: {
        id: Number(req.params.id),
      },
      data: validated,
    });

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.task.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: 'Task not found' });
  }
});

export const TaskRouter = router;
