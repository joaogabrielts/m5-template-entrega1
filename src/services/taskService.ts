

import { prisma } from "../database/prisma";

export const taskService = {
  createTask: async (data: any, userId: number) => {
    const { title, content, categoryId } = data;
    const task = await prisma.task.create({
      data: { title, content, finished: false, userId, categoryId },
    });
    return task;
  },

  getTasks: async (userId: number, category: string) => {
    const tasks = await prisma.task.findMany({
      where: { userId, category: { name: category } },
    });
    return tasks;
  },

  updateTask: async (taskId: string, data: any, userId: number) => {
    const task = await prisma.task.update({
      where: { id: taskId },
      data,
    });
    return task;
  },

  deleteTask: async (taskId: string, userId: number) => {
    await prisma.task.delete({ where: { id: taskId } });
  }
};
