import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Button, Modal, Nav, NavDropdown } from "react-bootstrap";
import { doc, setDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase"; // Import your firebase configuration

import Todolist from "./Todolist";
import logo from "../assets/logo.png";
import profile from "../assets/profile.png";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [newTicketID, setNewTicketID] = useState('');
  const [lastTicketID, setLastTicketID] = useState(() => {
    return localStorage.getItem('lastTicketID') || 'AT000';
  });
  const [formData, setFormData] = useState({
    project: '',
    issueType: '',
    summary: '',
    description: '',
    reporter: '',
    assigningTo: '',
  });
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    // Fetch tickets from Firestore when the component mounts
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

  const generateTicketID = (lastID) => {
    const numericPart = parseInt(lastID.slice(2)) + 1;
    const newID = numericPart.toString().padStart(3, '0');
    return `AT${newID}`;
  };

  const handleShow = () => {
    const nextTicketID = generateTicketID(lastTicketID);
    setNewTicketID(nextTicketID);
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleSave = async () => {
    try {
      // Save the form data to Firestore
      await setDoc(doc(db, "tickets", newTicketID), {
        ticketID: newTicketID,
        ...formData,
        createdAt: new Date(),
      });

      // Update the last ticket ID
      setLastTicketID(newTicketID);
      localStorage.setItem('lastTicketID', newTicketID);

      // Update the tickets state with the new ticket
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
          <NavDropdown title="DashBoard" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">
              <h6>Srinath</h6>
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              <h6>Rakesh</h6>
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              <h6>Ganesh</h6>
            </NavDropdown.Item>
          </NavDropdown>
          <Nav>Issues</Nav>
          <img
            alt=""
            src={profile}
            width="40"
            height="40"
            className="d-inline-block align-top profile"
          />
          <Button variant="danger">LogOut</Button>
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
          <input type="text" name="project" value={formData.project} onChange={handleChange} />
          <p>Issue type</p>
          <input type="text" name="issueType" value={formData.issueType} onChange={handleChange} />
          <p>Summary</p>
          <input type="text" name="summary" value={formData.summary} onChange={handleChange} />
          <p>Description</p>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="write the issue here" />
          <p>Reporter</p>
          <input type="text" name="reporter" value={formData.reporter} onChange={handleChange} />
          <p>Assigning To</p>
          <input type="text" name="assigningTo" value={formData.assigningTo} onChange={handleChange} />
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
      <Todolist tickets={tickets} />
    </div>
  );
};

export default Home;
