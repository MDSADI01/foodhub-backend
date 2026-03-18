import { auth } from "./../../lib/auth";
import express, { Application } from "express";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
// import { userAuthRoutes } from "../authentication/authentication.route";
import { providerRoutes } from "../provider/provider.route";

import { mealRoutes } from "../meal/meal.route";

import { orderRoutes } from "../order/order.route";
import { getProviderRoutes } from "../getProviders/getProv.route";
import { categoryRoutes } from "../categories/categories.route";
import { adminRoutes } from "../admin/admin.route";
import { reviewRouter } from "../review/review.route";
import { profileRoute } from "../manageProfile/profile.route";

// import { categoryRoutes } from '../category/category.route';

const app: Application = express();
app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Sadi");
});

// app.use("/api/auth", userAuthRoutes);
app.all('/api/auth/*splat', toNodeHandler(auth));
app.use("/api/provider", providerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/providers", getProviderRoutes);
app.use("/api/reviews", reviewRouter);
app.use("/api/profile",profileRoute);

export default app;
