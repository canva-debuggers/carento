import React from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import logoCarImg from "../assets/login_car.jpg";

function Login() {
  return (
    <Container fluid style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Row>
        <Col xs={12}>
          <div>
            <h3 style={{ color: "#fff", fontSize: "2rem" }}>Carento.</h3>
            <h1
              className="text-center"
              style={{ color: "#fff", fontSize: "3rem" }}
            >
              Premium Cars. Enjoy the Luxury.
            </h1>
            <Form>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  style={{
                    width: "20rem",
                    height: "2rem",
                    borderRadius: "9px",
                    padding: "0.2rem 0.3rem",
                  }}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>

              <Button
                variant="primary"
                type="submit"
                style={{
                  width: "35rem",
                  borderRadius: "40px",
                  height: "3rem",
                  fontWeight: "bold",
                }}
              >
                Let's Go
              </Button>
            </Form>
          </div>
        </Col>
        <Col xs={12}>
          <Image src={logoCarImg} alt="Background Image" />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
