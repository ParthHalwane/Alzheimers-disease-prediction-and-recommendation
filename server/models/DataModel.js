import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
    userId: String, // User ID (guest or logged-in user)
    bmi: Number,
    smoking: String, // "Yes" or "No"
    alcoholConsumption: String, // "Never", "Occasionally", "Daily"
    dietQuality: String, // "Poor" or "Good"
    sleepQuality: String, // "Poor" or "Good"
    diabetes: String // "Yes" or "No"
}, { collection: "patient_parameters" }); // Ensure correct collection name

export default mongoose.model("PatientParameter", DataSchema);
