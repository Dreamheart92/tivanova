import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address',
    }),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password shouldn\t be more than 20 characters'),
})

export type LoginSchemaType = z.infer<typeof loginSchema>;

export type LoginSchemaErrorType = z.inferFlattenedErrors<typeof loginSchema>;

export const signupSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password shouldn\'t be more than 20 characters'),
    confirmPassword: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password shouldn\'t be more than 20 characters'),
    firstName: z.string()
        .min(2, 'First name must be at least 2 characters')
        .max(20, 'First name shouldn\'t be more than 20 characters'),
    lastName: z.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(20, 'Last name shouldn\'t be more than 20 characters'),
    phone: z.string().length(13, 'Phone is incorrect'),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords doesn\'t match',
    path: ['confirmPassword'],
})

export type SignupSchemaType = z.infer<typeof signupSchema>;

export type SignupSchemaErrorType = z.inferFlattenedErrors<typeof signupSchema>;

export const updateCustomerSchema = z.object({
    email: z.string().email({
        message: 'Invalid email address'
    }),
    firstName: z.string()
        .min(2, 'First name must be at least 2 characters')
        .max(20, 'First name shouldn\'t be more than 20 characters'),
    lastName: z.string()
        .min(2, 'Last name must be at least 2 characters')
        .max(20, 'Last name shouldn\'t be more than 20 characters'),
    phone: z.string().length(13, 'Phone is incorrect'),
})

export type UpdateCustomerSchemaType = z.infer<typeof updateCustomerSchema>;

export type UpdateCustomerSchemaErrorType = z.inferFlattenedErrors<typeof updateCustomerSchema>;

export const changePasswordSchema = z.object({
    password: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password shouldn\'t be more than 20 characters'),
    newPassword: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password shouldn\'t be more than 20 characters'),
    confirmPassword: z.string()
        .min(6, 'Password must be at least 6 characters')
        .max(20, 'Password shouldn\'t be more than 20 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords doesn\'t match',
    path: ['confirmPassword'],
})

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

export type ChangePasswordSchemaErrorType = z.inferFlattenedErrors<typeof changePasswordSchema>;
