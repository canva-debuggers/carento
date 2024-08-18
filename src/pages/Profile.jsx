import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProfileCard from "../components/ProfileCard";
import VisitedLocations from "../components/VisitedLocations";

function Profile() {
  return (
    <Container>
      <Row>
        <Col xs={12} className="p-4 pb-0 d-flex gap-4 flex-column">
          <ProfileCard />
        </Col>
        <Col xs={12} className="p-4 d-block d-md-none">
          <VisitedLocations />
        </Col>
        <Col xs={12} className="p-4">
          <VisitedLocations />
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
