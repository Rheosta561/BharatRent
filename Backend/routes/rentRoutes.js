const express = require("express");
const router = express.Router();
const RentAgreement = require("../models/RentAgreement");

// Create a new rental agreement
router.post("/create", async (req, res) => {
  try {
    const agreement = new RentAgreement(req.body);
    await agreement.save();
    res.status(201).json({ message: "Agreement created successfully", agreement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch all rental agreements
router.get("/all", async (req, res) => {
  try {
    const agreements = await RentAgreement.find();
    res.status(200).json(agreements);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
