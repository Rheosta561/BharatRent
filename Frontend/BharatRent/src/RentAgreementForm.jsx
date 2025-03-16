import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RentForm1.css";
import jsPDF from "jspdf";

const RentAgreementForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    dateOfAgreement: "",
    placeOfAgreement: "",
    stateOfAgreement: "",
    propertyAddress: "",
    tenancyStartDate: "",
    tenancyPeriod: "",
    monthlyRent: "",
    rentPaymentDay: "",
    securityAmount: "",
    landlordType: "",
    numberOfOwners: 1,
    landlords: [{ name: "", idProofType: "", idNumber: "", address: "" }],
    tenantType: "",
    numberOfTenants: 1,
    tenants: [{ name: "", idProofType: "", idNumber: "", address: "" }],
  });
  const generateAgreementPDF = () => {
    const doc = new jsPDF();
    doc.setFont("times");
    doc.setFontSize(12);
    doc.text("RENTAL AGREEMENT", 80, 20);
    doc.text(`This Agreement is made on ${new Date().toLocaleDateString()} between:`, 20, 30);

    doc.text(`1. **Landlord Name:** ${formData.landlordName}`, 20, 40);
    doc.text(`   - ID Proof: ${formData.landlordIdProof}`, 25, 50);
    
    doc.text(`2. **Tenant Name:** ${formData.tenantName}`, 20, 60);
    doc.text(`   - ID Proof: ${formData.tenantIdProof}`, 25, 70);

    doc.text(`3. **Property Address:**`, 20, 80);
    doc.text(`${formData.propertyAddress}`, 25, 90, { maxWidth: 160 });

    doc.text(`4. **Rent Amount:** ₹${formData.rentAmount}/month`, 20, 110);
    doc.text(`5. **Agreement Duration:** From ${formData.startDate} to ${formData.endDate}`, 20, 120);

    doc.text("Terms & Conditions:", 20, 140);
    doc.text(
      "1. The Tenant shall pay rent on time every month.\n" +
        "2. The Tenant shall not sublet the property without the Landlord's permission.\n" +
        "3. Any damages to the property shall be the responsibility of the Tenant.\n" +
        "4. The Landlord and Tenant shall abide by the legal regulations applicable to rental agreements.",
      25,
      150,
      { maxWidth: 160 }
    );

    doc.text(`\nSigned on this day: ${new Date().toLocaleDateString()}`, 20, 200);
    doc.text("____________________", 20, 220);
    doc.text("Landlord's Signature", 20, 230);
    doc.text("____________________", 120, 220);
    doc.text("Tenant's Signature", 120, 230);

    doc.save("Rental_Agreement.pdf");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "numberOfOwners") {
      setFormData({
        ...formData,
        numberOfOwners: value,
        landlords: Array.from({ length: value }, (_, i) =>
          formData.landlords[i] || { name: "", idProofType: "", idNumber: "", address: "" }
        ),
      });
    } else if (name === "numberOfTenants") {
      setFormData({
        ...formData,
        numberOfTenants: value,
        tenants: Array.from({ length: value }, (_, i) =>
          formData.tenants[i] || { name: "", idProofType: "", idNumber: "", address: "" }
        ),
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePersonChange = (index, field, value, type) => {
    const updatedList = [...formData[type]];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setFormData({ ...formData, [type]: updatedList });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <div className="form-container">
      {step === 1 && (
        <div className="form-step">
          <h2>Agreement Details</h2>
          <label>Date of Agreement:</label>
          <input type="date" name="dateOfAgreement" value={formData.dateOfAgreement} onChange={handleChange} />

          <label>Place of Agreement:</label>
          <input type="text" name="placeOfAgreement" value={formData.placeOfAgreement} onChange={handleChange} />

          <label>State of Agreement:</label>
          <input type="text" name="stateOfAgreement" value={formData.stateOfAgreement} onChange={handleChange} />
          
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-step">
          <h2>Property Details</h2>
          <label>Property Address:</label>
          <input type="text" name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} />

          <label>Tenancy Start Date:</label>
          <input type="date" name="tenancyStartDate" value={formData.tenancyStartDate} onChange={handleChange} />

          <label>Tenancy Period (in months):</label>
          <input type="number" name="tenancyPeriod" value={formData.tenancyPeriod} onChange={handleChange} />
          
          <button onClick={prevStep}>Previous</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 3 && (
        <div className="form-step">
          <h2>Rent and Security Details</h2>
          <label>Monthly Rent Amount:</label>
          <input type="number" name="monthlyRent" value={formData.monthlyRent} onChange={handleChange} />

          <label>Day of the Month Rent is Paid:</label>
          <input type="number" name="rentPaymentDay" value={formData.rentPaymentDay} onChange={handleChange} />

          <label>Security Amount:</label>
          <input type="number" name="securityAmount" value={formData.securityAmount} onChange={handleChange} />
          
          <button onClick={prevStep}>Previous</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

      {step === 4 && (
        <div className="form-step">
          <h2>Landlord Details</h2>
          <label>Select Landlord Type:</label>
          <select name="landlordType" value={formData.landlordType} onChange={handleChange}>
            <option value="">Select</option>
            <option value="Individual">Individual</option>
            <option value="Company">Company</option>
            <option value="Partnership Firm">Partnership Firm</option>
          </select>

          <label>Number of Owners:</label>
          <input type="number" name="numberOfOwners" value={formData.numberOfOwners} min="1" onChange={handleChange} />

          {formData.landlords.map((_, i) => (
            <div key={i} className="person-section">
              <h3>Landlord {i + 1} Details</h3>
              <label>Name:</label>
              <input type="text" value={formData.landlords[i].name} onChange={(e) => handlePersonChange(i, "name", e.target.value, "landlords")} />

              <label>Identity Proof Type:</label>
              <select value={formData.landlords[i].idProofType} onChange={(e) => handlePersonChange(i, "idProofType", e.target.value, "landlords")}>
                <option value="">Select</option>
                <option value="Aadhar">Aadhar</option>
                <option value="PAN">PAN</option>
                <option value="Voter ID">Voter ID</option>
                <option value="Passport">Passport</option>
                <option value="Driving License">Driving License</option>
              </select>

              <label>Identity Proof Number:</label>
              <input type="text" value={formData.landlords[i].idNumber} onChange={(e) => handlePersonChange(i, "idNumber", e.target.value, "landlords")} />

              <label>Current Address:</label>
              <input type="text" value={formData.landlords[i].address} onChange={(e) => handlePersonChange(i, "address", e.target.value, "landlords")} />
            </div>
          ))}

          <button onClick={prevStep}>Previous</button>
          <button onClick={nextStep}>Next</button>
        </div>
      )}

{step === 5 && (
  <div className="form-step">
    <h2>Tenant Details</h2>
    
    <label>Select Tenant Type:</label>
    <select name="tenantType" value={formData.tenantType} onChange={handleChange}>
      <option value="">Select</option>
      <option value="Individual">Individual</option>
      <option value="Company">Company</option>
      <option value="Partnership Firm">Partnership Firm</option>
    </select>

    <label>Number of Tenants:</label>
    <input 
      type="number" 
      name="numberOfTenants" 
      value={formData.numberOfTenants} 
      min="1" 
      onChange={handleChange} 
    />

    {formData.tenants.map((_, i) => (
      <div key={i} className="person-section">
        <h3>Tenant {i + 1} Details</h3>

        <label>Name:</label>
        <input 
          type="text" 
          value={formData.tenants[i].name} 
          onChange={(e) => handlePersonChange(i, "name", e.target.value, "tenants")} 
        />

        <label>Identity Proof Type:</label>
        <select 
          value={formData.tenants[i].idProofType} 
          onChange={(e) => handlePersonChange(i, "idProofType", e.target.value, "tenants")}
        >
          <option value="">Select</option>
          <option value="Aadhar">Aadhar</option>
          <option value="PAN">PAN</option>
          <option value="Voter ID">Voter ID</option>
          <option value="Passport">Passport</option>
          <option value="Driving License">Driving License</option>
        </select>

        <label>Identity Proof Number:</label>
        <input 
          type="text" 
          value={formData.tenants[i].idNumber} 
          onChange={(e) => handlePersonChange(i, "idNumber", e.target.value, "tenants")} 
        />

        <label>Current Address:</label>
        <input 
          type="text" 
          value={formData.tenants[i].address} 
          onChange={(e) => handlePersonChange(i, "address", e.target.value, "tenants")} 
        />
      </div>
    ))}

    <button onClick={prevStep}>Previous</button>
    <button onClick={generateAgreementPDF}>Download Agreement PDF</button>
  </div>
)}

    </div>
  );
};

export default RentAgreementForm;
