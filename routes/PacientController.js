import express from "express";
import pacientService from "../services/PacientService.js";

let router = express.Router();

function sendError(res, err) {
  const status = err.status || 500;
  const msg = err.message || "Internal Server Error";
  const detail = err.detail || err.errors || undefined;

  console.error("Erro na API:", err);

  return res.status(status).json({ error: msg, detail });
}

router.get("/getPacient/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pacient = await pacientService.getPacient(id);
    res.send(pacient);
  } catch (error) {
    sendError(res, error);
  }
});

router.get("/pacients", async (req, res) => {
  try {
    const pacients = await pacientService.getAllPacients();
    res.send(pacients);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post("/postPacient", async (req, res) => {
  try {
    const { name, birthDate, email, phone } = req.body;

    if (!name || !birthDate || !email || !phone) {
      const err = new Error("Dados de paciente incompletos.");
      err.status = 400;
      throw err;
    }

    const pacient = await pacientService.savePacient({
      name,
      birthDate,
      email,
      phone,
    });
    return res.status(201).json(pacient);
  } catch (error) {
    return sendError(res, error);
  }
});

router.put("/pacient/:id", async (req, res) => {
  const { id } = req.params;
  const { name, birthDate, email, phone } = req.body;
  try {
    const pacient = await pacientService.updatePacient(id, {
      name,
      birthDate,
      email,
      phone,
    });
    res.send(pacient);
  } catch (error) {
    sendError(res, error);
  }
});

router.delete("/pacient/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pacient = await pacientService.deletePacient(id);
    res.send(pacient);
  } catch (error) {
    sendError(res, error);
  }
});

export default router;
