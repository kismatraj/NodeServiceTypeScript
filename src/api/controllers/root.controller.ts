import { Request, Response, NextFunction } from 'express';
import '@src/config/server.config';

const rootGet = (req: Request, res: Response, next: NextFunction) => {
  return res.status(201).json({
    message: `Server is running at url http://${process.env.HOSTNAME}:${process.env.PORT}/${process.env.API_VERSION_IND}`,
  });
};

const RootController = {
  rootGet,
};

export default RootController;
