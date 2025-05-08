import express from 'express';
import * as controller from '../../app/https/controllers/ReviewDataControllers';
import {authMiddleware} from '../../app/https/middleware/AuthMiddleware';
import {validatorParamPeriod} from '../../app/https/request_validator/ValidatorParamPeriod';

const router = express.Router();

router.get('/period', authMiddleware, controller.activePeriod);
router.get(
  '/mis-vs-p1/period/:period',
  authMiddleware,
  validatorParamPeriod,
  controller.countMisVsP1,
);

export {router as ReviewDataRouters};
