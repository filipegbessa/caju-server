import { Request, Response } from 'express';
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { IUser } from 'user';

const secret = process.env.SECRET;

export const isAthenticated = (req: Request, res: Response) => {
  try {
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
    });
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: IUser[] = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as IUser;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = new User({ email, password });
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as IUser;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secret, {
      expiresIn: '8h',
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};
