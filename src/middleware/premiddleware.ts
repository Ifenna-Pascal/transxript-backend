import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { CORS_ORIGIN } from '../constants';
import deserializeUser from './deserialize_user';

function PreMiddleware(app: express.Application) {
  app.use(express.json());
  app.use(
    cors({
      origin: CORS_ORIGIN,
      credentials: true,
    }),
  );

  app.use(helmet());
  app.use(deserializeUser);

  return app;
}

export default PreMiddleware;
