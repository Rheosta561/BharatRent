// models/RentAgreement.js

const mongoose = require('mongoose');

const rentAgreementSchema = new mongoose.Schema({
  tenantName: {
    type: String,
    required: true
  },
  landlordName: {
    type: String,
    required: true
  },
  propertyAddress: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  paymentStatus: {
    type: Number,
    enum: [0, 1], // 0 = unpaid, 1 = paid
    default: 0 // Initial state is unpaid
  }
});

module.exports = mongoose.model('RentAgreement', rentAgreementSchema);
