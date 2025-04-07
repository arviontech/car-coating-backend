/* eslint-disable @typescript-eslint/no-explicit-any */

import { IService } from './services.interface';
import { Service } from './services.model';
import QueryBuilder from '../../Builder/QueryBuilder';
import { serviceSearchableFields } from './services.constant';

//It takes an array of images (Express.Multer.File[]). It extracts only the file paths (file.path) from those images.
const mapImagePaths = (imageFiles?: Express.Multer.File[]): string[] => {
  return imageFiles ? imageFiles.map((file) => file.path) : [];
};

const createService = async (
  payload: IService,
  files?: { [key: string]: Express.Multer.File[] },
) => {
  // Extract and map images dynamically
  const imageFields = ['beforeImage', 'afterImage', 'imageGallery'];
  imageFields.forEach((field) => {
    if (files?.[field]) {
      (payload as any)[field] = mapImagePaths(files[field]);
    } else {
      (payload as any)[field] = [];
    }
  });

  // Create and save the new service
  return await Service.create(payload);
};

const getAllServices = async (query: Record<string, unknown>) => {
  const serviceQuery = new QueryBuilder(Service.find(), query)
    .search(serviceSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await serviceQuery.modelQuery;
  const meta = await serviceQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleServiceFromDB = async (id: string) => {
  const result = await Service.findById(id);
  return result;
};

const updateService = async (
  id: string,
  payload: Partial<IService>,
  files?: { [key: string]: Express.Multer.File[] },
) => {
  // Handle image uploads
  const imageFields = ['beforeImage', 'afterImage', 'imageGallery'];
  imageFields.forEach((field) => {
    if (files?.[field]) {
      (payload as any)[field] = mapImagePaths(files[field]);
    }
  });

  const updatedService = await Service.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedService;
};

const deleteService = async (id: string) => {
  const deletedService = await Service.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return deletedService;
};

export const ServicesService = {
  createService,
  getAllServices,
  getSingleServiceFromDB,
  updateService,
  deleteService,
};
