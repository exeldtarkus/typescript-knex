import express from 'express';
import * as controller from '../../app/https/controllers/UsersControllers';
import {authMiddleware} from '../../app/https/middleware/AuthMiddleware';

const router = express.Router();

router.get('/', authMiddleware, controller.index);

export {router as usersRoute};
