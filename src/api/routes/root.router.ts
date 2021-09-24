import express, { Router } from 'express';
import RootController from '@src/api/controllers/root.controller';

const RootRoute: Router = express.Router();

RootRoute.get('/', RootController.rootGet);

export default RootRoute;
