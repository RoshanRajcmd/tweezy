import React from "react";
import "./Login.css";

// Bootstrap Components
import { Container, Row, Col, Form, Button } from "react-bootstrap";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

// Const
// import Const from "../../../const/const";

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      loading: false,
    };
  }

  // update values to the state
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  // login action
  login = () => {
    this.setState({ loading: true });
    if (this.state.email !== "" && this.state.password !== "") {
      //
    } else {
      this.setState({
        emailError: "Enter the details",
        passwordError: "Enter the details",
        loading: false,
      });
    }
  };

  // get user details using user id

  render() {
    return (
      <div>
        <Container>
          <Row className="mt-4">
            <Col md={3}></Col>
            <Col xs={12} md={6} className="border border-muted p-5">
              <center>
                <img
                  src="https://cdn-images-1.medium.com/max/1000/1*ZU1eWct801yP-QpUJOaI6Q.png"
                  className="w-25 mt-5"
                  alt=""
                />

                <h5 className="mt-3 text-dark">Welcome Recruiter !</h5>
                <p className="text-secondary small">
                  Sign in with your email ID or phone number
                </p>
              </center>

              {/* Form */}
              <div className="mt-5 m-2 loginForm">
                <Form.Text className="text-danger">
                  {this.state.emailError}
                </Form.Text>
                <Form.Control
                  type="text"
                  onChange={this.handleChange}
                  name="email"
                  placeholder="Your Email"
                  className="mb-3 input"
                ></Form.Control>

                <Form.Text className="text-danger">
                  {this.state.passwordError}
                </Form.Text>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  className="mb-3 input"
                  onChange={this.handleChange}
                ></Form.Control>

                <Button
                  className={`loginButton btn-block ${
                    this.state.loading ? "disabled" : ""
                  }`}
                  onClick={this.login}
                >
                  {this.state.loading
                    ? "Loading"
                    : "Login in to recruiter portal"}

                  <FontAwesomeIcon icon={faChevronRight} className="ml-2" />
                </Button>
              </div>

              {/*  options */}
              <div className="mt-3">
                <Row>
                  <Col>
                    <button className="btn btn-link">
                      <p className="small">Forgot Password ?</p>
                    </button>
                  </Col>
                  <Col className="d-flex justify-content-end align-items-center">
                    <p className="small">
                      Dont have an account !{" "}
                      <a
                        href="/supplierRegister"
                        className="small text-primary"
                      >
                        Get Started
                      </a>
                    </p>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col md={3}></Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Login;
