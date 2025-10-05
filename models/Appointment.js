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
    validate: {
      validator: function (v) {
        const id = new mongoose.Types.ObjectId(v);
        return Doctor.exists(_id);
      },
      message: (props) => `Doctor Id${props.value} not found`,
    },
  },
  patientId: {
    type: String,
    required: [true, "Patient Id is required"],
    validate: {
      validator: function (v) {
        const id = new mongoose.Types.ObjectId(v);
        return Patient.exists(_id);
      },
      message: (props) => `Patient Id${props.value} not found`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const appointment = mongoose.model("Appointment", appointmentSchema);
export default appointment;
