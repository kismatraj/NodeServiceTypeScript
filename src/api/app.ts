import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import create from 'http-errors';
import ApiRouter from './routes/index.router';
import corsMiddleware from '@src/api/middleware/cors.middleware';
import '@src/config/server.config';
import HttpException from './util/errors/HttpException';
import errorMiddleware from './middleware/error.middleware';

const app: Application = express();
app.set('port', process.env.PORT);
app.set('host', process.env.HOSTNAME);

/* Rules allowed for the API CORS & Helmet config */
app.use(corsMiddleware);
app.use(helmet());
app.use(helmet.hidePoweredBy());

// Parse the request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Route config of API */
app.use(`${process.env.API_VERSION_IND}`, ApiRouter);

/*Handle unhandled routes error*/
app.use('*', async (req: Request, res: Response, next: NextFunction) => {
  next(new create.NotFound('Requested resource is not available'));
});

app.use(
  (err: HttpException, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
      error: {
        status: err.status || 500,
        errorMessage: err.message || 'Internal server error',
      },
    });
  }
);

/* Error Handlers */
app.use(errorMiddleware);

export default app;
