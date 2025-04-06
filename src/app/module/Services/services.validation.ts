import { z } from 'zod';

export const createServiceValidationSchema = z.object({
  body: z.object({
    serviceName: z.string({
      required_error: 'Service name is required',
    }),
    shortDescription: z.string({
      required_error: 'Short description is required',
    }),
    fullDescription: z.string({
      required_error: 'Full description is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    duration: z.string({
      required_error: 'Duration is required',
    }),
    durationNote: z.string({
      required_error: 'Duration note is required',
    }),
    features: z.array(z.string(), {
      required_error: 'Features are required',
    }),
    serviceInludes: z.array(z.string(), {
      required_error: 'Service includes are required',
    }),
    processSteps: z.array(z.string(), {
      required_error: 'Process steps are required',
    }),
    tags: z.array(z.string()).optional(),
    bookingURL: z.string().optional(),
    questionURL: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    urlSlug: z.string().optional(),
  }),
});
