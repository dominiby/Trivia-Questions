import models from '../db';

declare global {
  namespace Express {
      export interface Request {
        context: {
          models: typeof models;
        }
      }
  }
}