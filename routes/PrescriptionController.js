import express from "express";
import prescriptionService from "../services/PrescriptionService.js";

let router = express.Router();

function sendError(res, err) {
  const status = err.status || 500;
  const msg = err.message || "Internal Server Error";
  const detail = err.detail || err.errors || undefined;

  console.error("Erro na API:", err);

  return res.status(status).json({ error: msg, detail });
}

router.get("/prescriptions", async (req, res) => {
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
    sendError(res, error);
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
    res.send(prescription);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
