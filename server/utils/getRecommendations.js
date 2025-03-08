const getRecommendations = (parameters) => {
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

    // Diet Quality Recommendations
        if (parameters.DietQuality >= 0 && parameters.DietQuality <= 3) {
            recommendation = `Poor diet quality detected. Focus on increasing nutrient-dense foods:
        • Eat more vegetables like broccoli, spinach, and carrots.
        • Include fruits such as berries, apples, and oranges.
        • Consume whole grains like brown rice and quinoa.
        • Increase protein from fish, poultry, and low-fat dairy.
        • Avoid processed meats, fried foods, and sugary drinks.`;
        } else if (parameters.DietQuality >= 4 && parameters.DietQuality <= 6) {
            recommendation = `Average diet quality. Consider improving your dietary balance:
        • Increase intake of whole grains and lean proteins.
        • Reduce processed food consumption.
        • Ensure proper hydration and include healthy fats like olive oil and avocados.`;
        } else if (parameters.DietQuality >= 7 && parameters.DietQuality <= 10) {
            recommendation = `Great diet quality! Maintain your healthy habits:
        • Continue consuming nutrient-rich foods like vegetables, fruits, and whole grains.
        • Maintain a well-balanced protein and fat intake.
        • Ensure proper hydration and meal timing.`;
        }

    // Sleep Quality Recommendations
        if (parameters.SleepQuality >= 4 && parameters.SleepQuality <= 5) {
            recommendation = `Poor sleep quality detected. Suggestions:
        • Maintain a consistent bedtime routine.
        • Avoid caffeine and heavy meals close to bedtime.
        • Keep your bedroom dark, quiet, and comfortable.
        • Consult a doctor if sleep disturbances persist.`;
        } else if (parameters.SleepQuality >= 6 && parameters.SleepQuality <= 7) {
            recommendation = `Moderate sleep quality. Improve by:
        • Establishing a consistent sleep routine.
        • Reducing screen time before bed.
        • Practicing relaxation techniques such as deep breathing or meditation.`;
        } else if (parameters.SleepQuality >= 8 && parameters.SleepQuality <= 10) {
            recommendation = `Good sleep quality! Keep up the healthy sleep habits:
        • Maintain a consistent sleep schedule.
        • Continue practicing good sleep hygiene.
        • Stay active during the day for better rest.`;
        }

    // Diabetes Recommendations
    if (parameters.Diabetes === "Yes") {
        recommendation = `For diabetes management:
    • Eat plenty of non-starchy vegetables like broccoli and peppers.
    • Choose whole grains over refined grains.
    • Include lean proteins such as fish and chicken.
    • Avoid sugary drinks, processed foods, and excessive sodium.
    • Stay active with light exercises such as walking or chair exercises.`;
    }

    return recommendations;
}

export default getRecommendations;