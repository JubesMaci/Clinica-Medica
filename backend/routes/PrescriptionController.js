import express from "express";
import prescriptionService from "../services/PrescriptionService.js";
import multer from "multer";
import path from "path";
import process from "process";

let router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ".MediApp/prescriptions/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/uploadPrescription/:id",
  upload.single("file"),
  async (req, res) => {
    try {
      const { id } = req.params;
      let prescription = await prescriptionService.getPrescription(id);
      const file = "./MediApp/prescriptions/" + req.file.originalname;
      prescription = await prescriptionService.updatePrescription(id, { file });

      res.status(200).send(prescription);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
);

router.get("/readPrescription/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prescription = await prescriptionService.getPrescription(id);
    let filePath = path.resolve(process, cwd() + "/../" + prescription.file);
    res.status(200).sendFile(filePath);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

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

router.get("/generatePrescription/:id", async (req, res) => {
  try {
    const prescription = await prescriptionService.getPrescription(id);
    const generatePrescription =
      await prescriptionService.generatePrescriptionFile(prescription);
    res.send(generatePrescription);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

export default router;
