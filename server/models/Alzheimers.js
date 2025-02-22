import mongoose from "mongoose";

const alzheimersSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    value1: { type: Number, required: true },
    value2: { type: Number, required: true },
    value3: { type: Number, required: true },
    value4: { type: Number, required: true },
    transactionId: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
});

// Force the collection name to be "alzheimers"
const Alzheimers = mongoose.model("Alzheimers", alzheimersSchema, "alzheimers");

export default Alzheimers;
