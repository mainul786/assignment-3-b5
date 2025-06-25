import express, { Request, Response } from "express";

import { IBook } from "../interfaces/book.interface";
import { Book } from "../models/book.model";

export const bookRoutes = express.Router();

bookRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const book = req.body;

    const result = await Book.create(book);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Book created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
bookRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const {
      genre,
      title,
      author,
      sortBy = "createAt",
      order = "desc",
      page,
      limit,
    } = req.query;
    const filter: Partial<Record<keyof IBook, any>> = {};
    if (genre && typeof genre === "string") {
      filter.genre = { $regex: genre, $options: "i" };
    }
    if (title && typeof title === "string") {
      filter.title = { $regex: title, $options: "i" };
    }
    if (author && typeof author === "string") {
      filter.author = { $regex: author, $options: "i" };
    }

    const pageNumber = parseInt(page as string) || 1;
    const limitNumber = parseInt(limit as string) || 0;
    const skip = (pageNumber - 1) * limitNumber;

    let query = Book.find(filter).sort({
      [sortBy as string]: order === "asc" ? 1 : -1,
    });
    if (limitNumber > 0) {
      query = query.skip(skip).limit(limitNumber);
    }

    const result = await query;

    res.status(200).json({
      success: true,
      message: "Books retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

bookRoutes.get("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const result = await Book.findById(bookId);
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
bookRoutes.put("/:bookId", async (req: Request, res: Response) => {
  try {
    const book = req.body;
    const bookId = req.params.bookId;
    const result = await Book.findByIdAndUpdate(bookId, book, { upsert: true });
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});

bookRoutes.delete("/:bookId", async (req: Request, res: Response) => {
  try {
    const bookId = req.params.bookId;
    const result = await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
