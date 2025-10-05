import express from "express";
import patientService from "../services/PatientService.js";

let router = express.Router();

function sendError(res, err) {
  const status = err.status || 500;
  const msg = err.message || "Internal Server Error";
  const detail = err.detail || err.errors || undefined;

  console.error("Erro na API:", err);

  return res.status(status).json({ error: msg, detail });
}

router.get("/getPatient/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await patientService.getPatient(id);
    res.send(patient);
  } catch (error) {
    sendError(res, error);
  }
});

router.get("/patients", async (req, res) => {
  try {
    const patients = await patientService.getAllPatients();
    res.send(patients);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/postPatient", async (req, res) => {
  try {
    const { name, birthDate, email, phone } = req.body;

    if (!name || !birthDate || !email || !phone) {
      const err = new Error("Dados de paciente incompletos.");
      err.status = 400;
      throw err;
    }

    const patient = await patientService.savePatient({
      name,
      birthDate,
      email,
      phone,
    });
    return res.status(201).json(patient);
  } catch (error) {
    return sendError(res, error);
  }
});

router.put("/patient/:id", async (req, res) => {
  const { id } = req.params;
  const { name, birthDate, email, phone } = req.body;
  try {
    const patient = await patientService.updatePatient(id, {
      name,
      birthDate,
      email,
      phone,
    });
    res.send(patient);
  } catch (error) {
    sendError(res, error);
  }
});

router.delete("/patient/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await patientService.deletePatient(id);
    res.send(patient);
  } catch (error) {
    sendError(res, error);
  }
});

export default router;
