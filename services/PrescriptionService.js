import PrescriptionRepository from "../repositories/PrescriptionRepository.js";
import AppointmentService from "../services/AppointmentService.js";
import PatientService from "../services/AppointmentService.js";
import DoctorService from "../services/DoctorService.js";

import fs from "fs";
import PDFDocument from "pdfkit";


const getAllPrescriptions = async () => {
  return PrescriptionRepository.getAllPrescriptions();
};

const getPrescription = async (id) => {
  return PrescriptionRepository.getPrescription(id);
};

const savePrescription = async (data) => {
  const { date, appointmentId, medicine, dosage, instructions } = data;

  return PrescriptionRepository.savePrescription({
    date,
    appointmentId,
    medicine,
    dosage,
    instructions,
  });
};

const updatePrescription = async (
  id,
  { date, appointmentId, medicine, dosage, instructions }
) => {
  return PrescriptionRepository.updatePrescription(id, {
    date,
    appointmentId,
    medicine,
    dosage,
    instructions,
  });
};

const deletePrescription = async (id) => {
  return PrescriptionRepository.deletePrescription(id);
};

const generatePrescriptionFile = async (prescription) => {
  const appointment = await AppointmentService.getAllAppointments(
    prescription.appointmentId
  );
  const patient = await PatientService.getPatient(appointment.patientId);
  const doctor = await DoctorService.getDoctor(appointment.doctorId);

  const id = prescription._id;
  const document = new PDFDocument({ font: "Courier" });
  const filePath = "./MediaApp/prescriptions/" + id + ".pdf";

  document.pipe(fs.createWriteStream(filePath));
  document.fontSize(16).text("Patient name:" + patient.name);
  document.fontSize(16).text("Doctor name:" + doctor.name);

  const recipe = "Medicine: " + prescription.medicine;
  document.fontSize(12).text(recipe);

  document.fontSize(12).text("Dose: " + prescription.dose);
  document.fontSize(12).text("Instructions: " + prescription.instructions);

  document.end();
  return prescription;
};

const prescriptionService = {
  getAllPrescriptions,
  getPrescription,
  savePrescription,
  updatePrescription,
  deletePrescription,
  generatePrescriptionFile,
};

export default prescriptionService;
