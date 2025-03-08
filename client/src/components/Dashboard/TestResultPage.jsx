import { useState } from "react";
import getRecommendations from "../../../../server/utils/getRecommendations.js";

const TestResultPage = () => {
    const [userData, setUserData] = useState({ BMI: 27, Smoking: 1, AlcoholConsumption: 15 }); // Example data
    const [recommendations, setRecommendations] = useState(null);

    const handleSubmit = () => {
        const recs = getRecommendations(userData);
        console.log("Generated Recommendations:", recs); 
        setRecommendations(recs);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Test Results</h1>
            <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
                Get Recommendations
            </button>

            {recommendations && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow">
                    <h2 className="text-lg font-semibold mb-2">Your Recommendations</h2>
                    {Object.keys(recommendations).map((key) => (
                        <p key={key} className="text-gray-700 whitespace-pre-line mb-2">
                            <strong>{key}:</strong> {recommendations[key]}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TestResultPage;
