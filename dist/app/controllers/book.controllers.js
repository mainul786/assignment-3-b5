"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const book_zodValidation_1 = require("../zodValidation/book.zodValidation");
exports.bookRoutes = express_1.default.Router();
exports.bookRoutes.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_zodValidation_1.bookValidationSchema.parseAsync(req.body);
        const result = yield book_model_1.Book.create(book);
        res.status(200).json({
            success: true,
            message: "Book created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}));
exports.bookRoutes.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { genre, title, author, sortBy = "createAt", order = "desc", page, limit, } = req.query;
        const filter = {};
        if (genre && typeof genre === "string") {
            filter.genre = { $regex: genre, $options: "i" };
        }
        if (title && typeof title === "string") {
            filter.title = { $regex: title, $options: "i" };
        }
        if (author && typeof author === "string") {
            filter.author = { $regex: author, $options: "i" };
        }
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 0;
        const skip = (pageNumber - 1) * limitNumber;
        let query = book_model_1.Book.find(filter).sort({
            [sortBy]: order === "asc" ? 1 : -1,
        });
        if (limitNumber > 0) {
            query = query.skip(skip).limit(limitNumber);
        }
        const result = yield query;
        res.status(200).json({
            success: true,
            message: "Books retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}));
exports.bookRoutes.get("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const result = yield book_model_1.Book.findById(bookId);
        res.status(200).json({
            success: true,
            message: "Book retrieved successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}));
exports.bookRoutes.put("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_zodValidation_1.updateBookValidationSchema.parseAsync(req.body);
        const bookId = req.params.bookId;
        const result = yield book_model_1.Book.findByIdAndUpdate(bookId, book, { new: true });
        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}));
exports.bookRoutes.delete("/:bookId", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookId = req.params.bookId;
        const result = yield book_model_1.Book.findByIdAndDelete(bookId);
        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        });
    }
}));
