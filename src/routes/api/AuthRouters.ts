import express from 'express';
import * as controller from '../../app/https/controllers/AuthControllers';
import validatorAuthLogin from '../../app/https/request_validator/ValidatorAuthLogin';
import {authMiddleware} from '../../app/https/middleware/AuthMiddleware';
import {refreshTokenMiddleware} from '../../app/https/middleware/RefreshTokenMiddleware';

const router = express.Router();

router.post('/login', validatorAuthLogin, controller.login);
router.get('/token/verify', authMiddleware, controller.verifyToken);
router.post('/refresh-token', refreshTokenMiddleware, controller.verifyToken);

export {router as authRouter};
