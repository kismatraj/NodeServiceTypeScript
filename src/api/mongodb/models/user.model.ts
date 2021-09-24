import mongoose from 'mongoose';
import UserDocument from '../documents/user.document';
import UserSchema from '@src/api/mongodb/schemas/user.schema';

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export default UserModel;
