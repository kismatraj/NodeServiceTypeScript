import { Document } from 'mongoose';
import IUser from '@src/api/interfaces/user.interface';

export default interface UserDocument extends IUser, Document {
  fullName: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
