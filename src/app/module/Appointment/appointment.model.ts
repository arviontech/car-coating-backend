// appointment.model.ts
import { Schema, model } from 'mongoose';
import { TAppointment } from './appointment.interface';

const appointmentSchema = new Schema<TAppointment>(
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
    selectedTime: { type: String, required: true },
    appointmentDate: { type: String, required: true }, // Duplicate of slot.date
    status: {
      type: String,
      enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
      default: 'PENDING',
    },
    notes: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Appointment = model<TAppointment>(
  'Appointment',
  appointmentSchema,
);
