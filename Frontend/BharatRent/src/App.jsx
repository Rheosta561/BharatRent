import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import RentAgreement from "./RentAgreement";
import RentAgreementForm from "./RentAgreementForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/RentAgreement" element={<RentAgreement />} />
      <Route path="/RentAgreementForm" element={<RentAgreementForm />} />
    </Routes>
  );
}

export default App;
