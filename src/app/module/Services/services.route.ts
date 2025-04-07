import { Router } from 'express';
import { ServicesController } from './services.controller';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middleware/auth';
import { validateRequest } from '../../middleware/validateRequest';
import {
  createServiceValidationSchema,
  updateServiceValidationSchema,
} from './services.validation';
import { uploadMultipleImages } from '../../config/multer.config';
import { parseBodyForFormData } from '../../middleware/ParseBodyForFormData';
import { UploadedFilesArrayZodSchema } from '../../utils/uploadedFileValidationSchema';
import { validateFileRequest } from '../../middleware/validateUploadedFile';

const router = Router();

router.post(
  '/create-service',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  uploadMultipleImages([
    { name: 'beforeImage', maxCount: 5 },
    { name: 'afterImage', maxCount: 5 },
    { name: 'imageGallery', maxCount: 10 },
  ]),
  validateFileRequest(UploadedFilesArrayZodSchema),
  parseBodyForFormData,
  validateRequest(createServiceValidationSchema),
  ServicesController.createService,
);

router.get(
  '/all-services',
  auth(...Object.values(USER_ROLE)),
  ServicesController.getAllServicesFromDB,
);

router.get(
  '/single-service/:id',
  auth(...Object.values(USER_ROLE)),
  ServicesController.getSingleServiceFromDB,
);

router.patch(
  '/update-service/:id',
  auth(USER_ROLE.SUPER_ADMIN, USER_ROLE.ADMIN),
  uploadMultipleImages([
    { name: 'beforeImage', maxCount: 5 },
    { name: 'afterImage', maxCount: 5 },
    { name: 'imageGallery', maxCount: 10 },
  ]),
  validateFileRequest(UploadedFilesArrayZodSchema),
  parseBodyForFormData,
  validateRequest(updateServiceValidationSchema),
  ServicesController.createService,
);

router.delete('/:id', ServicesController.deleteService);

export const ServicesRoutes = router;
