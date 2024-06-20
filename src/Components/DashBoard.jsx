import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Button, Modal, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const Navigate = useNavigate();
  const handlerAdmin = () => {
    Navigate("/admin");
  };
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <div className="navBarDashboard">
            <Nav onClick={handlerAdmin} style={{ cursor: "pointer" }}>
              Admin
            </Nav>
            <Nav
              onClick={() => {
                Navigate("/supportAgent");
              }}
              style={{ cursor: "pointer" }}
            >
              Support Agent
            </Nav>
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default DashBoard;
