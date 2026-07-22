import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/authService';

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name, role } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, password, and name are required' });
    }

    const result = await registerUser({ email, password, name, role });
    return res.status(201).json(result);
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Registration failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await loginUser({ email, password });
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(401).json({ error: error.message || 'Login failed' });
  }
};
