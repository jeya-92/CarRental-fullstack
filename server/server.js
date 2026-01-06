import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";

import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express();

// ================= DB CONNECT =================
await connectDB();

// ================= CORS =================
// Only allow your Vercel frontend
app.use(
  cors({
    origin: "https://car-rental-fullstack-tawny.vercel.app",
    credentials: true,
  })
);

// ================= MIDDLEWARE =================
app.use(express.json());

// ================= WAKE / HEALTH CHECK =================
app.get("/ping", (req, res) => {
  res.status(200).send("Server is awake 🚀");
});

// ================= ROUTES =================
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/bookings", bookingRouter);

// ================= START SERVER =================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});