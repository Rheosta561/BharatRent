const express = require("express");
const RentAgreement = require("../models/RentAgreement");
const pdfkit = require("pdfkit");
const fs = require("fs");
const path = require("path");
const router = express.Router();

// Create Rent Agreement
router.post("/create-agreement", async (req, res) => {
  try {
    const { tenantName, landlordName, propertyAddress, startDate, endDate } = req.body;

    const newAgreement = new RentAgreement({
      tenantName,
      landlordName,
      propertyAddress,
      startDate,
      endDate,
      paymentStatus: 0, // Default payment status is 0 (unpaid)
    });

    await newAgreement.save();
    res.status(201).json({ message: "Rent agreement created successfully", agreement: newAgreement });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Update Payment Status
router.post("/update-payment-status/:id", async (req, res) => {
  const { paymentStatus } = req.body;
  const rentAgreementId = req.params.id;

  if (![0, 1].includes(paymentStatus)) {
    return res.status(400).json({ message: "Invalid payment status" });
  }

  try {
    const updatedAgreement = await RentAgreement.findByIdAndUpdate(
      rentAgreementId,
      { paymentStatus },
      { new: true }
    );

    if (!updatedAgreement) {
      return res.status(404).json({ message: "Rent agreement not found" });
    }

    res.status(200).json({ message: "Payment status updated", updatedAgreement });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Generate PDF (only if payment is completed)
router.get("/generate-pdf/:id", async (req, res) => {
  const rentAgreementId = req.params.id;

  // Fetch the agreement from the database
  const agreement = await RentAgreement.findById(rentAgreementId);

  if (!agreement) {
    return res.status(404).json({ message: "Rent agreement not found" });
  }

  // Check if the payment status is 1 (paid)
  if (agreement.paymentStatus !== 1) {
    return res.status(400).json({ message: "Payment is not completed. PDF cannot be generated" });
  }

  // Create PDF if payment is completed
  const doc = new pdfkit();
  const filePath = path.join(__dirname, "../pdfs", `agreement-${rentAgreementId}.pdf`);

  // Pipe the output to a file
  doc.pipe(fs.createWriteStream(filePath));

  // Add content to the PDF
  doc.fontSize(25).text("Rent Agreement", { align: "center" });
  doc.moveDown();
  doc.fontSize(16).text(`Tenant Name: ${agreement.tenantName}`);
  doc.text(`Landlord Name: ${agreement.landlordName}`);
  doc.text(`Property Address: ${agreement.propertyAddress}`);
  doc.text(`Start Date: ${agreement.startDate}`);
  doc.text(`End Date: ${agreement.endDate}`);
  doc.text(`Payment Status: ${agreement.paymentStatus === 1 ? "Paid" : "Unpaid"}`);

  // Finalize the PDF and send the response
  doc.end();

  // After PDF generation, respond to the client
  doc.on("finish", () => {
    res.status(200).json({
      message: "PDF generated successfully",
      file: filePath,
    });
  });
});

module.exports = router;
