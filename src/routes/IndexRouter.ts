import express, {Request, Response} from 'express';
import {apiRouter} from './api/ApiRouters';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({title: 'Ms-Slik'});
});

router.use('/api', apiRouter);

export {router as indexRouter};
