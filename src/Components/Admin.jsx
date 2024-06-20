import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Button, Row, Col } from "react-bootstrap";
import Logo from "../assets/logo.png";
import profile from "../assets/profile.png";

const Admin = ({ tickets }) => {
  const filteredTicketsAdmin = tickets.filter(
    (ticket) => ticket.assigningTo.toLowerCase() === "admin"
  );

  console.log("Filtered tickets:", filteredTicketsAdmin);

  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container className="navBar">
          <Navbar.Brand>
            <img
              alt=""
              src={Logo}
              width="170"
              height="30"
              className="d-inline-block align-top logoImg"
            />
            {"  "}
          </Navbar.Brand>
          <img
            alt=""
            src={profile}
            width="40"
            height="40"
            className="d-inline-block align-top profile"
          />
          <Button variant="danger"  onClick={() => {
              navigate("/");
            }}>LogOut</Button>
        </Container>
      </Navbar>
      <h2 style={{ color: "black", backgroundColor: "yellow" }}>Admin</h2>

      <Row className="centerRow todolist">
        {filteredTicketsAdmin.length > 0 && (
          <Col className="todoCol admin">
            <h3>Todo</h3>
            <div className="todoCol">
              {filteredTicketsAdmin.map((ticket) => (
                <div key={ticket.ticketID} className="ticket">
                  <h3> TicketId: {ticket.ticketID}</h3>
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
                    <Button
                      variant="primary"
                      onClick={() => handleShow(ticket)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(ticket.ticketID)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        )}

        <Col className="inProgressCol admin">
          <h3>In Progress</h3>
        </Col>
        <Col className="progressCol admin">
          <h3>Progress</h3>
        </Col>
        <Col className="doneCol admin">
          <h3>Done</h3>
        </Col>
      </Row>
    </div>
  );
};

export default Admin;
