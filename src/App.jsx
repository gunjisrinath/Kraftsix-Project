import React, { useState, useEffect } from "react";
import "../src/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../src/Components/firebase";

import LoginPage from "./Components/LoginPage";
import SignUpPage from "./Components/signUpPage";
import Home from "./Components/Home";
import DashBoard from "./Components/DashBoard";
import Admin from "./Components/Admin";
import SupportAgent from "./Components/SupportAgent";

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const querySnapshot = await getDocs(collection(db, "tickets"));
      const fetchedTickets = [];
      querySnapshot.forEach((doc) => {
        fetchedTickets.push(doc.data());
      });
      setTickets(fetchedTickets);
    };

    fetchTickets();
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/home"
          element={<Home tickets={tickets} setTickets={setTickets} />}
        />
        <Route path="/dashBoard" element={<DashBoard />} />
        <Route
          path="/admin"
          element={<Admin tickets={tickets} setTickets={setTickets} />}
        />
        <Route
          path="/SupportAgent"
          element={<SupportAgent tickets={tickets} />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
