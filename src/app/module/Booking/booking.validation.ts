import { z } from 'zod';
import { Types } from 'mongoose';

export const createBookingZodSchema = z.object({
  body: z.object({
    userId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid userId',
    }),
    serviceId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid serviceId',
    }),
    slotId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: 'Invalid slotId',
    }),
    status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED']).optional(),
    cancellationReasonByCustomer: z.string().optional(),
    cancellationReasonByAdmin: z.string().optional(),
    notes: z.string().optional(),
    vehicleType: z.enum([
      'Car',
      'Truck',
      'SUV',
      'Van',
      'Motorcycle',
      'Bus',
      'Electric-Vehicle',
      'Hybrid-Vehicle',
      'Bicycle',
      'Tractor',
    ]),
    vehicleBrand: z.string({
      required_error: 'Vehicle brand is required',
    }),
    vehicleModel: z.string({
      required_error: 'Vehicle model is required',
    }),
    manufacturingYear: z.string().optional(),
    registrationPlate: z.string().optional(),
  }),
});
