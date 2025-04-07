import CatchAsync from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { ServicesService } from './services.service';
import httpStatus from 'http-status';

const createService = CatchAsync(async (req, res) => {
  const files = req.files as { [key: string]: Express.Multer.File[] };

  const result = await ServicesService.createService(req.body, files);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Service created successfully',
    data: result,
  });
});

const getAllServicesFromDB = CatchAsync(async (req, res) => {
  const result = await ServicesService.getAllServices(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Services fetched successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleServiceFromDB = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServicesService.getSingleServiceFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service fetched successfully',
    data: result,
  });
});

const updateService = CatchAsync(async (req, res) => {
  const { id } = req.params;
  const files = req.files as { [key: string]: Express.Multer.File[] };

  const result = await ServicesService.updateService(id, req.body, files);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service updated successfully',
    data: result,
  });
});

const deleteService = CatchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ServicesService.deleteService(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Service deleted (soft) successfully',
    data: result,
  });
});

export const ServicesController = {
  createService,
  getAllServicesFromDB,
  getSingleServiceFromDB,
  updateService,
  deleteService,
};
