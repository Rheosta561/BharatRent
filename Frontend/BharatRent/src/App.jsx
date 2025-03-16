import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Screens/Home";
import Dashboard from "./Screens/Dashboard";
import RentAgreement from "./RentAgreement";
import RentAgreementForm from "./RentAgreementForm";
import Chatbot from "./Screens/Chatbot";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard/>} />
      <Route path="/RentAgreement" element={<RentAgreement />} />
      <Route path="/RentAgreementForm" element={<RentAgreementForm />} />
      <Route path ='/chatbot'  element ={<Chatbot/>}/>
    </Routes>
  );
}

export default App;
