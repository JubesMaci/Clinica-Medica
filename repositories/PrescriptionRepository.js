import Prescription from "../models/Prescription.js";
import mongoose from "mongoose";

const getAllPrescriptions = async () => {
  return await Prescription.find();
};

const getPrescription = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw new Error("Invalid id");
  return await Prescription.findById(id);
};

const savePrescription = async ({
  date,
  appointmentId,
  medicine,
  dosage,
  instructions,
}) => {
  const prescription = new Prescription({
    date,
    appointmentId,
    medicine,
    dosage,
    instructions,
  });
  return await prescription.save(); // <-- aqui era Prescription.save()
};

const updatePrescription = async (id, updateData) => {
  if (!mongoose.isValidObjectId(id)) throw new Error("Invalid id");
  return await Prescription.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

const deletePrescription = async (id) => {
  if (!mongoose.isValidObjectId(id)) throw new Error("Invalid id");
  return await Prescription.findByIdAndDelete(id);
};

const prescriptionRepository = {
  getAllPrescriptions,
  getPrescription,
  savePrescription,
  updatePrescription,
  deletePrescription,
};

export default prescriptionRepository;
