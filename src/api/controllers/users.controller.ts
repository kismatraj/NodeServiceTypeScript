import IUser from '@src/api/interfaces/user.interface';
import { Request, Response, NextFunction } from 'express';
import UserDocument from '@src/api/mongodb/documents/user.document';
import UserService from '../services/users.service';

const root = async (req: Request, res: Response, next: NextFunction) => {
  return await res.status(201).json({
    message: 'Users service is running well.',
  });
};

/* Create user from request body */
const create = async (req: Request, res: Response, next: NextFunction) => {
  const input = req.body as UserDocument;
  const user = await UserService.create(input)
    .then()
    .catch((e) => {
      throw new Error(e);
    });
  return res.status(201).json({
    message: 'User created successfully',
    result: user,
  });
};

/*Get all users of Db */
const get = async (req: Request, res: Response, next: NextFunction) => {
  const users = await UserService.find(req.body);
  if (!users) {
    //next(new customErrorHandler('Requested resource not available', 404));
  }
  res.status(200).json({
    message: 'success',
    count: users?.length,
    data: users,
  });
};

/*Get all user by record ID of Db */
const getById = async (req: Request, res: Response, next: NextFunction) => {
  const users = await UserService.findById(req.params.id);
  if (!users) {
    // next(new customErrorHandler('Requested resource not available', 404));
  }
  res.status(200).json({
    message: 'success',
    data: users,
  });
};

/*Get login of candidates from Db */
const loginCandidate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const input = req.body as IUser;
  const login = await UserService.login(input);
  if (!login) {
    // next(new customErrorHandler('Wrong credentials. Login failed', 404));
  }
  res.status(200).json({
    message: 'success',
    data: login,
  });
};

/* Update user from request body */
const update = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.id;
  const update = req.body;
  const user = await UserService.update(id, update)
    .then()
    .catch((e) => {
      // next(new customErrorHandler(e.message, 404));
    });
  return res.status(201).json({
    message: 'User update successfully',
    result: true,
    data: user,
  });
};

const UsersController = {
  root,
  get,
  getById,
  loginCandidate,
  create,
  update,
};

export default UsersController;
