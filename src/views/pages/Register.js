/*!

=========================================================
* Black Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardImg,
  CardTitle,
  Label,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
} from "reactstrap";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

class Register extends React.Component {
  state = {
    visible: false,
    notificationText: "",
    registerNameState: "",
    registerEmailState: "",
    registerPasswordState: "",
    registerConfirmPasswordState: "",
  };

  componentDidMount() {
    document.body.classList.toggle("register-page");
  }

  componentWillUnmount() {
    document.body.classList.toggle("register-page");
  }

  verifyEmail = (value) => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  verifyLength = (value, length) => {
    if (value.length >= length && value.length <= 20) {
      return true;
    }
    return false;
  };
  // function that verifies if two strings are equal
  compare = (string1, string2) => {
    if (string1 === string2) {
      return true;
    }
    return false;
  };

  // function that verifies if value contains only numbers
  verifyNumber = (value) => {
    var numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
      return true;
    }
    return false;
  };
  // verifies if value is a valid URL
  verifyUrl = (value) => {
    try {
      new URL(value);
      return true;
    } catch (_) {
      return false;
    }
  };

  change = (event, stateName, type, stateNameEqualTo, maxValue) => {
    switch (type) {
      case "name":
        if (this.verifyLength(event.target.value, 4)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "password":
        if (this.verifyLength(event.target.value, 6)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "equalTo":
        if (this.compare(event.target.value, this.state[stateNameEqualTo])) {
          this.setState({ [stateName + "State"]: "has-success" });
          this.setState({ [stateNameEqualTo + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
          this.setState({ [stateNameEqualTo + "State"]: "has-danger" });
        }
        break;
      case "number":
        if (this.verifyNumber(event.target.value)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "max-length":
        if (!this.verifyLength(event.target.value, stateNameEqualTo + 1)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "url":
        if (this.verifyUrl(event.target.value)) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "min-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "max-value":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value <= stateNameEqualTo
        ) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      case "range":
        if (
          this.verifyNumber(event.target.value) &&
          event.target.value >= stateNameEqualTo &&
          event.target.value <= maxValue
        ) {
          this.setState({ [stateName + "State"]: "has-success" });
        } else {
          this.setState({ [stateName + "State"]: "has-danger" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  };

  registerClick = () => {
    const {
      registerNameState,
      registerEmailState,
      registerPasswordState,
      registerConfirmPasswordState,
    } = this.state;

    if (this.state.registerEmailState === "") {
      this.setState({ registerEmailState: "has-danger" });
    }
    if (
      this.state.registerPasswordState === "" ||
      this.state.registerConfirmPasswordState === ""
    ) {
      this.setState({ registerPasswordState: "has-danger" });
      this.setState({ registerConfirmPasswordState: "has-danger" });
    }

    if (
      registerNameState === "has-success" &&
      registerEmailState === "has-success" &&
      registerPasswordState === "has-success" &&
      registerConfirmPasswordState === "has-success"
    ) {
      this.handleSubmit();
    }
  };

  handleSubmit = async () => {
    const { registerName, registerEmail, registerPassword } = this.state;

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        registerEmail,
        registerPassword
      );

      await createUserProfileDocument(user, { displayName: registerName });

      this.setState({
        registerName: "",
        registerEmail: "",
        registerPassword: "",
        registerConfirmPassword: "",
        registerConfirmPasswordState: "",
        registerPasswordState: "",
        registerEmailState: "",
        registerNameState: "",
        visible: true,
        notificationText:
          "Your account was registered successfully. Now log in.",
      });
    } catch (error) {
      console.error(error);
      this.setState({
        visible: true,
        notificationText: error.message,
      });
    }
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  render() {
    const {
      registerNameState,
      registerEmailState,
      registerPasswordState,
      registerConfirmPasswordState,
    } = this.state;
    return (
      <>
        <div className="content">
          <Alert
            color="info"
            isOpen={this.state.visible}
            toggle={this.onDismiss}
            style={{
              position: "relative",
              marginLeft: "50px",
              marginRight: "50px",
            }}
          >
            <strong>Info: </strong>
            {this.state.notificationText}
          </Alert>
          <Container>
            <Row>
              <Col className="ml-auto" md="5">
                <div className="info-area info-horizontal mt-5">
                  <div className="icon icon-warning">
                    <i className="tim-icons icon-wifi" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Marketing</h3>
                    <p className="description">
                      We've created the marketing campaign of the website. It
                      was a very interesting collaboration.
                    </p>
                  </div>
                </div>

                <div className="info-area info-horizontal">
                  <div className="icon icon-primary">
                    <i className="tim-icons icon-triangle-right-17" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Fully Coded in HTML5</h3>
                    <p className="description">
                      We've developed the website with HTML5 and CSS3. The
                      client has access to the code using GitHub.
                    </p>
                  </div>
                </div>
                <div className="info-area info-horizontal">
                  <div className="icon icon-info">
                    <i className="tim-icons icon-trophy" />
                  </div>
                  <div className="description">
                    <h3 className="info-title">Built Audience</h3>
                    <p className="description">
                      There is also a Fully Customizable CMS Admin Dashboard for
                      this product.
                    </p>
                  </div>
                </div>
              </Col>
              {/* start of the actual form  */}
              <Col className="mr-auto" md="7">
                <Card className="card-register card-white">
                  <CardHeader>
                    <CardImg
                      alt="..."
                      src={require("assets/img/card-primary.png")}
                    />
                    <CardTitle tag="h4">Register</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <FormGroup className={`has-label ${registerNameState}`}>
                      <label>Full Name *</label>
                      <Input
                        name="displayName"
                        type="text"
                        onChange={(e) => this.change(e, "registerName", "name")}
                      />
                      {this.state.registerEmailState === "has-danger" ? (
                        <label className="error">
                          Please enter a valid name.
                        </label>
                      ) : null}
                    </FormGroup>
                    <FormGroup className={`has-label ${registerEmailState}`}>
                      <label>Email Address *</label>
                      <Input
                        name="email"
                        type="email"
                        onChange={(e) =>
                          this.change(e, "registerEmail", "email")
                        }
                      />
                      {this.state.registerEmailState === "has-danger" ? (
                        <label className="error">
                          Please enter a valid email address.
                        </label>
                      ) : null}
                    </FormGroup>
                    <FormGroup className={`has-label ${registerPasswordState}`}>
                      <label>Password *</label>
                      <Input
                        id="registerPassword"
                        name="password"
                        type="password"
                        autoComplete="off"
                        onChange={(e) =>
                          this.change(e, "registerPassword", "password")
                        }
                      />
                      {this.state.registerPasswordState === "has-danger" ? (
                        <label className="error">This field is required.</label>
                      ) : null}
                    </FormGroup>
                    <FormGroup
                      className={`has-label ${registerConfirmPasswordState}`}
                    >
                      <label>Confirm Password *</label>
                      <Input
                        equalto="#registerPassword"
                        id="registerPasswordConfirmation"
                        name="confirmPassword"
                        type="password"
                        autoComplete="off"
                        onChange={(e) =>
                          this.change(
                            e,
                            "registerConfirmPassword",
                            "equalTo",
                            "registerPassword"
                          )
                        }
                      />
                      {this.state.registerConfirmPasswordState ===
                      "has-danger" ? (
                        <label className="error">This field is required.</label>
                      ) : null}
                    </FormGroup>
                    <div className="category form-category">
                      * Required fields
                    </div>
                  </CardBody>
                  <CardFooter className="text-right">
                    <FormGroup check className="pull-left">
                      <Label check>
                        <Input
                          name="optionCheckboxes"
                          type="checkbox"
                          required
                        />
                        <span className="form-check-sign" />
                        Accept the terms and conditions
                      </Label>
                    </FormGroup>
                    <Button color="primary" onClick={this.registerClick}>
                      Register
                    </Button>
                  </CardFooter>
                </Card>
              </Col>
              {/* end of form */}
            </Row>
          </Container>
        </div>
      </>
    );
  }
}

export default Register;
