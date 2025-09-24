import mongoose from "mongoose";

const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
  date: {
    type: Date,
    required: [true, "Appointment date is required"],
  },
  doctorId: {
    type: String,
    required: [true, "Doctor Id is required"],
  },
  pacientId: {
    type: String,
    required: [true, "Pacient Id is required"],
  },
  creatAt: {
    type: Date,
    default: Date.now,
  },
});

const appointment = mongoose.model("Appointment", appointmentSchema);
export default appointment;
