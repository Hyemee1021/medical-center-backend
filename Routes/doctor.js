import express from "express";
import {
  updateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctor,
  getDoctorProfile,
} from "../Controllers/doctorController.js";

import { authenticate, restrict } from "../auth/verifyToken.js";

import reviewRouter from "./review.js";

const router = express.Router();

//nested route
router.use("/:doctorId/reviews", reviewRouter);

router.get("/:id", getSingleDoctor);
router.get("/", getAllDoctor);

router.put("/:id", authenticate, updateDoctor);

router.delete("/:id", authenticate, deleteDoctor);

router.get(`/profile/me`, authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;
