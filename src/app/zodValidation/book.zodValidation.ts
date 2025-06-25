import { z } from "zod";

export const bookValidationSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .trim(),

  author: z
    .string({
      required_error: "Author is required",
    })
    .min(5, "Minimum 5 character allowed!")
    .max(50, "Maximum 50 character allowed!"),

  genre: z.enum(
    ["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"],
    {
      required_error: "Genre is required",
    }
  ),

  isbn: z.string({
    required_error: "ISBN is required",
  }),

  description: z.string({
    required_error: "Description is required",
  }),

  copies: z
    .number({
      required_error: "Copies is required",
    })
    .int("Copies must be an integer")
    .min(0, "Copies can't be negative"),

  available: z.boolean().optional(),
});

export const updateBookValidationSchema = z.object({
  title: z.string().trim().optional(),

  author: z
    .string()
    .min(5, "Minimum 5 character allowed!")
    .max(50, "Maximum 50 character allowed!")
    .optional(),

  genre: z
    .enum([
      "FICTION",
      "NON_FICTION",
      "SCIENCE",
      "HISTORY",
      "BIOGRAPHY",
      "FANTASY",
    ])
    .optional(),

  isbn: z.string().optional(),

  description: z.string().optional(),

  copies: z
    .number()
    .int("Copies must be an integer")
    .min(0, "Copies can't be negative")
    .optional(),

  available: z.boolean().optional(),
});
