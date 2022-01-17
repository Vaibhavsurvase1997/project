import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Card,
  Image,
  Row,
  Table,
} from "react-bootstrap";
// import Nav1 from "./Nav1";
import { getinvoice } from "../config/MyService";
import ReactToPdf from "react-to-pdf";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { sendMail } from "../config/MyService";
import { SiMinutemailer } from "react-icons/si";
import { MdSaveAlt } from "react-icons/md";
import { useLocation } from "react-router";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Header from "./Header";
import Footer from "./Footer";

const ref = React.createRef();

export default function Invoice() {
  //   const [state, setState] = useState([]);
  //   const [items, setItems] = useState([]);
  const [temp, settemp] = useState([]);
  const navigate = useNavigate();

  const { state } = useLocation();
  // console.log(state);
  // console.log(state.orderno);
  // const [user, setUser] = useState([]);
  // let id = JSON.parse(localStorage.getItem("invoicenumber"));
  useEffect(() => {
    getinvoice(state.orderno).then((res) => {
      if (res.data.orderdetail) {
        console.log(res.data.orderdetail);
        let data1 = res.data.orderdetail;
        settemp(data1);
        console.log([data1]);
        console.log(temp);
      } else {
        console.log(res.data.err);
      }
    });
  }, []);
  console.log(state);

  useEffect(() => {
    if (localStorage.getItem("_token") != undefined) {
      let token = localStorage.getItem("_token");
      let decode = jwt_decode(token);
      console.log(decode);
      // setUid(decode.uid)
      getinvoice(state.orderno).then((res) => {
        if (res.data.orderdetail) {
          console.log(res.data.orderdetail);
          let data1 = res.data.orderdetail;
          settemp(data1);
          console.log([data1]);
          console.log(temp);
        } else {
          console.log(res.data.err);
        }
      });
    } else {
      navigate("/login");
    }
  }, []);

  const generatePdf = () => {
    const input = document.getElementById("divToPrint");
    console.log(input);
    html2canvas(input, { useCORS: true }).then((canvas) => {
      const pdf = new jsPDF();
      const img = canvas.toDataURL(
        "https://play-lh.googleusercontent.com/UsvigGKehARil6qKKLlqhBrFUnzJEQ2UNIGC2UVaExuMx1NKWefGUojGbo3GyORzv-k"
      );
      pdf.addImage(img, "JPEG", 0, 0);
      pdf.save("Invoice.pdf");
    });
  };

  //

  return (
    <div>
      <Header/>
      <Container
        fluid
        style={{
          height: "auto",
          backgroundColor:"thistle"
        }}
      >
        <br />
        <Card
          style={{
            padding: "30px",
            // backgroundColor: "rgb(238, 234, 234)",
            maxWidth: "800px",
            // borderRadius: "10px",
            margin: "20px auto",
            height: "auto",
           
          }}
          ref={ref}
          id="divToPrint"
        >
          <div>
            <Row>
              <Col md={6}>
                <div>
                  <h1>
                    Neo<span style={{ color: "red" }}>Store</span>
                  </h1>
                </div>
              </Col>
              <Col md={6}>
                {/* <h4 className="bg-dark text-white"> {state.orderno}</h4> */}
              </Col>
            </Row>
            <hr />
          </div>
          <div>
            <Row>
              <Col md={6}>
                <p>
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "black",
                    }}
                  >
                    FROM
                  </span>
                  <br />
                  <span style={{ fontWeight: "bold" ,color: "black",}}>Neostore</span>
                  <br />
                  neostore@gmail.com
                  <br />
                  8885559966
                </p>
                <br />

                <span
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  BILL TO
                </span>
                <br />
              </Col>
              <Col md={6}>
                <span
                  style={{
                    fontWeight: "bold",
                    color: "gray",
                  }}
                >
                  STATUS
                </span>
                <br />
                <span
                  style={{
                    fontWeight: "bold",
                    color: "green",
                  }}
                >
                  Paid
                </span>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                {temp.map((value, index) => {
                  return (
                    <tr key={index}>
                      <p>{value.email}</p>
                      <Table striped bordered hover size="md">
                        <thead>
                          <tr className="bg-dark text-white">
                            <th>Sr.No</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {temp[index].items.map((val, index) => {
                            return (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  <img
                                    src={val.product_image}
                                    style={{ width: "100px", height: "100px" }}
                                  />
                                  <br />
                                  {val.product_name}
                                </td>
                                <td>{val.quantity}</td>
                                <td>{val.product_cost}</td>
                                <td>{val.quantity * val.product_cost}</td>
                              </tr>
                            );
                          })}
                         {/* <h5>Shipping address:</h5>
                          <p>
                            {value.selectaddr.address},{value.selectaddr.city},
                            {value.selectaddr.pincode}
                          </p> */}
                        </tbody>
                      </Table>
                      <Table striped>
                        <tbody>
                          <tr>
                            <td>
                              <h5>Grand Total: Rs. {value.total}</h5>
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                    </tr>
                  );
                })}
              </Col>
            </Row>
          </div>
          <br />
          <hr />
          <div>
            <p>Thanks for shopping with us</p>
            <p style={{ fontStyle: "italic" }}>Visit Again !</p>
          </div>
        </Card>
        <br />
        <Container>
          <div className="text-center">
            <Button variant="primary" onClick={() => generatePdf()}>
              Save PDF <MdSaveAlt />
            </Button>
            &nbsp; &nbsp;&nbsp; &nbsp;
          </div>
        </Container>
      </Container>
      <Footer/>
    </div>
  );
}
