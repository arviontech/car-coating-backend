// booking.services.ts
import { Booking } from './booking.model';

import { TBooking } from './booking.interface';
import { Slot } from '../Slot/slot.model';
import QueryBuilder from '../../Builder/QueryBuilder';
import { USER_ROLE } from '../User/user.constant';

const bookingSearchableFields = [
  'vehicleBrand',
  'vehicleModel',
  'registrationPlate',
  'userId.email',
  'userId.contact',
];

const createBooking = async (payload: TBooking) => {
  const createdBooking = await Booking.create(payload);
  await Slot.findByIdAndUpdate(payload.slotId, { isBooked: true });
  return createdBooking;
};

const getAllBookings = async (query: Record<string, unknown>) => {
  const bookingsQuery = new QueryBuilder(Booking.find(), query)
    .search(bookingSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bookingsQuery.modelQuery;
  const meta = await bookingsQuery.countTotal();
  return { result, meta };
};

const getSingleBooking = async (id: string) => {
  const booking = await Booking.findById(id);
  return booking;
};

const getMyBooking = async (userId: string) => {
  const bookings = await Booking.find({ userId });
  return bookings;
};

const updateBooking = async (
  id: string,
  payload: Partial<TBooking>,
  userRole: string,
) => {
  // Only proceed if admin or super admin AND a new slotId is provided
  if (
    (userRole === USER_ROLE.SUPER_ADMIN || userRole === USER_ROLE.ADMIN) &&
    payload?.slotId
  ) {
    const existingBooking = await Booking.findById(id);

    // If the slotId is actually changing
    if (existingBooking?.slotId?.toString() !== payload.slotId.toString()) {
      // Set the old slot as available
      await Slot.findByIdAndUpdate(existingBooking?.slotId, {
        isBooked: false,
      });

      // Set the new slot as booked
      await Slot.findByIdAndUpdate(payload.slotId, {
        isBooked: true,
      });
    }
  }

  // Perform the booking update
  const updatedBooking = await Booking.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedBooking;
};

const cancelBooking = async (id: string, userRole: string, reason: string) => {
  const update: Partial<TBooking> = {
    status: 'CANCELLED',
  };

  if (userRole === USER_ROLE.SUPER_ADMIN || userRole === USER_ROLE.ADMIN) {
    update.cancellationReasonByAdmin = reason;
  } else if (userRole === USER_ROLE.CUSTOMER) {
    update.cancellationReasonByCustomer = reason;
  }

  const cancelled = await Booking.findByIdAndUpdate(id, update, { new: true });

  if (cancelled?.slotId) {
    await Slot.findByIdAndUpdate(cancelled.slotId, { isBooked: false });
  }

  return cancelled;
};

export const BookingService = {
  createBooking,
  getAllBookings,
  getSingleBooking,
  getMyBooking,
  updateBooking,
  cancelBooking,
};
