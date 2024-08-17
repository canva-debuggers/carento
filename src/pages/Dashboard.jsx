import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaGasPump, FaLocationArrow } from "react-icons/fa";
import { FaRegCircleDot } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import VisitedLocations from "../components/VisitedLocations";
import CarSmallCard from "../components/CarSmallCard";

function Dashboard() {
  return (
    <Container>
      <Row>
        <Col
          xs={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Link to="/my-cars" className="fs-6 fw-bold">
            My Cars
          </Link>
        </Col>
        <Col
          xs={6}
          className="d-flex align-items-center justify-content-center"
        >
          <Link to="/notifications" className="fs-6 fw-bold">
            <IoIosNotifications />
            Notifications
          </Link>
        </Col>
        <Col xs={12} className="p-4">
          <div className="d-flex flex-column  align-items-start justify-content-center bg-light p-4 rounded">
            <div className="d-flex align-items-center justify-content-between w-100">
              <span> NEAREST CAR </span>
              <span className="fs-6 d-flex align-items-center justify-content-center gap-2">
                <FaRegCircleDot color="green" />
                <p className="m-0">Available</p>
              </span>
            </div>
            <img
              src="https://pngimg.com/uploads/bmw/bmw_PNG99550.png"
              className="img-fluid"
            />
            <h4 className="fw-bold opacity-50 fs-1">BMW X5</h4>
            <div className="d-flex align-items-center gap-4">
              <span className="fs-6 d-flex align-items-center justify-content-center gap-2">
                <FaGasPump />
                <p className="m-0">5KM/L</p>
              </span>
              <span className="fs-6 d-flex align-items-center justify-content-center gap-2">
                <FaLocationArrow />

                <p className="m-0">>500kms</p>
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between w-100 mt-3">
              <p className="m-0 fw-bold fs-5">Rs. 50000</p>
              <Button variant="dark" size="lg" className="ms-auto">
                Book Now
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={6} className="ps-4">
          <ProfileCard />
        </Col>
        <Col xs={6} className="pe-4">
          <VisitedLocations />
        </Col>
        <Col xs={12} className="p-4">
          <CarSmallCard />
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
