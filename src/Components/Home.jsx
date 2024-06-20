import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Button, Modal, Nav } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

import Todolist from "./Todolist";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";

const Home = ({ tickets, setTickets }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTicketID, setNewTicketID] = useState("");
  const [lastTicketID, setLastTicketID] = useState(() => {
    return localStorage.getItem("lastTicketID") || "AT000";
  });
  const [formData, setFormData] = useState({
    project: "",
    issueType: "",
    summary: "",
    description: "",
    reporter: "",
    assigningTo: "",
  });
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const navigateToDashboard = () => {
    navigate("/DashBoard");
  };

  const generateTicketID = (lastID) => {
    const numericPart = parseInt(lastID.slice(2)) + 1;
    const newID = numericPart.toString().padStart(3, "0");
    return `AT${newID}`;
  };

  const handleShow = () => {
    const nextTicketID = generateTicketID(lastTicketID);
    setNewTicketID(nextTicketID);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      project: "",
      issueType: "",
      summary: "",
      description: "",
      reporter: "",
      assigningTo: "",
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.project) newErrors.project = "Project is required";
    if (!formData.issueType) newErrors.issueType = "Issue type is required";
    if (!formData.summary) newErrors.summary = "Summary is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.reporter) newErrors.reporter = "Reporter is required";
    if (!formData.assigningTo)
      newErrors.assigningTo = "Assigning To is required";
    return newErrors;
  };

  const handleSave = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    try {
      await setDoc(doc(db, "tickets", newTicketID), {
        ticketID: newTicketID,
        ...formData,
        createdAt: new Date(),
      });

      setLastTicketID(newTicketID);
      localStorage.setItem("lastTicketID", newTicketID);

      setTickets((prevTickets) => [
        ...prevTickets,
        {
          ticketID: newTicketID,
          ...formData,
          createdAt: new Date(),
        },
      ]);

      handleClose();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container className="navBar">
          <Navbar.Brand>
            <img
              alt=""
              src={logo}
              width="170"
              height="30"
              className="d-inline-block align-top logoImg"
            />
            {"  "}
          </Navbar.Brand>
          <Nav onClick={navigateToDashboard} style={{ cursor: "pointer" }}>
            DashBoard
          </Nav>

          <img
            alt=""
            src={profile}
            width="40"
            height="40"
            className="d-inline-block align-top profile"
          />
          <Button
            variant="danger"
            onClick={() => {
              navigate("/");
            }}
          >
            LogOut
          </Button>
        </Container>
      </Navbar>
      <div className="createDiv">
        <Button variant="info" onClick={handleShow}>
          Create+
        </Button>
      </div>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Issue</Modal.Title>
          <p>Ticket ID: {newTicketID}</p>
        </Modal.Header>
        <Modal.Body className="modalBody">
          <p>Project</p>
          <input
            type="text"
            name="project"
            value={formData.project}
            onChange={handleChange}
            className={errors.project ? "is-invalid" : ""}
          />
          {errors.project && (
            <div className="invalid-feedback">{errors.project}</div>
          )}
          <p>Issue type</p>
          <input
            type="text"
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            className={errors.issueType ? "is-invalid" : ""}
          />
          {errors.issueType && (
            <div className="invalid-feedback">{errors.issueType}</div>
          )}
          <p>Summary</p>
          <input
            type="text"
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            className={errors.summary ? "is-invalid" : ""}
          />
          {errors.summary && (
            <div className="invalid-feedback">{errors.summary}</div>
          )}
          <p>Description</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="write the issue here"
            className={errors.description ? "is-invalid" : ""}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
          <p>Reporter</p>
          <input
            type="text"
            name="reporter"
            value={formData.reporter}
            onChange={handleChange}
            className={errors.reporter ? "is-invalid" : ""}
          />
          {errors.reporter && (
            <div className="invalid-feedback">{errors.reporter}</div>
          )}
          <p>Assigning To</p>
          <input
            type="text"
            name="assigningTo"
            value={formData.assigningTo}
            onChange={handleChange}
            className={errors.assigningTo ? "is-invalid" : ""}
          />
          {errors.assigningTo && (
            <div className="invalid-feedback">{errors.assigningTo}</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
      <h2 style={{ color: "black", backgroundColor: "yellow" }}>User</h2>
      <Todolist tickets={tickets} setTickets={setTickets} />
    </div>
  );
};

export default Home;
