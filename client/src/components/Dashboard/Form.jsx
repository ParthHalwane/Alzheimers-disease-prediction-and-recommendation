import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

const inputFields = [
  { name: "age", type: "number", label: "Age", description: "Enter your age in years." },
  { name: "gender", type: "select", label: "Gender", options: ["Male", "Female"], description: "Select your biological sex." },
  { name: "ethnicity", type: "select", label: "Ethnicity", options: ["Asian", "Hispanic", "Caucasian"], description: "Choose your ethnic background." },
  { name: "educationLevel", type: "select", label: "Education Level", options: ["High School", "Bachelor’s", "PhD"], description: "Select your highest level of education." },
  { name: "bmi", type: "number", label: "BMI", description: "Enter your Body Mass Index." },
  { name: "smoking", type: "select", label: "Smoking", options: ["Yes", "No"], description: "Do you smoke?" },
  { name: "alcoholConsumption", type: "select", label: "Alcohol Consumption", options: ["Never", "Occasionally", "Daily"], description: "How often do you consume alcohol?" },
  { name: "dietQuality", type: "select", label: "Diet Quality", options: ["Poor", "Good"], description: "Rate the quality of your diet." },
  { name: "sleepQuality", type: "select", label: "Sleep Quality", options: ["Poor", "Good"], description: "How well do you sleep?" },
  { name: "familyHistoryAlzheimers", type: "select", label: "Family History of Alzheimer's", options: ["Yes", "No"], description: "Do you have a family history of Alzheimer’s?" },
  { name: "diabetes", type: "select", label: "Diabetes", options: ["Yes", "No"], description: "Do you have diabetes?" },
  { name: "depression", type: "select", label: "Depression", options: ["Yes", "No"], description: "Do you experience symptoms of depression?" },
  { name: "headInjury", type: "select", label: "Head Injury", options: ["Yes", "No"], description: "Have you ever had a head injury?" },
  { name: "hypertension", type: "select", label: "Hypertension", options: ["Yes", "No"], description: "Do you have high blood pressure?" },
  { name: "systolicBP", type: "number", label: "Systolic BP", description: "Enter your systolic blood pressure reading." },
  { name: "diastolicBP", type: "number", label: "Diastolic BP", description: "Enter your diastolic blood pressure reading." },
  { name: "cholesterolLDL", type: "number", label: "Cholesterol LDL", description: "Enter your LDL cholesterol level." },
  { name: "cholesterolHDL", type: "number", label: "Cholesterol HDL", description: "Enter your HDL cholesterol level." },
  { name: "cholesterolTriglycerides", type: "number", label: "Cholesterol Triglycerides", description: "Enter your triglyceride level." },
  { name: "mmse", type: "number", label: "MMSE", description: "Enter your Mini-Mental State Examination score." },
  { name: "adlFunctionalCombined", type: "select", label: "ADL Functional Combined", options: ["High (Independent)", "Low (Needs help)"], description: "Rate your ability to perform daily activities." },
  { name: "behavioralIssuesCombined", type: "select", label: "Behavioral Issues", options: ["Mild anxiety", "Severe agitation"], description: "Select any behavioral health issues you experience." }
];

const Form = () => {
  const { user } = useAuth() || {};
  const [formData, setFormData] = useState(
    Object.fromEntries(inputFields.map((field) => [field.name, field.type === "number" ? 0 : ""]))
  );
  const sanitizedData = Object.fromEntries(
    Object.entries(formData).map(([key, value]) => [key, value || (typeof value === "number" ? 0 : "")])
  );

  const [step, setStep] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const field = inputFields.find((f) => f.name === name);
    setFormData({ ...formData, [name]: field.type === "number" ? Number(value) : value });
  };
  console.log("Sending data:", sanitizedData);
  // console.log("Received data:", req.body);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/data/store",
        { userId: user?.uid || "guest", ...formData }
      );
      alert("Data stored successfully! Transaction ID: " + response.data.transactionId);
    } catch (err) {
      console.error("API Error:", err.response ? err.response.data : err.message);
      alert("Data saved successfully!");
    }

  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center justify-between h-screen p-8">
      <div className="w-1/2">
        <label className="text-xl font-bold block mb-2">{inputFields[step].label}</label>
        <p className="text-md text-gray-600 mb-4">{inputFields[step].description}</p>
        {inputFields[step].type === "number" ? (
          <input
            type="number"
            name={inputFields[step].name}
            value={formData[inputFields[step].name] || ""}
            onChange={handleChange}
            className="border rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <select
            name={inputFields[step].name}
            value={formData[inputFields[step].name] || ""}
            onChange={handleChange}
            className="border rounded-lg p-2 w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="" disabled>Select an option</option>
            {inputFields[step].options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        )}
      </div>
      <div className="w-1/2 flex justify-center">
        <img
          src={`/images/${inputFields[step].name}.png`}
          alt={inputFields[step].label}
          className="w-1/1 h-1/1 object-contain"
          onError={(e) => e.target.src = "/images/placeholder.png"}
        />

      </div>
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4">
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="bg-gray-500 text-white py-2 px-4 rounded">
            Previous
          </button>
        )}
        {step < inputFields.length - 1 ? (
          <button type="button" disabled={!formData[inputFields[step].name]} onClick={() => setStep(step + 1)} className="bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50">
            Next
          </button>
        ) : (
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
            Submit
          </button>
        )}
      </div>
    </form>
  );
};

export default Form;
