const mongoose = require("mongoose");

const landlordSchema = new mongoose.Schema({
  name: String,
  idProofType: String,
  idNumber: String,
  address: String,
});

const tenantSchema = new mongoose.Schema({
  name: String,
  idProofType: String,
  idNumber: String,
  address: String,
});

const rentAgreementSchema = new mongoose.Schema({
  dateOfAgreement: String,
  placeOfAgreement: String,
  stateOfAgreement: String,
  propertyAddress: String,
  tenancyStartDate: String,
  tenancyPeriod: Number,
  monthlyRent: Number,
  rentPaymentDay: Number,
  securityAmount: Number,
  landlordType: String,
  landlords: [landlordSchema],
  tenantType: String,
  tenants: [tenantSchema],
  paymentStatus: String,
});

module.exports = mongoose.model("RentAgreement", rentAgreementSchema);
