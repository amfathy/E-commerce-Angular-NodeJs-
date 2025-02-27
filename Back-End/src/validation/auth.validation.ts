import { object , z } from "zod";

const addressSchema = z.object({
  street: z.string().min(1, "Street is required").trim(),
  city: z.string().min(1, "City is required").trim(),
  state: z.string().min(1, "State is required").trim(),
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format"),
});

const userRegisterValidator = z.object({
  body : object({
    name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters")
    .trim(),

  email: z
    .string()
    .email("Invalid email address format")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

role: z.enum(["Admin", "User", "Guest"]).default("Guest"),

  address: addressSchema,

  phone: z
    .string()
    //.regex(/^\+?\d{10,15}$/, "Invalid phone number format"),    coz generating fake fomat by seed
  }),

  created_at: z.date().default(() => new Date()),
  updated_at: z.date().default(() => new Date()),
});

export const loginValidation = z.object({
  body : object({
  password: z
    .string()
    .min(8, "pass must be at least 3 characters")
    .max(50, "pass must not exceed 50 characters")
    .trim(),

  email: z
    .string()
    .email("Invalid email address format")
    .trim()
    .toLowerCase(),
  })
});


export const registerValidation = userRegisterValidator.omit({
  created_at: true,
  updated_at: true,
});


