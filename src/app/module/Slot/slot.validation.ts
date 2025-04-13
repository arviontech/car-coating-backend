import { z } from 'zod';

const slotValidationSchema = z.object({
  body: z.object({
    service: z.string(),
    date: z.string().date(),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

export const SlotValidation = {
  slotValidationSchema,
};
