import { BookingService } from './booking.services';
import CatchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';

const createBooking = CatchAsync(async (req, res) => {
  const result = await BookingService.createBooking(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Booking created successfully',
    data: result,
  });
});

const getAllBookings = CatchAsync(async (req, res) => {
  const result = await BookingService.getAllBookings(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result.result,
    meta: result.meta,
  });
});

const getSingleBooking = CatchAsync(async (req, res) => {
  const result = await BookingService.getSingleBooking(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking retrieved successfully',
    data: result,
  });
});

const getMyBooking = CatchAsync(async (req, res) => {
  const userId = req.user?.id;
  const result = await BookingService.getMyBooking(userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'My bookings retrieved successfully',
    data: result,
  });
});

const updateBooking = CatchAsync(async (req, res) => {
  const userRole = req.user?.role;
  const result = await BookingService.updateBooking(
    req.params.id,
    req.body,
    userRole,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking updated successfully',
    data: result,
  });
});

const cancelBooking = CatchAsync(async (req, res) => {
  const { reason } = req.body;
  const userRole = req.user?.role;
  const result = await BookingService.cancelBooking(
    req.params.id,
    userRole,
    reason,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  getMyBooking,
  updateBooking,
  cancelBooking,
};
