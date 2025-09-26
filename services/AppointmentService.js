import appointmentRepository from "../repositories/AppointmentRepository.js";

const getAllAppointments = () => appointmentRepository.getAllAppointments();

const getAppointment = (id) => appointmentRepository.getAppointment(id);

const saveAppointment = ({ date, doctorId, pacientId }) =>
  appointmentRepository.saveAppointment({ date, doctorId, pacientId });

const updateAppointment = async (id, { date, doctorId, pacientId }) => {
  return await appointmentRepository.updateAppointment(id, {
    date,
    doctorId,
    pacientId,
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
