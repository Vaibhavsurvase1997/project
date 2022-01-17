import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { addUser } from "../config/MyService";
import { BsTwitter, BsFacebook } from "react-icons/bs";
import { AiOutlineGoogle } from "react-icons/ai";
import { ImFacebook } from "react-icons/im";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SocialButton from "./SocialButton";
import { FaFacebookMessenger } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import './Register.css'

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Register() {
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [mobile, setmobile] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmpassword, setConfirmpassword] = useState("");
  const navigate = useNavigate();

  const register = () => {
    let data = {
      fname: fname,
      lname: lname,
      mobile: mobile,
      email: email,
      password: password,
    };
    addUser(data).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
        navigate("/login");
      }
    });
  };
  const handleSocialLogin = (user) => {
    console.log(user);
    let data = {
      fname: user._profile.firstName,
      lname: user._profile.lastName,
      mobile: user._profile.id,
      email: user._profile.email,
      password: "socialLogin",
    };
    addUser(data).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
      }
    });
    localStorage.setItem("user", JSON.stringify(data));
    navigate("/");
  };

  const handleSocialLoginFailure = (err) => {
    console.error(err);
  };

  return (
    <div>
      <Header />
   
      <Container style={{ marginTop: "0px" }}>
        <h2>
          Register to Neo<span className="text-danger">STORE</span>
        </h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              name="fname"
              id="fname"
              onChange={(event) => {
                setFname(event.target.value);
              }}
              required
            />
            {fname != "" && fname.length < 4 && (
              <span className="text-danger">Enter firstName correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              name="lname"
              id="lname"
              onChange={(event) => {
                setLname(event.target.value);
              }}
              required
            />
            {lname != "" && lname.length < 4 && (
              <span className="text-danger">Enter lastName correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Enter Mobile Number"
              name="mobile"
              id="mobile"
              onChange={(event) => {
                setmobile(event.target.value);
              }}
              required
            />
            {mobile != "" && mobile.length < 10 && (
              <span className="text-danger">Enter mobile correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              id="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
            {email != "" && !regForEmail.test(email) && (
              <span className="text-danger">Enter email correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              id="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            {password != "" && password.length < 8 && (
              <span className="text-danger">Enter password correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter ConfirmPassword"
              name="confirmpassword"
              id="confirmpassword"
              onChange={(event) => {
                setConfirmpassword(event.target.value);
              }}
              required
            />
            {confirmpassword != "" && confirmpassword != password && (
              <span className="text-danger">Passwords doesn't match</span>
            )}
          </Form.Group>
          <br />

          <Col className="text-center">
            <Button variant="dark" onClick={register}>
              Register
            </Button>
          </Col>
          <br />
          <br />
          <Col className="text-center">
            <p className=" text-center">
              {" "}
              <Link to="/login">Click here to Login </Link>
            </p>
          </Col>
        </Form>
      </Container>
      <Container className="button">
        <SocialButton
          className="fbreg"
          provider="facebook"
          appId="605797154028229"
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          <FaFacebookMessenger /> Login with Facebook
        </SocialButton>&nbsp;
        <SocialButton
          className="gmailreg"
          provider="google"
          appId="575250644555-h7gmddl6502tprr50jap6tcjregcohhu.apps.googleusercontent.com"
          onLoginSuccess={handleSocialLogin}
          onLoginFailure={handleSocialLoginFailure}
        >
          <SiGmail /> Login with Gmail
        </SocialButton>&nbsp;
        
      </Container>
      <Footer />
    </div>
  );
}
