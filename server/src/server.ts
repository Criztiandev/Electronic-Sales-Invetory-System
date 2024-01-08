import express, { Express, Request, Response, NextFunction } from "express";
import dotnevn from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";

// General Routes
import authRoute from "./modules/auth/auth.routes.ts";
import accountRoute from "./modules/account/account.routes.ts";

// admin routes
import userRoute from "./modules/users/user.routes.ts";
import productRoute from "./modules/products/product.routes.ts";

// user routes
import orderRoute from "./modules/order/order.routes.ts";

import { connectDB } from "./config/connectDb.ts";
import { errorHandler, notFound } from "./middleware/error.middlewares.ts";
import authMiddleware from "./middleware/auth.middleware.ts";

// Init
dotnevn.config();
connectDB();
const app: Express = express();
const PORT: string | number = process.env.PORT || 5000;

// middlewares

app.use(cors({ origin: process.env.BASE_URL, credentials: true }));
app.use(helmet());
app.use(cookieParser());
app.use(compression());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Image
app.use("/api/upload", express.static("public"));

// Middleware
const { authenticateUser, requireAdmin, requireUser } = authMiddleware;

app.use("/api/auth", authRoute);

// User Routes
app.use("/api/order", [authenticateUser, requireUser], orderRoute);

// Admin Routes
app.use("/api/users", [authenticateUser, requireAdmin], userRoute);
app.use("/api/products", [authenticateUser, requireAdmin], productRoute);
app.use("/api/account", [authenticateUser, requireAdmin], accountRoute);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is Running on PORT:${PORT}`));
