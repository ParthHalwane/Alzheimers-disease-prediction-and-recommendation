import express from "express";
import { v4 as uuidv4 } from "uuid";
import Alzheimers from "../models/Alzheimers.js";

const router = express.Router();

app.post("/api/data/store", (req, res) => {
    console.log("Received Data:", req.body);
    res.status(200).json({ message: "Debugging mode" });
});

router.post("/store", async (req, res) => {
    try {
        const { userId, value1, value2, value3, value4 } = req.body;

        if (!userId || value1 === undefined || value2 === undefined || value3 === undefined || value4 === undefined) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const newTest = new Alzheimers({
            userId,
            value1,
            value2,
            value3,
            value4,
            transactionId: uuidv4(),
        });

        await newTest.save();
        res.status(201).json({ message: "Data stored successfully", transactionId: newTest.transactionId });
    } catch (error) {
        console.error("Error storing data:", error);
        res.status(500).json({ message: "Error storing data", error: error.message });
    }
});

export default router;
