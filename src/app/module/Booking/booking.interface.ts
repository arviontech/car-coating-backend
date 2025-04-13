import { Types } from 'mongoose';

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

export type TBooking = {
  userId: Types.ObjectId; // The customer who books
  serviceId: Types.ObjectId;
  slotId: Types.ObjectId;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  cancellationReasonByCustomer?: string;
  cancellationReasonByAdmin?: string;
  notes?: string;
  vehicleType: TVehicleType;
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear?: string;
  registrationPlate?: string;
};
