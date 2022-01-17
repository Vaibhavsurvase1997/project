import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "../config/MyService";
import { AiOutlineExclamationCircle } from "react-icons/ai";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Otp() {
  const navigate = useNavigate();
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [code, setCode] = useState("");
  let [confirmpassword, setConfirmpassword] = useState("");

  const back = () => {
    navigate("/forgot");
  };
  const changepwd = () => {
    let data = {
      email: email,
      code: code,
      password: password,
    };
    ChangePassword(data).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
        navigate("/login");
      }
    });
  };

  return (
    <>
    <Header/>
      <Container
        className="cont"
        style={{
          background: "white",
          height: "550px",
          border: "1px solid black",
        }}
      >
        <h2>Recover Password</h2>
        <hr />
        <span style={{ color: "red" }}>
          <AiOutlineExclamationCircle /> Verification Code has been sent to your
          registered Email ID
        </span>

        <br />
        <form method="post">
          <Row>
          <Col className="forgot">
            <input
              style={{ border: "1px solid black",width:"500px",height:"35px"}}
              type="number"
              placeholder="Enter Verfication Code"
              name="code"
              id="code"
              onChange={(event) => {
                setCode(event.target.value);
              }}
              required
            /><br/>
            {code != "" && code.length < 4 && (
              <span className="text-danger">Enter Code Correctly!</span>
            )}
            <br />
            <br />
            <input
              style={{ border: "1px solid black",width:"500px",height:"35px"}}
              type="email"
              placeholder="Enter Email"
              name="email"
              id="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            /><br/>
            {email != "" && !regForEmail.test(email) && (
              <span className="text-danger">Enter email correctly</span>
            )}<br/> <br />
            <input
              style={{ border: "1px solid black",width:"500px",height:"35px"}}
              type="password"
              placeholder="Enter Password"
              name="password"
              id="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            /><br/> <br />
            {password != "" && password.length < 8 && (
              <span className="text-danger">Enter password correctly</span>
            )}
          <br/>
            <input
              style={{ border: "1px solid black",width:"500px",height:"35px"}}
              type="password"
              placeholder="Enter ConfirmPassword"
              name="confirmpassword"
              id="confirmpassword"
              onChange={(event) => {
                setConfirmpassword(event.target.value);
              }}
              required
            /><br/>
            {confirmpassword != "" && confirmpassword != password && (
              <span className="text-danger">Passwords doesn't match</span>
            )}
          </Col>
          <br />
          <br />
          <div className="text-center">
            <input
              // type="submit"
              value="Submit"
              className="btn btn-primary text-center"
              onClick={changepwd}
            />{" "}
            &nbsp;&nbsp;&nbsp;
            <input
              type="submit"
              value="Back"
              className="btn btn-dark text-center"
              onClick={back}
            />
           
          </div>
          <Col>
          <img src="https://image.shutterstock.com/image-vector/secure-email-otp-authentication-verification-260nw-1532700359.jpg" ></img>
          </Col>
          </Row>
        </form>
      </Container>
    </>
  );
}
