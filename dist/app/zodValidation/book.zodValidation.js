"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookValidationSchema = exports.bookValidationSchema = void 0;
const zod_1 = require("zod");
exports.bookValidationSchema = zod_1.z.object({
    title: zod_1.z
        .string({
        required_error: "Title is required",
    })
        .trim(),
    author: zod_1.z
        .string({
        required_error: "Author is required",
    })
        .min(5, "Minimum 5 character allowed!")
        .max(50, "Maximum 50 character allowed!"),
    genre: zod_1.z.enum(["FICTION", "NON_FICTION", "SCIENCE", "HISTORY", "BIOGRAPHY", "FANTASY"], {
        required_error: "Genre is required",
    }),
    isbn: zod_1.z.string({
        required_error: "ISBN is required",
    }),
    description: zod_1.z.string({
        required_error: "Description is required",
    }),
    copies: zod_1.z
        .number({
        required_error: "Copies is required",
    })
        .int("Copies must be an integer")
        .min(0, "Copies can't be negative"),
    available: zod_1.z.boolean().optional(),
});
exports.updateBookValidationSchema = zod_1.z.object({
    title: zod_1.z.string().trim().optional(),
    author: zod_1.z
        .string()
        .min(5, "Minimum 5 character allowed!")
        .max(50, "Maximum 50 character allowed!")
        .optional(),
    genre: zod_1.z
        .enum([
        "FICTION",
        "NON_FICTION",
        "SCIENCE",
        "HISTORY",
        "BIOGRAPHY",
        "FANTASY",
    ])
        .optional(),
    isbn: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    copies: zod_1.z
        .number()
        .int("Copies must be an integer")
        .min(0, "Copies can't be negative")
        .optional(),
    available: zod_1.z.boolean().optional(),
});
