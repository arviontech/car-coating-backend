import { Types } from 'mongoose';

export type TBookingStatus = 'Available' | 'Booked' | 'Canceled';

export type TSlot = {
  serviceId: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  isBooked?: TBookingStatus;
};
