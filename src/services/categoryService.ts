import { prisma } from "../database/prisma";


export const categoryService = {
  createCategory: async (data: any, userId: number) => {
    const { name } = data;
    const category = await prisma.category.create({
      data: { name, userId },
    });
    return category;
  },

  deleteCategory: async (categoryId: string, userId: number) => {
    await prisma.category.delete({ where: { id: categoryId } });
  }
};
