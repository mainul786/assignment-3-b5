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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        min: [5, "Minimum 5 charecter allowed!"],
        max: [50, "Maximum 50 charecter allowed!"],
    },
    genre: {
        type: String,
        requried: true,
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
    },
    isbn: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    copies: {
        type: Number,
        reququed: true,
        min: [0, "Copies can`t negetive no."],
        validate: {
            validator: Number.isInteger,
            message: "copies must be integer",
        },
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    versionKey: false,
    timestamps: true,
});
bookSchema.static("updateCopies", function (bookId, qty) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        if (!book)
            throw new Error("Book not Found");
        if (book.copies < qty) {
            throw new Error("Not enough copies available");
        }
        book.copies -= qty;
        if (book.copies === 0)
            book.available = false;
        yield book.save();
        return book;
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
