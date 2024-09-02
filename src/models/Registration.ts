import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IRegistration } from '../types';

export const RegistrationSchema = new Schema(
  {
    id: { type: String, default: uuidv4, unique: true },
    employeeName: { type: String, required: true },
    cpf: { type: String, required: true },
    email: { type: String },
    admissionDate: { type: Date, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export const Registration = model<IRegistration>(
  'Registration',
  RegistrationSchema
);
