import { useNavigate } from "react-router-dom";
import "../styles/RentAgreement.css";
import Rental from "./assets/Rental.jpg";
import { useState } from "react";

const RentAgreement = () => {
  const navigate = useNavigate();
  const [agreementType, setAgreementType] = useState("residential");

  const handleGenerateClick = () => {
    navigate(`/RentAgreementForm`);
  };

  return (
    <div className="container">
      <img
        src={Rental}
        alt="Rent Agreement Preview"
        className="image-preview"
      />
      <select 
        className="agreement-select" 
        value={agreementType} 
        onChange={(e) => setAgreementType(e.target.value)}
      >
        <option value="residential">Residential</option>
        <option value="commercial">Commercial</option>
      </select>
      <button onClick={handleGenerateClick} className="generate-button">
        Generate Rent Agreement
      </button>
    </div>
  );
};

export default RentAgreement;