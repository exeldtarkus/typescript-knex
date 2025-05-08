import express from 'express';
import * as controller from '../../app/https/controllers/DashboardControllers';
import {authMiddleware} from '../../app/https/middleware/AuthMiddleware';
import {validatorParamYear} from '../../app/https/request_validator/ValidatorParamYear';

const router = express.Router();

router.get(
  '/statistics/:year',
  authMiddleware,
  validatorParamYear,
  controller.statistics,
);
router.get(
  '/metrics/:year',
  authMiddleware,
  validatorParamYear,
  controller.metrics,
);

export {router as dashboardRouters};
