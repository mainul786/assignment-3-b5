import { model, Schema } from "mongoose";
import { IBook, IBookModelType } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, IBookModelType>(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

bookSchema.static("updateCopies", async function (bookId: string, qty: number) {
  const book = await this.findById(bookId);
  if (!book) throw new Error("Book not Found");
  if (book.copies < qty) {
    throw new Error("Not enough copies available");
  }
  book.copies -= qty;
  if (book.copies === 0) book.available = false;
  await book.save();
  return book;
});
export const Book = model<IBook, IBookModelType>("Book", bookSchema);
