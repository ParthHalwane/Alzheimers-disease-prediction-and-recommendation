import express from "express";
import DataModel from "../models/DataModel.js"; // Adjust model path if needed

const router = express.Router();

router.post("/store", async (req, res) => {
    try {
        const newData = new DataModel(req.body);
        await newData.save();
        res.status(201).json({ success: true, message: "Data stored successfully" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export default router;
