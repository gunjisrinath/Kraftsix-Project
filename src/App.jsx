import "../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate } from "react-router-dom";

import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/signUpPage";
import Home from "./Components/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
