import { Request, Response } from 'express';
import { Registration } from '../models/Registration';
import { IRegistration } from 'registration';

export const addRegistration = async (req: Request, res: Response) => {
  try {
    const registrationData = req.body;
    const { id, ...updateData } = registrationData;

    let registration;

    if (id) {
      registration = await Registration.findOneAndUpdate(
        { id },
        { ...updateData, updatedAt: new Date() },
        { new: true }
      );
    } else {
      registration = new Registration({
        ...registrationData,
        updatedAt: new Date(),
      });
      await registration.save();
    }

    res.status(201).json(registration);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getRegistrations = async (req: Request, res: Response) => {
  try {
    const registrations = await Registration.find()
      .select('-_id -__v')
      .sort({ createdAt: -1 });

    const sortedRegistrations = registrations.sort((a, b) =>
      a.employeeName.localeCompare(b.employeeName)
    );

    res.json(sortedRegistrations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
};

export const searchRegistrations = async (req: Request, res: Response) => {
  try {
    const searchString = req.query.q as string;
    if (!searchString) {
      return res.status(400).json({ error: 'Search string is required' });
    }

    const registrations: IRegistration[] = await Registration.find({
      $or: [{ cpf: { $regex: searchString, $options: 'i' } }],
    });

    return res.status(200).json(registrations);
  } catch (error) {
    console.error('Error searching registrations:', error);
    return res
      .status(500)
      .json({ error: 'An error occurred while searching for registrations' });
  }
};

export const getRegistration = async (req: Request, res: Response) => {
  try {
    const registration = await Registration.findOne({
      id: req.params.id,
    }).select('-_id -__v');
    if (!registration) {
      res.status(404).json({ error: 'Registration not found' });
    }

    res.json(registration);
  } catch (err) {
    console.error('Failed to get registration', err);
    res.status(500).json({ error: 'Failed to get registration' });
  }
};

export const deleteRegistration = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const registration = await Registration.findOne({ id });

    if (!registration) {
      return res.status(404).json({ error: 'Registration not found' });
    }

    await Registration.deleteOne({ id });

    return res
      .status(200)
      .json({ message: 'Registration deleted successfully' });
  } catch (err: any) {
    console.error('Failed to delete registration', err);
    res.status(500).json({ error: 'Failed to delete registration' });
  }
};
