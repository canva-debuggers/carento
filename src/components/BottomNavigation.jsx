import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";

function BottomNavigation() {
  return (
    <Navbar
      fixed="bottom"
      style={{
        backgroundColor: "white",
        padding: "0.85rem",
        boxShadow: "rgba(0, 0, 0, 0.2) -1px -6px 10px 20px",
        borderTopLeftRadius: "10px",
        borderTopRightRadius: "10px",
      }}
    >
      <Container>
        <Nav className="justify-content-center">
          <Nav.Item>
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#search">Search</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#add">Add</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#profile">Profile</Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default BottomNavigation;
