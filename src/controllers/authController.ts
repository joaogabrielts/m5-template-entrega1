import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.login(email, password);
    res.status(200).json({ accessToken: token, user });
  } catch (err) {
    res.status(401).json({ message: err });
  }
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await authService.getProfile(req.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err });
  }
};
