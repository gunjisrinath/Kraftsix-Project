import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, Modal } from "react-bootstrap";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

const Todolist = ({ tickets }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);

  const handleShow = (ticket) => {
    setCurrentTicket(ticket);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setCurrentTicket(null);
  };

  const handleEdit = async () => {
    try {
      await updateDoc(
        doc(db, "tickets", currentTicket.ticketID),
        currentTicket
      );
      handleClose();
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDelete = async (ticketID) => {
    try {
      await deleteDoc(doc(db, "tickets", ticketID));
      // Remove the ticket from the state
      setTickets((prevTickets) =>
        prevTickets.filter((ticket) => ticket.ticketID !== ticketID)
      );
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTicket((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <Row className="centerRow todolist">
        <Col className="todoCol">
          <h3>Todo list </h3>
          <div className="todoCol">
            {tickets.map((ticket) => (
              <div key={ticket.ticketID} className="ticket">
                <h3> TicketId:{ticket.ticketID}</h3>
                <p>
                  <strong>Project:</strong> {ticket.project}
                </p>
                <p>
                  <strong>Issue Type:</strong> {ticket.issueType}
                </p>
                <p>
                  <strong>Summary:</strong> {ticket.summary}
                </p>
                <p>
                  <strong>Description:</strong> {ticket.description}
                </p>
                <p>
                  <strong>Reporter:</strong> {ticket.reporter}
                </p>
                <p>
                  <strong>Assigning To:</strong> {ticket.assigningTo}
                </p>
                <div>
                  <Button variant="primary" onClick={() => handleShow(ticket)}>
                    Edit
                  </Button>{" "}
                  <Button
                    variant="primary"
                    onClick={() => handleDelete(ticket.ticketID)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Col>
        <Col className="inProgressCol">
          <h3>In Progress </h3>
        </Col>
        <Col className="progressCol">
          <h3> Progress </h3>
        </Col>
        <Col className="doneCol">
          <h3>Done </h3>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Issue</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modalBody">
          {currentTicket && (
            <>
              <p>Project</p>
              <input
                type="text"
                name="project"
                value={currentTicket.project}
                onChange={handleChange}
              />
              <p>Issue type</p>
              <input
                type="text"
                name="issueType"
                value={currentTicket.issueType}
                onChange={handleChange}
              />
              <p>Summary</p>
              <input
                type="text"
                name="summary"
                value={currentTicket.summary}
                onChange={handleChange}
              />
              <p>Description</p>
              <textarea
                name="description"
                value={currentTicket.description}
                onChange={handleChange}
                placeholder="write the issue here"
              />
              <p>Reporter</p>
              <input
                type="text"
                name="reporter"
                value={currentTicket.reporter}
                onChange={handleChange}
              />
              <p>Assigning To</p>
              <input
                type="text"
                name="assigningTo"
                value={currentTicket.assigningTo}
                onChange={handleChange}
              />
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Todolist;
