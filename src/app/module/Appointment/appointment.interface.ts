import { Types } from 'mongoose';

export type TAppointment = {
  id?: string;
  userId: Types.ObjectId; // The customer who books
  serviceId: Types.ObjectId;
  slotId: Types.ObjectId;
  selectedTime: string; // Selected slot time from timeSlots
  appointmentDate: string; // Redundant, but helpful for fast access
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  notes?: string;
  isDeleted: boolean;
};
