import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import doctorRoute from "./Routes/doctor.js";
import reviewRoute from "./Routes/review.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send(`Api is working`);
});

//MONGO
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB is connected`);
  } catch (error) {
    console.log(error.messages);
  }
};
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api/v1/auth", authRoute); //register, login
app.use("/api/v1/users", userRoute); //crud user
app.use("/api/v1/doctors", doctorRoute); //crud doctor
app.use("/api/v1/reviews", reviewRoute); //crud review

app.listen(port, () => {
  connectDB();
  console.log(`Server is running http://localhost:${port} `);
});
