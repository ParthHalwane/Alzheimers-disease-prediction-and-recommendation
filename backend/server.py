from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to communicate with the backend

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb+srv://projectvssp:projectvssp2025@alzheimers.3evwd.mongodb.net/alzheimers?retryWrites=true&w=majority"
mongo = PyMongo(app)
db = mongo.db.alzheimers  # Ensure this matches your database name

@app.route('/api/process', methods=['POST'])
def process_data():
    try:
        data = request.json
        user_id = data.get("userId")
        values = [data.get("value1"), data.get("value2"), data.get("value3"), data.get("value4")]

        if not all(isinstance(v, (int, float)) for v in values):
            return jsonify({"error": "Invalid input values"}), 400

        transformed_values = [(v * 2) + 5 for v in values]

        result = {
            "userId": user_id,
            "originalValues": values,
            "transformedValues": transformed_values
        }

        inserted_id = db.insert_one(result).inserted_id  # Store result in MongoDB

        return jsonify({
            "message": "Processing successful",
            "transactionId": str(inserted_id),
            "transformedValues": transformed_values
        }), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Running on a different port to avoid conflict with Node.js
