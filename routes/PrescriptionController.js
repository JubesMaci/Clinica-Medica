import express from "express";
import prescriptionService from "../services/PrescriptionService.js";

let router = express.Router();

router.get("/prescription", async (req, res) => {
  try {
    const prescriptions = await prescriptionService.getAllPrescriptions();
    res.send(prescriptions);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.get("/getPrescription/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await prescriptionService.getPrescription(id);
    res.send(prescription);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.post("/postPrescription", async (req, res) => {
  const { date, appointmentId, medicine, dosage, instructions } = req.body;
  try {
    const prescription = await prescriptionService.savePrescription({
      date,
      appointmentId,
      medicine,
      dosage,
      instructions,
    });
    res.send(prescription);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.put("/prescription/:id", async (req, res) => {
  const { id } = req.params;
  const { date, appointmentId, medicine, dosage, instructions } = req.body;
  try {
    const prescription = await prescriptionService.updatePrescription(id, {
      date,
      appointmentId,
      medicine,
      dosage,
      instructions,
    });
    res.send(prescription);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

router.delete("/prescription/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await prescriptionService.deletePrescription(id);
    res.send(pres);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
