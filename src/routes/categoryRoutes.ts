import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

// Modelo Zod para validação de categorias
const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
});

// Criar categoria
router.post('/', async (req, res) => {
  try {
    const validated = categorySchema.parse(req.body);
    const category = await prisma.category.create({
      data: validated,
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Excluir categoria
router.delete('/:id', async (req, res) => {
  try {
    const category = await prisma.category.delete({
      where: {
        id: Number(req.params.id),
      },
    });
    res.status(204).send();
  } catch (err) {
    res.status(404).json({ message: 'Category not found' });
  }
});

export const CategoryRouter = router;
