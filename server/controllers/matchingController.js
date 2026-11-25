import mongoose from "mongoose";
import Item from "../models/Item.js";
import { findAIMatches } from "../services/matchingService.js";

// Get AI Matches
export const getAIMatches = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid item ID",
            });
        }

        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found",
            });
        }

        const matches = await findAIMatches(item);

        return res.status(200).json({
            success: true,
            count: matches.length,
            data: matches,
        });

    } catch (error) {
        console.error("AI matching failed:", error.status ?? error.code ?? "Unknown error", error.message);

        return res.status(503).json({
            success: false,
            message: "AI matching is currently unavailable. Please try again later.",
        });
    }
};