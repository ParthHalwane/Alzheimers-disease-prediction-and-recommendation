function getRecommendations(parameters) {
    let recommendations = {};

    // BMI Recommendations
    if (parameters.BMI < 18.5) {
        recommendations.BMI = "Your BMI is below 18.5, which is considered underweight.\n" +
            "1. Eat Nutritious Snacks: Peanut butter with crackers, protein bars, trail mix, pita chips with hummus.\n" +
            "2. Have Small Meals More Often.\n" +
            "3. Add Extra Calories: Nuts, seeds, nut butter.\n" +
            "4. Avoid Unhealthy Junk Food.";
    } else if (parameters.BMI >= 25 && parameters.BMI < 30) {
        recommendations.BMI = "Your BMI is between 25 and 29.9, which is considered overweight.\n" +
            "• Improve Your Diet: Eat more fruits, vegetables, lean proteins, and whole grains.\n" +
            "• Create a Calorie Deficit.\n" +
            "• Exercise Regularly: At least 30 minutes of moderate activity.\n" +
            "• Get enough sleep.\n" +
            "• Manage stress.\n" +
            "• Stay hydrated.";
    } else if (parameters.BMI >= 30) {
        recommendations.BMI = "Your BMI is above 30, which is considered obese.\n" +
            "• Increase Physical Activity.\n" +
            "• Consider Medical or Surgical Options (Consult a doctor).";
    }

    // Smoking Recommendations
    if (parameters.Smoking === "Yes") {
        recommendations.Smoking = "Smoking significantly increases the risk of dementia progression. Consider: \n" +
            "• Nicotine replacement therapy (patches, gum).\n" +
            "• Counseling & behavioral therapy.\n" +
            "• Removing ashtrays & restricting smoking areas.\n" +
            "• Caregiver support & distraction techniques.\n" +
            "• Medication options (consult doctor).";
    }

    // Alcohol Consumption Recommendations
    if (parameters.AlcoholConsumption > 28) {
        recommendations.AlcoholConsumption = "Heavy alcohol consumption aggravates Alzheimer's disease. Consider: \n" +
            "• Avoid having alcohol at home.\n" +
            "• Provide low- or zero-alcohol alternatives.\n" +
            "• Set a weekly alcohol limit & track consumption.\n" +
            "• Have alcohol-free days.\n" +
            "• Alternate alcoholic and non-alcoholic drinks.";
    }

    return recommendations;
}
