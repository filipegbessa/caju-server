import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from 'user';

interface IUserDocument extends Omit<IUser, 'id'>, Document {}

const UserSchema = new Schema<IUserDocument>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre<IUserDocument>('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  this.updatedAt = new Date();
  next();
});

export const User = model<IUserDocument>('User', UserSchema);
