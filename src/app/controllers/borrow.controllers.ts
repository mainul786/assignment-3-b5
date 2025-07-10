import express, { Request, Response } from "express";
import { Borrow } from "../models/borrow.model";

export const borrowRoutes = express.Router();

borrowRoutes.post("/", async (req: Request, res: Response) => {
  try {
    const borrow = req.body;
    const result = await Borrow.create(borrow);
    res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

borrowRoutes.get("/all", async (req: Request, res: Response) => {
  try {
    const result = await Borrow.find();
    res.status(200).json({
      success: true,
      message: "All Book borrowed successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

borrowRoutes.get("/", async (req: Request, res: Response) => {
  try {
    const borrows = await Borrow.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      {
        $unwind: "$bookDetails",
      },

      {
        $group: {
          _id: "$bookDetails._id",
          totalQuantity: { $sum: "$quantity" },
          title: { $first: "$bookDetails.title" },
          isbn: { $first: "$bookDetails.isbn" },
        },
      },
      {
        $project: {
          book: {
            title: "$title",
            isbn: "$isbn",
          },
          totalQuantity: 1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Borrowed books summary retrieved successfully",
      data: borrows,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
});
