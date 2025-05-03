import { z } from 'zod'

export const hospitalProfileSchema = z.object({
  hospitalName: z.string().min(2, {
    message: 'Hospital name must be at least 2 characters.',
  }),
  country: z.string({
    required_error: 'Please select a country.',
  }),
  state: z.string().optional(),
  address: z.string().min(5, {
    message: 'Address must be at least 5 characters.',
  }),
  phoneNumber: z.string().min(5, {
    message: 'Phone number is required.',
  }),
  website: z.string().url().optional().or(z.literal('')),
  registrationNumber: z.string().optional(),
})

export const operationsSchema = z.object({
  workingDays: z.array(z.string()).min(1, {
    message: 'Select at least one working day.',
  }),
  openingHours: z.string({
    required_error: 'Please select opening hours.',
  }),
  closingHours: z.string({
    required_error: 'Please select closing hours.',
  }),
})

export const specializationsSchema = z.object({
  specializations: z.array(z.string()).min(1, {
    message: 'Add at least one specialization.',
  }),
})

export type HospitalProfile = z.infer<typeof hospitalProfileSchema>
export type Operations = z.infer<typeof operationsSchema>
export type Specializations = z.infer<typeof specializationsSchema>
