import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

export type TVehicleType =
  | 'Car'
  | 'Truck'
  | 'SUV'
  | 'Van'
  | 'Motorcycle'
  | 'Bus'
  | 'Electric-Vehicle'
  | 'Hybrid-Vehicle'
  | 'Bicycle'
  | 'Tractor';

export type TBookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED';

const bookingSchema = new Schema<TBooking>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: 'Service',
      required: true,
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: 'Slot',
      required: true,
    },
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
      default: 'PENDING',
    },
    cancellationReasonByCustomer: {
      type: String,
    },
    cancellationReasonByAdmin: {
      type: String,
    },
    notes: {
      type: String,
    },
    vehicleType: {
      type: String,
      enum: [
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
      ],
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: String,
    },
    registrationPlate: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
