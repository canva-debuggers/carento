import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BiSearch, BiUser } from "react-icons/bi";
import { IoIosHome } from "react-icons/io";

function BottomNavigation() {
  return (
    <Navbar
      fixed="bottom"
      style={{
        backgroundColor: "white",
        boxShadow: "rgba(0, 0, 0, 0.2) -1px -6px 10px 20px",
        borderTopLeftRadius: "50px",
        borderTopRightRadius: "50px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <Container>
        <Nav className="justify-content-between d-flex w-100">
          <Nav.Item>
            <Nav.Link
              href="#home"
              className="d-flex align-items-center flex-column"
            >
              <IoIosHome size={20} />
              <p className="m-0">Home</p>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#search"
              className="d-flex align-items-center flex-column"
            >
              <BiSearch size={20} />
              <p className="m-0">Search</p>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              href="#profile"
              className="d-flex align-items-center flex-column"
            >
              <BiUser size={20} />
              <p className="m-0">Profile</p>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default BottomNavigation;
