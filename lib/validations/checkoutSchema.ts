import {z} from 'zod';

export const shippingAddressSchema = z.object({
    countryCode: z.string().min(1, 'Country is required'),
    firstName: z.string().min(1, 'First name must be at least 1 character long').max(50, 'First name cannot exceed 56 characters'),
    lastName: z.string().min(1, 'Last name must be at least 1 character long').max(50, 'Last name cannot exceed 56 characters'),
    address1: z.string().min(5, 'Address must be at least 5 characters long').max(200, 'Address cannot exceed 56 characters'),
    address2: z.string().optional(),
    zip: z.string().min(4, 'Postal code must be at least 4 characters long').max(10, 'Postal code cannot exceed 10 characters'),
    city: z.string().min(2, 'City must be at least 2 characters long').max(50, 'City cannot exceed 50 characters'),
    phone: z.string().length(13, 'Phone is incorrect').startsWith('+359', 'Invalid format. +359XXXXXXXXX'),
    email: z.string().email('Invalid email address').optional(),
})

export type ShippingAddressSchemaType = z.infer<typeof shippingAddressSchema>;

export type ShippingAddressSchemaErrorType = z.inferFlattenedErrors<typeof shippingAddressSchema>;

export const shippingMethodSchema = z.object({
    shippingMethod: z.string().min(1, 'Shipping method is required')
})

export type ShippingMethodSchemaType = z.infer<typeof shippingMethodSchema>;

export type ShippingMethodSchemaErrorType = z.inferFlattenedErrors<typeof shippingMethodSchema>;
