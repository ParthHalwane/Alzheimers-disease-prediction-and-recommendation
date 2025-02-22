const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
    userId: String,
    value1: Number,
    value2: Number,
    value3: Number,
    value4: Number,
    transformedValue1: Number,
    transformedValue2: Number,
    transformedValue3: Number,
    transformedValue4: Number,
    transactionId: { type: String, unique: true },
}, { timestamps: true });

const Test = mongoose.model("Test", testSchema);
module.exports = Test;
