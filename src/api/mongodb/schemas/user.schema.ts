import { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import UserDocument from '@src/api/mongodb/documents/user.document';
import '@src/config/server.config';

const UserSchema: Schema = new Schema(
  {
    userId: {
      type: String,
      required: [true, 'User id is required'],
      unique: [true, 'User id should be unique'],
    },
    firstName: { type: String, required: [true, 'Name is required'] },
    middleName: { type: String },
    lastName: { type: String },
    loginId: {
      type: String,
      required: [true, 'Login id is required'],
      unique: [true, 'Login Id should be unique'],
    },
    password: { type: String, required: [true, 'Password is required'] },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

/* Create Index at user id and login id field */
UserSchema.index({ userId: 1, loginId: 1 });

/*Virtual method to get the full name */
UserSchema.virtual('name').get(function (this: UserDocument) {
  return `${this.firstName} ${this.middleName} ${this.lastName}`;
});

UserSchema.pre('save', async function (this: UserDocument, next) {
  //Only hash if has been modified (or it is new)
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR));
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  return next();
});

UserSchema.methods.comparePassword = async function (
  candidatePassword
): Promise<boolean> {
  const user = this as UserDocument;
  return await bcrypt
    .compare(candidatePassword, user.password)
    .catch((error) => false);
};

export default UserSchema;
