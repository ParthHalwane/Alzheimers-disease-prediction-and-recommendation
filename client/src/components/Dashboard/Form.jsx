import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../../authContext";

const inputFields = [
  { name: "bmi", type: "number", label: "BMI", description: "Enter your Body Mass Index." },
  { name: "smoking", type: "select", label: "Smoking", options: ["Yes", "No"], description: "Do you smoke?" },
  { name: "alcoholConsumption", type: "select", label: "Alcohol Consumption", options: ["Never", "Occasionally", "Daily"], description: "How often do you consume alcohol?" },
  { name: "dietQuality", type: "select", options: ["0", "1", "2" ,"3", "4","5","6","7","8","9","10"], label: "Diet Quality", description: "Rate the quality of your diet." },
  { name: "sleepQuality", type: "select", options: ["4","5","6","7","8","9","10"], label: "Sleep Quality", description: "How well do you sleep?" },
  { name: "diabetes", type: "select", label: "Diabetes", options: ["Yes", "No"], description: "Do you have diabetes?" }
];

const Form = () => {
  const { user } = useAuth() || {};
  const [formData, setFormData] = useState({});
  const [recommendations, setRecommendations] = useState({}); // Updated instantly
  const [finalRecommendations, setFinalRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to generate recommendations dynamically
  const generateRecommendations = (parameters) => {
    let recs = {};

    // BMI Recommendations
    if (parameters.bmi) {
      if (parameters.bmi < 18.5) {
        recs["BMI"] = "Your BMI is below 18.5, which is considered underweight.\n" +
          "1. Eat Nutritious Snacks: Peanut butter with crackers, protein bars, trail mix, pita chips with hummus.\n" +
          "2. Have Small Meals More Often.\n" +
          "3. Add Extra Calories: Nuts, seeds, nut butter.\n" +
          "4. Avoid Unhealthy Junk Food.";
      } else if (parameters.bmi >= 25 && parameters.bmi < 30) {
        recs["BMI"] = "Your BMI is between 25 and 29.9, which is considered overweight.\n" +
          "• Improve Your Diet: Eat more fruits, vegetables, lean proteins, and whole grains.\n" +
          "• Create a Calorie Deficit.\n" +
          "• Exercise Regularly: At least 30 minutes of moderate activity.\n" +
          "• Get enough sleep.\n" +
          "• Manage stress.\n" +
          "• Stay hydrated.";
      }
      else if (parameters.bmi >= 30) {
        recs["BMI"] = "Your BMI is above 30, which is considered obese.\n" +
          "• Increase Physical Activity.\n" +
          "• Consider Medical or Surgical Options (Consult a doctor).";
      }
    }

    // Smoking Recommendations
    if (parameters.smoking) {
      if (parameters.smoking === "Yes") {
        recs["Smoking"] = "Smoking significantly increases the risk of dementia progression. Consider: \n" +
          "• Nicotine replacement therapy (patches, gum).\n" +
          "• Counseling & behavioral therapy.\n" +
          "• Removing ashtrays & restricting smoking areas.\n" +
          "• Caregiver support & distraction techniques.\n" +
          "• Medication options (consult doctor).";
      }
    }

    // Alcohol Consumption Recommendations
    if (parameters.alcoholConsumption) {
      if (parameters.alcoholConsumption === "Daily") {
        recs["Alcohol"] = "Heavy alcohol consumption aggravates Alzheimer's disease. Consider: \n" +
          "• Avoid having alcohol at home.\n" +
          "• Provide low- or zero-alcohol alternatives.\n" +
          "• Set a weekly alcohol limit & track consumption.\n" +
          "• Have alcohol-free days.\n" +
          "• Alternate alcoholic and non-alcoholic drinks.";
      }
    }

    // Diet Quality Recommendations
    if (parameters.dietQuality >= 0 && parameters.dietQuality <= 3) {
      recs["Diet Quality"] = `Poor diet quality detected. Focus on increasing nutrient-dense foods:
        • Eat more vegetables like broccoli, spinach, and carrots.
        • Include fruits such as berries, apples, and oranges.
        • Consume whole grains like brown rice and quinoa.
        • Increase protein from fish, poultry, and low-fat dairy.
        • Avoid processed meats, fried foods, and sugary drinks.`;
    } else if (parameters.dietQuality >= 4 && parameters.dietQuality <= 6) {
      recs["Diet Quality"] = `Average diet quality. Consider improving your dietary balance:
        • Increase intake of whole grains and lean proteins.
        • Reduce processed food consumption.
        • Ensure proper hydration and include healthy fats like olive oil and avocados.`;
    } else if (parameters.dietQuality >= 7 && parameters.dietQuality <= 10) {
      recs["Diet Quality"] = `Great diet quality! Maintain your healthy habits:
        • Continue consuming nutrient-rich foods like vegetables, fruits, and whole grains.
        • Maintain a well-balanced protein and fat intake.
        • Ensure proper hydration and meal timing.`;
    }

    // Sleep Quality Recommendations
    if (parameters.sleepQuality) {
      if (parameters.sleepQuality >= 4 && parameters.sleepQuality <= 5) {
        recs["Sleep Quality"] = `Poor sleep quality detected. Suggestions:
        • Maintain a consistent bedtime routine.
        • Avoid caffeine and heavy meals close to bedtime.
        • Keep your bedroom dark, quiet, and comfortable.
        • Consult a doctor if sleep disturbances persist.`;
      } else if (parameters.sleepQuality >= 6 && parameters.sleepQuality <= 7) {
        recs["Sleep Quality"] = `Moderate sleep quality. Improve by:
        • Establishing a consistent sleep routine.
        • Reducing screen time before bed.
        • Practicing relaxation techniques such as deep breathing or meditation.`;
      } else if (parameters.sleepQuality >= 8 && parameters.sleepQuality <= 10) {
        recs["Sleep Quality"] = `Good sleep quality! Keep up the healthy sleep habits:
        • Maintain a consistent sleep schedule.
        • Continue practicing good sleep hygiene.
        • Stay active during the day for better rest.`;
      }
    }

    // Diabetes Recommendations
    if (parameters.diabetes == "Yes") {
      recs["Diabetes"] = `For diabetes management:
        • Eat plenty of non-starchy vegetables like broccoli and peppers.
        • Choose whole grains over refined grains.
        • Include lean proteins such as fish and chicken.
        • Avoid sugary drinks, processed foods, and excessive sodium.
        • Stay active with light exercises such as walking or chair exercises.`;
    }

    return recs;
  };

  // Handle input changes and update recommendations live
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Generate live recommendations
    const recs = generateRecommendations(updatedFormData);
    setRecommendations(recs);

    console.log("Updated Form Data:", updatedFormData);
    console.log("Live Recommendations:", recs);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Save the final recommendations after submission
    setFinalRecommendations(recommendations);

    try {
      const response = await axios.post(import.meta.env.VITE_API_URL + "/api/data/store", {
        userId: user?.uid || "guest",
        ...formData
      });

      console.log("API Response:", response.data);
    } catch (err) {
      console.error("API Error:", err);
      alert("Failed to save data!");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      {finalRecommendations ? (
        // Show Final Report After Submission
        <div>
          <h2 className="text-2xl font-bold mb-4">Your Report</h2>
          <ul className="list-disc pl-5">
            {Object.entries(finalRecommendations).map(([key, value]) => (
              <li key={key} className="mb-2"><strong>{key}:</strong> {value}</li>
            ))}
          </ul>
          <button
            onClick={() => {
              setFinalRecommendations(null);
              setFormData({});
              setRecommendations({});
            }}
            className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
          >
            Take Another Test
          </button>
        </div>
      ) : (
        // Show Form Initially
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Alzheimer’s Risk Assessment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {inputFields.map((field) => (
              <div key={field.name}>
                <label className="text-lg font-medium block mb-1">{field.label}</label>
                <p className="text-sm text-gray-600 mb-2">{field.description}</p>
                {field.type === "number" ? (
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <select
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select an option</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                )}
              </div>
            ))}
          </div>

          {/* Show Live Recommendations */}
          {Object.keys(recommendations).length > 0 && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <h3 className="text-xl font-semibold">Live Recommendations:</h3>
              <ul>
                {Object.entries(recommendations).map(([key, value]) => (
                  <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
              </ul>
            </div>
          )}

          <button type="submit" className="mt-6 bg-green-500 text-white py-2 px-4 rounded w-full">
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Form;
