import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Todolist = ({ tickets }) => {
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
              </div>
            ))}
          </div>
        </Col>
        <Col className="inProgressCol">
          {" "}
          <h3>In Progress </h3>
        </Col>
        <Col className="progressCol">
          <h3> Progress </h3>
        </Col>
        <Col className="doneCol">
          <h3>Done </h3>
        </Col>
      </Row>
    </div>
  );
};

export default Todolist;
