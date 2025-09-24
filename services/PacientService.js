import PacientRepository from "../repositories/PacientRepository.js";

const getAllPacients = async () => {
  return PacientRepository.getAllPacients();
};

const getPacient = async (id) => {
  return PacientRepository.getPacient(id);
};

const savePacient = async (data) => {
  const { name, birthDate, email, phone } = data;

  return PacientRepository.savePacient({
    name,
    birthDate,
    email,
    phone,
  });
};

const updatePacient = async (id, { name, birthDate, email, phone }) => {
  return PacientRepository.updatePacient(id, {
    name,
    birthDate,
    email,
    phone,
  });
};

const deletePacient = async (id) => {
  return PacientRepository.deletePacient(id);
};

const pacientService = {
  getAllPacients,
  getPacient,
  savePacient,
  updatePacient,
  deletePacient,
};

export default pacientService;
