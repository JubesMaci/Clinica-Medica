import appointmentRepository from "../repositories/AppointmentRepository.js";

const getAllAppointments = () => appointmentRepository.getAllAppointments();

const getAppointment = (id) => appointmentRepository.getAppointment(id);

const saveAppointment = ({ date, doctorId, patientId }) =>
  appointmentRepository.saveAppointment({ date, doctorId, patientId });

const updateAppointment = async (id, { date, doctorId, patientId }) => {
  return await appointmentRepository.updateAppointment(id, {
    date,
    doctorId,
    patientId,
  });
};

const deleteAppointment = (id) => appointmentRepository.deleteAppointment(id);

export default {
  getAllAppointments,
  getAppointment,
  saveAppointment,
  updateAppointment,
  deleteAppointment,
};
