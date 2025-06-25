import express, { Application, NextFunction, Request, Response } from "express";
import { bookRoutes } from "./app/controllers/book.controllers";
import { borrowRoutes } from "./app/controllers/borrow.controllers";
const app: Application = express();
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});
app.get("/test-error", (req: Request, res: Response) => {
  throw new Error(" through generic error");
});
// route not found handling
app.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// Global Error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.name === "ValidationError") {
    res.status(400).json({
      message: "Validation failed",
      success: false,
      error: err,
    });
  }
});
export default app;
