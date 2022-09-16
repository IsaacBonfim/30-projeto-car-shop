import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

export const carZodSchema = vehicleZodSchema.merge(z.object({
  doorsQty: z.number({
    invalid_type_error: 'doorsQty must be a number',
  }).int().gte(2, {
    message: 'doorsQty must be greater than or equal to 2',
  }).lte(4, {
    message: 'doorsQty cannot be greater than 4',
  }),
  seatsQty: z.number({
    invalid_type_error: 'seatsQty must be a number',
  }).int().gte(2, {
    message: 'seatsQty must be greater than or equal to 2',
  }).lte(7, {
    message: 'seatsQty cannot be greater than 7',
  }),
}));

export type ICar = z.infer<typeof carZodSchema>;
