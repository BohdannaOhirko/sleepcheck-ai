import { z } from 'zod';

// Схема валідації для форми контактів
export const contactFormSchema = z.object({
  name: z
    .string()
    .min(1, "Ім'я обов'язкове")
    .min(2, "Ім'я має містити мінімум 2 символи")
    .max(50, "Ім'я занадто довге (максимум 50 символів)")
    .regex(
      /^[а-яА-ЯіІїЇєЄґҐa-zA-Z\s'-]+$/,
      "Ім'я може містити тільки літери, пробіли, дефіс та апостроф"
    ),

  phone: z
    .string()
    .min(1, "Телефон обов'язковий")
    .regex(
      /^\+380\d{9}$/,
      "Невірний формат телефону. Використовуйте формат: +380XXXXXXXXX"
    ),

  email: z
    .string()
    .email("Невірний формат email")
    .optional()
    .or(z.literal('')),

  specialist: z
    .string()
    .min(1, "Оберіть тип консультації"),

  message: z
    .string()
    .max(1000, "Повідомлення занадто довге (максимум 1000 символів)")
    .optional(),
});

// TypeScript тип на основі схеми
export type ContactFormData = z.infer<typeof contactFormSchema>;
// Схема валідації для модального вікна запису
export const bookingFormSchema = z.object({
  name: z
    .string()
    .min(1, "Ім'я обов'язкове")
    .min(2, "Ім'я має містити мінімум 2 символи")
    .max(50, "Ім'я занадто довге (максимум 50 символів)")
    .regex(
      /^[а-яА-ЯіІїЇєЄґҐa-zA-Z\s'-]+$/,
      "Ім'я може містити тільки літери, пробіли, дефіс та апостроф"
    ),

  phone: z
    .string()
    .min(1, "Телефон обов'язковий")
    .regex(
      /^\+380\d{9}$/,
      "Невірний формат телефону. Використовуйте формат: +380XXXXXXXXX"
    ),

  email: z
    .string()
    .email("Невірний формат email")
    .optional()
    .or(z.literal('')),

  comment: z
    .string()
    .max(500, "Коментар занадто довгий (максимум 500 символів)")
    .optional(),
});

// TypeScript тип
export type BookingFormData = z.infer<typeof bookingFormSchema>;