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
    paymentStatus: "",
  });
  const generateAgreementPDF = () => {
    const doc = new jsPDF();
    
    // Helper function to get values with a default
    const getValue = (value, defaultValue = "Not Provided") => value ? value : defaultValue;
  
    // Set Title
    doc.setFont("times", "bold");
    doc.setFontSize(16);
    doc.text("RENTAL AGREEMENT", 105, 20, { align: "center" });
  
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    let yPosition = 30;
    doc.text(`This Agreement is made on ${getValue(formData.dateOfAgreement)} at ${getValue(formData.placeOfAgreement)}, ${getValue(formData.stateOfAgreement)}`, 20, yPosition);
    
    // Function to check and add page if content exceeds page size
    const checkAndAddPage = (yPos) => {
      if (yPos > 270) {  // If content exceeds page height
        doc.addPage();   // Add a new page
        return 20;       // Reset yPosition to start at top of new page
      }
      return yPos;
    };
  
    // Landlord Details
    doc.setFont("times", "bold");
    yPosition += 10;
    doc.text("1. Landlord Details:", 20, yPosition);
    doc.setFont("times", "normal");
  
    formData.landlords.forEach((landlord, index) => {
      yPosition += 10;
      yPosition = checkAndAddPage(yPosition); // Check if we need a new page
      doc.text(`   ${index + 1}. Name: ${getValue(landlord.name)}`, 25, yPosition);
      yPosition += 10;
      yPosition = checkAndAddPage(yPosition); // Check if we need a new page
      doc.text(`      ID Proof: ${getValue(landlord.idProofType)} - ${getValue(landlord.idNumber)}`, 25, yPosition);
    });
  
    // Tenant Details
    doc.setFont("times", "bold");
    yPosition += 20;
    yPosition = checkAndAddPage(yPosition); // Check if we need a new page
    doc.text("2. Tenant Details:", 20, yPosition);
    doc.setFont("times", "normal");
  
    formData.tenants.forEach((tenant, index) => {
      yPosition += 10;
      yPosition = checkAndAddPage(yPosition); // Check if we need a new page
      doc.text(`   ${index + 1}. Name: ${getValue(tenant.name)}`, 25, yPosition);
      yPosition += 10;
      yPosition = checkAndAddPage(yPosition); // Check if we need a new page
      doc.text(`      ID Proof: ${getValue(tenant.idProofType)} - ${getValue(tenant.idNumber)}`, 25, yPosition);
    });
  
    // Property Details
    doc.setFont("times", "bold");
    yPosition += 20;
    yPosition = checkAndAddPage(yPosition); // Check if we need a new page
    doc.text("3. Property Details:", 20, yPosition);
    doc.setFont("times", "normal");
    yPosition += 10;
    yPosition = checkAndAddPage(yPosition); // Check if we need a new page
    doc.text(`   Address: ${getValue(formData.propertyAddress)}`, 25, yPosition, { maxWidth: 160 });
    yPosition += 10;
    yPosition = checkAndAddPage(yPosition); // Check if we need a new page
    doc.text(`   Tenancy Start Date: ${getValue(formData.tenancyStartDate)}`, 25, yPosition);
    yPosition += 10;
    yPosition = checkAndAddPage(yPosition); // Check if we need a new page
    doc.text(`   Tenancy Period: ${getValue(formData.tenancyPeriod)} months`, 25, yPosition);
  
    // Rent and Security Details
    doc.setFont("times", "bold");
    yPosition += 20;
    yPosition = checkAndAddPage(yPosition); // Check if we need a new page
    doc.text("4. Rent & Payment Details:", 20, yPosition);
    doc.setFont("times", "normal");
    yPosition += 10;
    yPosition = checkAndAddPage(yPosition); // Check if we need a new page
    doc.text(`   Monthly Rent: ₹${getValue(formData.monthlyRent)}`, 25, yPosition);
    yPosition += 10;
    yPosition = checkAndAddPage(yPosition); // Check if we need a new page
    doc.text(`   Rent Payment Day: ${getValue(formData.rentPaymentDay)}`, 25, yPosition);
    yPosition += 10;
    yPosition = checkAndAddPage(yPosition); // Check if we need a new page
    doc.text(`   Security Amount: ₹${getValue(formData.securityAmount)}`, 25, yPosition);
  
    // // Agreement Duration
    // doc.setFont("times", "bold");
    // yPosition += 20;
    // yPosition = checkAndAddPage(yPosition); // Check if we need a new page
    // doc.text("5. Agreement Duration:", 20, yPosition);
    // doc.setFont("times", "normal");
    // yPosition += 10;
    // yPosition = checkAndAddPage(yPosition); // Check if we need a new page
    // doc.text(`   From: ${getValue(formData.agreementDuration.from)} To: ${getValue(formData.agreementDuration.to)}`, 25, yPosition);
  
    // Terms & Conditions
    doc.setFont("times", "bold");
    yPosition += 20;
    yPosition = checkAndAddPage(yPosition); // Check if we need a new page
    doc.text("6. Terms & Conditions:", 20, yPosition);
    doc.setFont("times", "normal");
    yPosition += 10;
    yPosition = checkAndAddPage(yPosition); // Check if we need a new page
    doc.text(
      "1. The Tenant shall pay rent on time every month.\n" +
      "2. The Tenant shall not sublet the property without the Landlord's permission.\n" +
      "3. Any damages to the property shall be the responsibility of the Tenant.\n" +
      "4. The Landlord and Tenant shall abide by the legal regulations applicable to rental agreements.",
      25,
      yPosition,
      { maxWidth: 160 }
    );
  
    // Signatures - Explicit Page Break for Signatures Section
    yPosition += 40;
    yPosition = checkAndAddPage(yPosition); // Check if we need a new page for signature section
    doc.text(`\nSigned on this day: ${getValue(formData.dateOfAgreement)}`, 20, yPosition);
  
    // Adding the signatures section at the end
    doc.text("_________________________", 20, yPosition + 20);
    doc.text("Landlord's Signature", 20, yPosition + 30);
    
    doc.text("_________________________", 120, yPosition + 20);
    doc.text("Tenant's Signature", 120, yPosition + 30);
  
    // Save PDF
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
          
          <label>Payment Status:</label>
    <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange}>
      <option value="">Select Payment Status</option>
      <option value="Paid">Paid</option>
      <option value="Unpaid">Unpaid</option>
      <option value="Pending">Pending</option>
    </select>
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
