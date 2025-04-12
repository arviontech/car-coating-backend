import { Service } from '../Services/services.model';
import { bookedStatus, slotDefine } from './slot.constant';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';

const createSlotIntoDB = async (payload: TSlot) => {
  const { serviceId, startTime, endTime, duration } = payload;

  const isExistService = await Service.findById(serviceId);

  if (!isExistService) {
    throw new Error('This service is not found');
  }

  const timeSlots = slotDefine(startTime, endTime, duration);

  const isExisSlot = await Slot.findOne({
    $or: [{ startTime: { $lte: endTime }, endTime: { $gte: startTime } }],
  });

  if (isExisSlot) {
    throw new Error('Slot already created. Please choose another time');
  } else {
    const results = [];

    for (const slot of timeSlots) {
      const result = await Slot.create({
        ...payload,
        isBooked: bookedStatus.Available,
        startTime: slot.startTime,
        endTime: slot.endTime,
      });
      results.push(result);
    }
    return results;
  }
};

const getSlotIntoDB = async () => {
  const result = await Slot.find().populate('serviceId');
  return result;
};

export const SlotService = {
  createSlotIntoDB,
  getSlotIntoDB,
};
