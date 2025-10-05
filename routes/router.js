import bcrypt from "bcryptjs";
import express from "express";
import appointmentController from "./AppointmentController.js";
import doctorController from "./DoctorController.js";
import patientController from "./PatientController.js";
import prescriptionController from "./PrescriptionController.js";

let router = express.Router();

router.get("/", function (req, res) {
  console.log("hi!");
  res.status(200).json({ message: "hi!" });
});

router.use("/", doctorController);
router.use("/", appointmentController);
router.use("/", patientController);
router.use("/", prescriptionController);

export default router;
