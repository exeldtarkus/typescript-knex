import express from 'express';
import {authRouter} from './AuthRouters';
import {usersRoute} from './UsersRouters';
import {dashboardRouters} from './DashboardRouters';
import {ReviewDataRouters} from './ReviewDataRouters';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', usersRoute);
router.use('/dashboard', dashboardRouters);
router.use('/review-data', ReviewDataRouters);

export {router as apiRouter};
