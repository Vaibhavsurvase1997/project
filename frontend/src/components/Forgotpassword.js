import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Email } from "../config/MyService";
import Otp from "./Otp";
import "./Style.css";
import Header from "./Header";
import Footer from "./Footer";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Forgotpassword() {
  const [flag, setFlag] = useState(0);
  let [email, setEmail] = useState("");
  const navigate = useNavigate();

  const back = () => {
    navigate("/login");
  };
  const sendotp = () => {
    let data = {
      email: email,
    };
    Email(data).then((res) => {
      if (res.data.err) {
        alert(res.data.msg);
      } else {
        alert(res.data.msg);
        navigate("/otp");
      }
    });
  };

  return (
    <div>
      <Header/>
      <br />

      {flag == 0 ? (
        <Container className="cont" style={{width:"900px",height:"500px",backgroundImage:`url("https://us.123rf.com/450wm/stuartphoto/stuartphoto1901/stuartphoto190100965/116118634-reset-password-button-to-redo-security-of-pc-new-code-for-securing-computer-3d-illustration.jpg?ver=6")`,backgroundRepeat:"no-repeat" }}>
          
          <Col md={8}>
            <h2>Recover Password</h2>
          </Col>
          <hr />
          <br />
          <form method="post">
            <Col className="forgot">
              <input
                type="email"
                placeholder="Enter your email ID"
                name="email"
                id="email" style={{width:"350px",marginLeft:"316px"}}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
              {email != "" && !regForEmail.test(email) && (
                <span className="text-danger"><br/>Enter email correctly</span>
              )}
              <br />
              <br />
              <Col className="text-center">
                <input
                  value="Send OTP"
                  onClick={sendotp}
                  className="btn btn-primary text-center"
                  style={{width:"350px",marginLeft:"300px"}}
                />
              </Col><br/>
              <Col>
                <input
                  value="Back "
                  onClick={back}
                  className="btn btn-dark text-center"
                  style={{width:"350px",marginLeft:"300px"}}
                />
              </Col>
            </Col>
          </form>
        </Container>
      ) : (
        <Otp />
      )}
      <Footer/>
    </div>
  );
}
