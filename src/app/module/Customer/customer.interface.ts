import { Types } from 'mongoose';

export type TCustomer = {
  id?: string;
  userId: Types.ObjectId;
  name: string;
  userName: string;
  email: string;
  gender: 'MALE' | 'FEMALE';
  contact: string;
  address?: string;
  profileImg?: string;
  isDeleted: boolean;
};
