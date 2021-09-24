import express, { Router } from 'express';
import UsersController from '@src/api/controllers/users.controller';
import userDtoModel from '../models/user.dto.model';
import validateRequestSchema from '@src/api/middleware/validateRequestSchema.middleware';

const UsersRouter: Router = express.Router();

/* /users/health-check */
UsersRouter.get('/health-check', UsersController.root);

/* /users/all to get the data of all users */
UsersRouter.get('/all', UsersController.get);

/* POST /users/login */
UsersRouter.post('/login', UsersController.loginCandidate);

/* GET /users/:id */
UsersRouter.get('/:id', UsersController.getById);

/* PATCH /users/update */
UsersRouter.patch('/update/:id', UsersController.update);

/* User Router export */
UsersRouter.post(
  '/create',
  userDtoModel,
  validateRequestSchema,
  UsersController.create
);

/* PATCH /users/update */
// UsersRouter.patch('/update', UsersController.update);

export default UsersRouter;
