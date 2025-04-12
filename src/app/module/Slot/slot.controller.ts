import httpStatus from 'http-status';
import CatchAsync from '../../utils/catchAsync';
import { SlotService } from './slot.services';
import { sendResponse } from '../../utils/sendResponse';

const createSlot = CatchAsync(async (req, res) => {
  const result = await SlotService.createSlotIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot created successfully',
    data: result,
  });
});

const getAllSlot = CatchAsync(async (req, res) => {
  const result = await SlotService.getSlotIntoDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Slot retrived successfully',
    data: result,
  });
});

export const SlotController = {
  createSlot,
  getAllSlot,
};
