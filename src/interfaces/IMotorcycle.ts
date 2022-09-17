import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

export const motorcycleZodSchema = vehicleZodSchema.merge(z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number({
    invalid_type_error: 'engineCapacity must be a number',
  }).lte(2500, {
    message: 'engineCapacity cannot be greater than 2500',
  }).positive(),
}));

export type IMotorcycle = z.infer<typeof motorcycleZodSchema>;
