import { Document } from 'mongoose';

export interface IRegistration extends Document {
  id: string;
  employeeName: string;
  cpf: string;
  email: string;
  admissionDate: Date;
  status: string;
};