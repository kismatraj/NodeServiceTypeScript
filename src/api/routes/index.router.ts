import { Router } from 'express';
import '@src/config/server.config';
import RootRoute from './root.router';
import UsersRouter from './users.router';

const ApiRouter = Router();

ApiRouter.use('/', RootRoute);
ApiRouter.use('/users', UsersRouter);

export default ApiRouter;
