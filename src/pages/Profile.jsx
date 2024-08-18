import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileCard from "../components/ProfileCard";
import VisitedLocations from "../components/VisitedLocations";
import MyGarage from "../components/MyGarage";

function Profile() {
  return (
    <Container>
      <Row>
        <Col xs={12} md={4} className="p-4 pb-0 d-flex gap-4 flex-column">
          <ProfileCard />
        </Col>
        <Col xs={12} md={8} className="p-4">
          <VisitedLocations height={"200px"} />
        </Col>
        <Col xs={12} className="p-4">
          <MyGarage />
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
