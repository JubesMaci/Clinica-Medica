import PatientRepository from "../repositories/PatientRepository.js";

const getAllPatients = async () => {
  return PatientRepository.getAllPatients();
};

const getPatient = async (id) => {
  return PatientRepository.getPatient(id);
};

const savePatient = async (data) => {
  const { name, birthDate, email, phone } = data;

  return PatientRepository.savePatient({
    name,
    birthDate,
    email,
    phone,
  });
};

const updatePatient = async (id, { name, birthDate, email, phone }) => {
  return PatientRepository.updatePatient(id, {
    name,
    birthDate,
    email,
    phone,
  });
};

const deletePatient = async (id) => {
  return PatientRepository.deletePatient(id);
};

const patientService = {
  getAllPatients,
  getPatient,
  savePatient,
  updatePatient,
  deletePatient,
};

export default patientService;
