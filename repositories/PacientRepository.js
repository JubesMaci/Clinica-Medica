import Pacient from "../models/Pacient.js";

const getAllPacients = async () => {
  return await Pacient.find();
};

const getPacient = async (id) => {
  try {
    return await Pacient.findById(id);
  } catch (error) {
    throw new Error(error);
  }
};

const savePacient = async ({ name, birthDate, email, phone }) => {
  try {
    const pacient = new Pacient({
      name,
      birthDate,
      email,
      phone,
    });
    return await pacient.save();
  } catch (error) {
    throw error;
  }
};

const updatePacient = async (id, updateData) => {
  try {
    return await Pacient.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error) {
    throw new Error(error);
  }
};

const deletePacient = async (id) => {
  try {
    return await Pacient.findByIdAndDelete(id);
  } catch (error) {
    throw new Error(error);
  }
};

const pacientRepository = {
  getAllPacients,
  getPacient,
  savePacient,
  updatePacient,
  deletePacient,
};

export default pacientRepository;
