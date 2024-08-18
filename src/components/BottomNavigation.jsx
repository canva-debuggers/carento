import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { BiSearch, BiUser } from "react-icons/bi";
import { IoIosHome } from "react-icons/io";
import { Link } from "react-router-dom";

function BottomNavigation() {
  return (
    <>
      <Navbar
        className="d-none d-md-flex flex-column position-fixed top-0"
        style={{
          width: "45px",
          backgroundColor: "white",
          boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 10px 0px",
          borderRadius: "30px",
          height: "calc( 100vh - 40px)",
          margin: "20px",
        }}
      >
        <Container className="flex-column align-items-start">
          <Nav className="flex-column w-100 gap-3">
            <Nav.Item>
              <Link to="/dashboard" className="d-flex align-items-center">
                <IoIosHome size={20} />
                {/* <span>Home</span> */}
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/dashboard/search"
                className="d-flex align-items-center"
              >
                <BiSearch size={20} />
                {/* <span>Search</span> */}
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/dashboard/profile"
                className="d-flex align-items-center"
              >
                <BiUser size={20} />
                {/* <span>Profile</span> */}
              </Link>
            </Nav.Item>
            <div
              style={{
                position: "absolute",
                bottom: 50,
                left: -35,
                transform: "rotate(-90deg)",
                fontWeight: "bold",
                fontSize: "28px",
                opacity: 0.1,
              }}
            >
              Carento
            </div>
          </Nav>
        </Container>
      </Navbar>

      <Navbar
        fixed="bottom"
        className="d-md-none"
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
              <Link
                to="/dashboard"
                className="d-flex align-items-center flex-column"
              >
                <IoIosHome size={20} />
                <p className="m-0">Home</p>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/dashboard/search"
                className="d-flex align-items-center flex-column"
              >
                <BiSearch size={20} />
                <p className="m-0">Search</p>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link
                to="/dashboard/profile"
                className="d-flex align-items-center flex-column"
              >
                <BiUser size={20} />
                <p className="m-0">Profile</p>
              </Link>
            </Nav.Item>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default BottomNavigation;
