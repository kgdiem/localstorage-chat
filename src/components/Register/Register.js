import React, { useState } from "react";
import { Col, Container, Form, Row, Button, InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import logo from "../../assets/IRISCRM.png";
import { createUser } from "../../redux/actions";
import { getCurrentUser } from "../../redux/selectors";
import "./Register.css";

export const Register = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  const registerUser = () => {
    if (name) {
      dispatch(createUser(name));
    } else {
      setNameError("Name is required");
    }
  };

  if (currentUser && !currentUser.error) {
    return <Redirect to={`/chat?userId=${currentUser.id}`}></Redirect>;
  }

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <h1>Welcome to IrisChat</h1>
          <img className="logo" src={logo} alt="IRIS Logo" />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 4, offset: 4 }} sm={{ span: 6, offset: 3 }}>
          <Form.Group>
            <InputGroup>
              <Form.Label srOnly>Name</Form.Label>
              <Form.Control
                placeholder="Enter your name to get started"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError("");
                }}
                onKeyPress={(e) => {
                  if (e.which === 13) {
                    registerUser();
                  }
                }}
              ></Form.Control>
              <InputGroup.Append>
                <Button onClick={registerUser}>Let's go!</Button>
              </InputGroup.Append>
            </InputGroup>
            {nameError ? (
              <Form.Text className="text-danger">
                Please enter your name
              </Form.Text>
            ) : null}
          </Form.Group>
        </Col>
      </Row>
    </Container>
  );
};
