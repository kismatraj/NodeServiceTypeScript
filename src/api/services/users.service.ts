import { Error, FilterQuery, QueryOptions, Schema } from 'mongoose';
import UserDocument from '@src/api/mongodb/documents/user.document';
import UserModel from '@src/api/mongodb/models/user.model';
import IUserLogin from '../interfaces/userLogin.interface';

/**
 * @Creates the user data
 * @param input Body of type IUser
 * @returns created user
 */
const create = async function (input: UserDocument) {
  return await UserModel.create(input);
};

/* Search on given payload*/
const find = async function (
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) {
  return await UserModel.find(query, null, options);
};

/* Search by id*/
const findById = async function (id: string) {
  return await UserModel.findById(id);
};

/* Login the user */
const login = async function (login: IUserLogin) {
  const data = await UserModel.findOne({ loginId: login.loginId });
  if (!data) {
    throw new Error('Wrong Credentials');
  }
  // const user = new UserModel();
  return data.comparePassword(login.password);
};

/* Update the user */
const update = async function (id: string, update: UserDocument) {
  const options = { new: true };
  const data = await UserModel.findByIdAndUpdate(id, update, options);
  if (!data) {
    throw new Error('Invalid request');
  }
  return data;
};

const UserService = {
  create,
  find,
  findById,
  login,
  update,
};

export default UserService;
