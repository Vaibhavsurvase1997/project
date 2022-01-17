import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MyAccount from "./MyAccount";
import { getProfile, updProfile } from "../config/MyService";
import axios from "axios";
const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Profile() {
  let [user, setUser] = useState([]);
  // const [file, setFile] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  let [password, setPassword] = useState("");
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [phone, setPhone] = useState("");
  let [address, setAddress] = useState("");
  let [email, setEmail] = useState("");

  useEffect(() => {
    getProfile(localStorage.getItem("user")).then((res) => {
      if (res.data.user) {
        console.log(res.data.user);
        let data = res.data.user;
        setUser(data);
        setEmail(data.email);
        setFname(data.Fname);
        setPhone(data.phone);
      }
    });
  }, []);

  const updateProfile = (id) => {
    let data = {
      fname: fname,
      lname: lname,
      email: email,
      phone: phone,
    };
    console.log(data);
    updProfile(id, data).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
        window.location.reload();
      }
    });
  };

  // const onFormSubmit = (e) => {
  //     e.preventDefault();
  //     const formData = new FormData();

  //     formData.append('file', document.getElementById('files').files[0]);
  //     formData.append('email', email)
  //     const config = {
  //         headers: {
  //             'content-type': 'multipart/form-data'
  //         }
  //     };
  //     axios.post("http://localhost:8899/api/neostore/upload", formData, config)
  //         .then((res) => {
  //             console.log(res.data)
  //             alert("The file is successfully uploaded");
  //         })
  // }

  // const onChange=(e)=> {
  //     setFile({file:e.target.files});
  // }
  const handleSubmit = (e) => {
    // Prevent page reload on form submit
    e.preventDefault();
  };
  return (
    <>
    <Header/>
    <div className="container-fluid card4">
      <h3 className="text-center display-6">My Account</h3>
      <hr />
      <div className="row  ">
        <div className="col-7">
          <MyAccount />
        </div>
        <div className="col-5">
          {!showInvoice && (
            <>
              <div className="card1">
                <Card.Title style={{ fontSize: "32px" }}>Profile</Card.Title>
                <hr />
                <Card.Body>
                  <Card.Text>
                    FirstName:&nbsp; <span>{user.fname} </span>
                  </Card.Text>
                  <Card.Text>
                    {" "}
                    <span>LastName:&nbsp;{user.lname} </span>{" "}
                  </Card.Text>
                  <Card.Text>
                    <span> Email:&nbsp;{user.email}</span>
                  </Card.Text>
                  <Card.Text>Mobile:&nbsp; {user.mobile}</Card.Text>
                  <hr />
                  <Button
                    variant="secondary"
                    onClick={() => setShowInvoice(true)}
                  >
                    Edit profile
                  </Button>
                </Card.Body>
              </div>
            </>
          )}
          {showInvoice && (
            <div className="m-1">
              <div className="card1">
                <h2 className="text-center pt-3 p-3">Update Profile </h2>
                <Form>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                      <b>First Name</b>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        fname="lname"
                        defaultValue={user.fname}
                        onChange={(e) => {
                          setFname(e.target.value);
                        }}
                      />
                      {/* {fname != '' && fname.length < 4 && <span className="text-danger">Enter Name correctly</span>} */}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                      <b>Last Name</b>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        placeholder="Enter Name"
                        name="fname"
                        defaultValue={user.lname}
                        onChange={(e) => {
                          setLname(e.target.value);
                        }}
                      />
                      {/* {lname != '' && lname.length < 4 && <span className="text-danger">Enter Name correctly</span>} */}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                      <b>Email</b>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        placeholder="Enter Email"
                        name="email"
                        defaultValue={user.email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                        }}
                      />
                      {/* {email != '' && !regForEmail.test(email)
                                                && <span className="text-danger">Enter email  correctly</span>} */}
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="3">
                      <b> Mobile</b>
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control
                        type="text"
                        placeholder="Enter mobile number"
                        name="phone"
                        defaultValue={user.mobile}
                        onChange={(e) => {
                          setPhone(e.target.value);
                        }}
                      />
                      {/* {phone != '' && phone.length !== 10 && <span className="text-danger">Enter Mobile number correctly</span>} */}
                    </Col>
                  </Form.Group>

                  <Button
                    variant="info"
                    onClick={() => updateProfile(user._id)}
                    className="mt-3"
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => setShowInvoice(false)}
                    className="mt-3 ml-3"
                  >
                    Close
                  </Button>
                </Form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
