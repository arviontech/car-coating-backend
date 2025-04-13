import express from 'express';
import { BookingController } from './booking.controller';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/',
  auth(...Object.values(USER_ROLE)),
  BookingController.createBooking,
);

router.get(
  '/',
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  BookingController.getAllBookings,
);

router.get(
  '/my-bookings',
  auth(USER_ROLE.CUSTOMER),
  BookingController.getMyBooking,
);

router.get(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN, USER_ROLE.CUSTOMER),
  BookingController.getSingleBooking,
);

router.patch(
  '/:id',
  auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
  BookingController.updateBooking,
);

router.patch(
  '/cancel/:id',
  auth(...Object.values(USER_ROLE)),
  BookingController.cancelBooking,
);

export const BookingRoutes = router;
