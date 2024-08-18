import React, { useState, useContext } from "react";
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
import { app } from "../firebase";
import { AccountContext } from "../context/AccountProvider";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  createUser,
  getAllDataFromCollection,
  getDataFromCollection,
  googleUser,
  loginUser,
  retrieveAllDataFromCollection,
  storeJsonInCollection,
} from "../queries/queries";

function Login() {
  const { setAccount, setUser } = useContext(AccountContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loginForm, setLoginForm] = useState(1);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    try {
      e.preventDefault();

      const user = await createUser(email, password);
      if (user) {
        setAccount(user);
        let dataObj = {
          name: name,
          email: email,
          ratings: 5,
          rides: 0,
          photoURL: user.photoURL ? user.photoURL : null,
        };
        await storeJsonInCollection("users", dataObj, user.uid);
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const user = await loginUser(email, password);
      if (user) {
        console.log("user", user);
        setAccount(user);
        const userDetails = await getDataFromCollection("users", user.uid);
        setUser(userDetails);
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };
  const loginWithGoogle = async () => {
    try {
      const user = await googleUser();
      if (user) {
        setAccount(user);
        console.log("user", user);
        const dataObj = {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          ratings: 5,
          rides: 0,
        };
        await storeJsonInCollection("users", dataObj, user.uid);
        const userDetails = await getDataFromCollection("users", user.uid);
        setUser(userDetails);
        navigate("/dashboard");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Container fluid style={{ backgroundColor: "#000", minHeight: "100vh" }}>
      <Row>
        <Col xs={12}>
          <div>
            <div className="fs-3 text-white opacity-50">Carento.</div>
            <div className="fs-1" style={{ color: "#fff" }}>
              Premium Cars. Enjoy the Luxury.
            </div>
            {loginForm === 1 && (
              <Form onSubmit={handleLogin}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    style={{
                      width: "20rem",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    style={{ width: "20rem" }}
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FloatingLabel>

                <Button
                  type="submit"
                  style={{
                    width: "20rem",
                    borderRadius: "40px",
                    height: "3rem",
                    fontWeight: "bold",
                    background: "#fff",
                    marginTop: "1rem",
                  }}
                >
                  <span style={{ color: "#000" }} className="fs-6">
                    Let's Go
                  </span>
                </Button>
                <div
                  style={{ color: "#fff" }}
                  className="fs-6 text-center"
                  onClick={() => setLoginForm(2)}
                >
                  New user? Register Here
                </div>
              </Form>
            )}
            {loginForm === 2 && (
              <Form onSubmit={handleRegister}>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder=""
                    value={name}
                    style={{
                      width: "20rem",
                    }}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingInput"
                  label="Email address"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    style={{
                      width: "20rem",
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FloatingLabel>

                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type="password"
                    style={{ width: "20rem" }}
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FloatingLabel>

                <Button
                  type="submit"
                  style={{
                    width: "20rem",
                    borderRadius: "40px",
                    height: "3rem",
                    fontWeight: "bold",
                    background: "#fff",
                    marginTop: "1rem",
                  }}
                >
                  <span style={{ color: "#000" }} className="fs-6">
                    Let's Go
                  </span>
                </Button>
                <Button
                  type="button"
                  style={{
                    width: "20rem",
                    borderRadius: "40px",
                    height: "3rem",
                    fontWeight: "bold",
                    background: "#fff",
                    marginTop: "1rem",
                  }}
                >
                  <span
                    style={{ color: "#000" }}
                    className="fs-6"
                    onClick={loginWithGoogle}
                  >
                    Log in with google
                  </span>
                </Button>
                <div
                  style={{ color: "#fff" }}
                  className="fs-6 text-center"
                  onClick={() => setLoginForm(1)}
                >
                  Already an user? Login Here
                </div>
              </Form>
            )}
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
