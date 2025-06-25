"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("./app/controllers/book.controllers");
const borrow_controllers_1 = require("./app/controllers/borrow.controllers");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/books", book_controllers_1.bookRoutes);
app.use("/api/borrow", borrow_controllers_1.borrowRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/test-error", (req, res) => {
    throw new Error(" through generic error");
});
// route not found handling
app.use("*", (req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});
// Global Error handling
app.use((err, req, res, next) => {
    if (err.name === "ValidationError") {
        res.status(400).json({
            message: "Validation failed",
            success: false,
            error: err,
        });
    }
});
exports.default = app;
