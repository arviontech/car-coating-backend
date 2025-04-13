import { Router } from 'express';
import { SlotController } from './slot.controller';

import { SlotValidation } from './slot.validation';
import { validateRequest } from '../../middleware/validateRequest';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = Router();

router.post(
  '/slots',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  validateRequest(SlotValidation.slotValidationSchema),
  SlotController.createSlot,
);
router.get(
  '/slots/availability',
  auth(...Object.values(USER_ROLE)),
  SlotController.getAllSlot,
);

export const SlotRoutes = router;
